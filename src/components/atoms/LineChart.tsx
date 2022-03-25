import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from "chart.js";

import { CitiesContext } from "./../../contexts/Cities";

const API_URL = process.env.REACT_APP_API_URL;

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
);

const buildData = ({ labels, data }: { labels: string[]; data: number[] }) => ({
  labels: labels,
  datasets: [
    {
      data: data,
      borderColor: "rgba(255, 255, 255, 1)",
      pointBackgroundColor: "rgba(255, 255, 255, 1)",
      fill: "start",
      tension: 0.2,
    },
  ],
});

const options = {
  tooltip: {
    enabled: false,
    position: "nearest",
  },
  scales: {
    yAxes: {
      ticks: {
        display: true,
        color: "rgba(255, 255, 255, 1)",
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },

    xAxes: {
      ticks: {
        display: true,
        color: "rgba(255, 255, 255, 1)",
      },
      grid: {
        circular: true,
        borderColor: "rgba(255, 255, 255, .2)",
        color: "rgba(255, 255, 255, .2)",
        borderDash: [5, 5],
      },
    },
  },
};

interface Temperature {
  id: number;
  cityId: number;
  dateTime: Date;
  value: number;
}

const Chart = () => {
  const [state] = React.useContext(CitiesContext);
  const [data, setData] = useState<Temperature[]>([]);

  console.log(state);

  useEffect(() => {
    fetch(`${API_URL}/${state.selectedCity.name}/chartData/${state.chartType}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [state.selectedCity, state.chartType]);

  const chartData = buildData({
    labels: data?.map((el: Temperature) =>
      moment(el.dateTime).format(
        state.chartType === "temperature" ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
      )
    ),
    data: data?.map((el: Temperature) => el.value),
  });

  return (
    <div className="dark:bg-gray-700 w-full rounded-b-lg p-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
