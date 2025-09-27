import React, { useState, useEffect } from 'react';
import WeatherChart from "../presentational/WeatherChart";

const Container = () => {
  const [res, setRes] = useState(undefined);
  const [compare, setCompare] = useState(undefined);
  const [year, setYear] = useState('1958');
  const [type, setType] = useState('TAVG');

  const getBaseUrl = () => {
    return process.env.NODE_ENV === 'production'
      ? 'https://dc-climate-change.vercel.app'
      : 'http://localhost:3000';
  };

  const getData = async (startdate, enddate, comparestart, compareend, type) => {
    const baseUrl = getBaseUrl();

    // get dc station
    const stationsRes = await fetch(`${baseUrl}/stations`);
    const stationsData = await stationsRes.json();
    const station = stationsData.results[22].id;
    console.log(stationsData);

    // 22 station name: "NATIONAL ARBORETUM DC, DC US"
    const datasetsRes = await fetch(`${baseUrl}/datasets?station=${station}`);
    const datasetsData = await datasetsRes.json();
    const datasetId = datasetsData.results[1].id;
    console.log(datasetsData);

    const dataRes = await fetch(
      `${baseUrl}/weather-data?station=${station}&datasetid=${datasetId}&startdate=${startdate}&enddate=${enddate}&type=${type}`
    );
    const data = await dataRes.json();
    console.log(data);
    setRes(data.results);

    // 4. Get weather data for comparison year
    const compareRes = await fetch(
      `${baseUrl}/weather-data?station=${station}&datasetid=${datasetId}&startdate=${comparestart}&enddate=${compareend}&type=${type}`
    );
    const compareData = await compareRes.json();
    console.log(compareData);
    setCompare(compareData.results);
  };

  useEffect(() => {
    // console.log('fetching data...');
    getData(`${year}-01-01`, `${year}-12-31`, '2022-01-01', '2022-12-01', type);
  }, [year, type]);

  const changeChart = (e) => {
    setRes(undefined);
    setCompare(undefined);
    setType(e.target.value);
  };

  const changeYear = (e) => {
    setYear(e.target.value);
    setRes(undefined);
    setCompare(undefined);
  };

  if (!res) {
    return <div className="spinner">Loading Data...<span></span></div>;
  } else if (!compare) {
    return <div className="spinner">Comparing Data...<span></span></div>;
  }

  return (
    <main>
      <WeatherChart
        value={res}
        compare={compare}
        onClick={changeChart}
        onChange={changeChart}
        changeYear={changeYear}
        year={year}
        type={type}
      />
    </main>
  );
};

export default Container;
