import React, { Component } from "react";
import ReactDOM from "react-dom";
import { WeatherChart } from "../presentational/WeatherChart.jsx";


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: undefined,
      compare: undefined,
      year: '1958',
      type: 'TAVG'
    }
  }

  getData = async (startdate, enddate, comparestart, compareend, type) => {
    const dc = 'FIPS:11';
    const token = 'CsgMDhKauNyJczMlffoEibhLIPkiQXDj';
    // const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?locationcategoryid=${dc}&datacategoryid=TEMP&limit=1000`;
    const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=${dc}`;
    const datatypeCall = await fetch(url, {
      headers: {
        token: token
      }
    });
    const datatype = await datatypeCall.json();
    console.log('dataype:', datatype);
    const station = datatype.results[22].id;
    // 22 station name: "NATIONAL ARBORETUM DC, DC US"

    const datasetCall = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?stationid=${station}`, {
      headers: {
        token: token
      }
    });
    const dataset = await datasetCall.json();
    console.log('dataset:', dataset);

    if (dataset) {
      console.log('getting data...')
      const call = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${station}&datasetid=${dataset.results[1].id}&startdate=${startdate}&enddate=${enddate}&units=standard&limit=1000&datatypeid=${type}`,
        {
          headers: {
            token: token
          }
        })
        .catch(err => console.log(err))

      const data = await call.json();
      console.log('data', data, call);

      this.setState({
        res: data.results
      });

      console.log('comparing data...')
      const compareCall = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${station}&datasetid=${dataset.results[1].id}&startdate=${comparestart}&enddate=${compareend}&units=standard&limit=1000&datatypeid=${type}`,
        {
          headers: {
            token: token
          }
        })
        .catch(err => console.log(err))

      const compareData = await compareCall.json();
      console.log('data', compareData, compareCall);

      this.setState({
        compare: compareData.results
      })
    }

  }


  changeChart = (e) => {
    this.setState({
      res: undefined,
      compare: undefined,
      type: e.target.value
    }, () => {
      this.getData(`${this.state.year}-01-01`, `${this.state.year}-12-31`, '2020-01-01', '2020-12-31', `${this.state.type}`);
    });
  }


  changeYear = (e) => {
    this.setState({
      year: e.target.value,
      res: undefined,
      compare: undefined
    });
    this.getData(`${e.target.value}-01-01`, `${e.target.value}-12-31`, '2020-01-01', '2020-12-31', `${this.state.type}`);
  }


  /*
  TMAX
  TMIN
  TAVG
  PRCP
  SNOW

  WESD = Water equivalent of snow on the ground (tenths of mm)
  WESF = Water equivalent of snowfall (tenths of mm)
  */

  componentDidMount() {
    this.getData(`${this.state.year}-01-01`, `${this.state.year}-12-31`, '2020-01-01', '2020-12-31', 'TAVG');
  }

  render() {
    const res = this.state.res;
    const compare = this.state.compare;

    if (!this.state.res || res == undefined) {
      return <div className="spinner">Loading Data...<span></span></div>;
    } else if (!this.state.compare || compare == undefined) {
      return <div className="spinner">Comparing Data...<span></span></div>;
    }

    return (
      <main>

        <WeatherChart
          value={res}
          compare={compare}
          onClick={this.changeChart}
          onChange={this.changeChart}
          changeYear={this.changeYear}
          year={this.state.year}
          type={this.state.type}
        />

      </main>

    );
  }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
