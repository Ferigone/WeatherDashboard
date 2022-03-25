import React, {useEffect, useState} from "react";
import moment from "moment";

import CityName from "../atoms/CityName";
import Temperature from "../atoms/Temperature";
import DateTime from "../atoms/DateTime";

import { CitiesContext } from "./../../contexts/Cities";

const API_URL = process.env.REACT_APP_API_URL;

interface TemperatureProps {
  id: number;
  cityId: number;
  dateTime: Date;
  value: number;
}

const CityContainer = () => {

  const [state] = React.useContext(CitiesContext);
  
  const [lastTemp, setLastTemp] = useState<TemperatureProps>()

  useEffect(() =>{
    fetch(`${API_URL}/${state.selectedCity.name}/chartData/temperature`).then(res=>res.json()).then(data=>{
      setLastTemp(data.at(-1))
    })
  },[state.selectedCity])

  const getLastTemp = ()=>{
    if(lastTemp){
      return lastTemp.value?.toString();
    }else{
      return "No Data"
    }
  }

  const getLastTempDate = ()=>{
    if(lastTemp){
      return moment(lastTemp.dateTime).format('YYYY-MM-DD HH:mm')
    }else{
      return "No Data"
    }
  }

  return (
    <div className="w-full px-4 py-4 bg-white mt-6 flex flex-row shadow-lg items-center rounded-t-lg dark:bg-gray-800">
      <Temperature>{getLastTemp()}</Temperature>
      <div className="mx-5">
        <CityName>{state.selectedCity.displayName}</CityName>
        <DateTime>{getLastTempDate()}</DateTime>
      </div>
    </div>
  );
};

export default CityContainer;
