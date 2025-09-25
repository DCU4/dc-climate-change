import React, { useState, useEffect } from 'react';
import WeatherChart from "../presentational/WeatherChart";

const Container = () => {
  const [res, setRes] = useState(undefined);
  const [compare, setCompare] = useState(undefined);
  const [year, setYear] = useState('1958');
  const [type, setType] = useState('TAVG');

  const getData = async (startdate, enddate, comparestart, compareend, type) => {
    const dc = 'FIPS:11';
    const token = 'CsgMDhKauNyJczMlffoEibhLIPkiQXDj';
    const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=${dc}`;
    const datatypeCall = await fetch(url, {
      headers: { token }
    });
    const datatype = await datatypeCall.json();
    const station = datatype.results[22].id;

    const datasetCall = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?stationid=${station}`, {
      headers: { token }
    });
    const dataset = await datasetCall.json();

    if (dataset) {
      const call = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${station}&datasetid=${dataset.results[1].id}&startdate=${startdate}&enddate=${enddate}&units=standard&limit=1000&datatypeid=${type}`,
        { headers: { token } })
        .catch(err => console.log(err));
      const data = await call.json();
      setRes(data.results);

      const compareCall = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${station}&datasetid=${dataset.results[1].id}&startdate=${comparestart}&enddate=${compareend}&units=standard&limit=1000&datatypeid=${type}`,
        { headers: { token } })
        .catch(err => console.log(err));
      const compareData = await compareCall.json();
      setCompare(compareData.results);
    }
  };

  useEffect(() => {
    console.log('fetching data...');
    getData(`${year}-01-01`, `${year}-12-31`, '2020-01-01', '2020-12-31', type);
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
