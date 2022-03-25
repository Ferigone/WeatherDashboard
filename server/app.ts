import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from 'cors'
import moment from "moment";

const prisma = new PrismaClient();
const app = express();

interface Temperature {
  id: number;
  cityId: number;
  dateTime: Date | string;
  value: any;
}

interface City {
  id: number;
  name: string;
  displayName: string;
}

interface GroupBy {
  [name: string]: Array<Temperature>;
}

interface TemperatureData extends City {
  Temperature: Array<Temperature>;
}

//Becouse of db specific
const today = "2022-02-01";

app.use(express.json());
app.use(cors())

app.get("/cities", async (req, res) => {
  const cities = await prisma.city.findMany();
  res.json(cities);
});

app.get("/:city/chartData/temperature", async (req, res) => {
  const { city } = req.params;
  const data: TemperatureData = await prisma.city.findFirst({
    where: { name: city },
    include: {
      Temperature: {
        where: {
          dateTime: {
            gte: new Date(new Date(today).setDate(new Date(today).getDate() - 14)).toISOString(),
          },
        },
      },
    },
  });
  if (!data) {
    return res.json({
      success: false,
      message: "Provided city does not exists in db",
    });
  }
  res.json(data.Temperature);
});

app.get("/:city/chartData/temperature/max", async (req, res) => {
  const { city } = req.params;
  const data: TemperatureData = await prisma.city.findFirst({
    where: { name: city },
    include: {
      Temperature: {
        where: {
          dateTime: {
            gte: new Date(new Date(today).setDate(new Date(today).getDate() - 14)).toISOString(),
          },
        },
      },
    },
  });

  if (!data) {
    return res.json({
      success: false,
      message: "Provided city does not exists in db",
    });
  }

  let groupped: GroupBy = {};

  //Group by Day
  data.Temperature.forEach((x) => {
    let formattedData =  moment(x.dateTime).format('DDMMYYYY')

    if (groupped[formattedData] === undefined) {
      groupped[formattedData] = new Array(x);
    } else {
      groupped[formattedData].push(x);
    }
  });

  //Get max temperature of each Day
  let maxEachDay = Object.keys(groupped).map((x) => {
    return groupped[x].reduce((max: Temperature, obj: Temperature) =>
      max.value > obj.value ? max : obj
    );
  });



  //Format output dateTime
  maxEachDay.forEach(x=>{
    x.dateTime = moment(x.dateTime).format('YYYY-MM-DD')
  })

  res.json(maxEachDay);
});

app.post("/:city/chartData/temperature", async (req, res) => {
  const { city }: { city: string } = req.params;
  const { dateTime, value }: { dateTime: Date; value: number } = req.body;

  if (!new Date(dateTime).getTime()) {
    return res.json({ success: false, message: "dateTime is not valid" });
  }

  if (typeof value !== "number") {
    return res.json({ success: false, message: "value is not valid" });
  }

  const data: City = await prisma.city.findFirst({
    where: { name: city },
  });

  if (!data) {
    return res.json({
      success: false,
      message: "Provided city does not exists in db",
    });
  }

  let id = data.id;

  const result = await prisma.temperature.create({
    data: {
      cityId: id,
      dateTime: new Date(dateTime).toISOString(),
      value: value,
    },
  });
  res.json(result);
});

app.listen(80, () => console.log("REST API server: http://localhost"));
