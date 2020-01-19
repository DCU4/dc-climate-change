import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Temperature } from "../presentational/Temperature.jsx";


class Container extends Component {
    constructor(props) {
        super(props);
        // this.handleFtoC = this.handleFtoC.bind(this);
        // this.handleCtoF = this.handleCtoF.bind(this);
        this.state = {
          // convert: Math.floor((32-32)*(5/9))
          res: undefined,
          compare: undefined,
          changeChart: false,
          year: '1958',
          type: 'TAVG'
        }
    }

    getData = async (startdate, enddate, comparestart, compareend, type) => {
      const dc = 'FIPS:11';
      const token = 'CsgMDhKauNyJczMlffoEibhLIPkiQXDj';
      // const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?locationcategoryid=${dc}&datacategoryid=TEMP&limit=1000`;
      const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=${dc}`;
      const datatypeCall = await fetch(url,{
        headers :{
          token: token
        }
      });
      const datatype = await datatypeCall.json();
      console.log('dataype:',datatype);

      // station name: "NATIONAL ARBORETUM DC, DC US"
      const datasetCall = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?stationid=${datatype.results[19].id}`,{
        headers :{
          token: token
        }
      });
      const dataset = await datasetCall.json();
      console.log('dataset:',dataset);



      if (dataset){
        console.log('getting data...')
        const call = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${datatype.results[19].id}&datasetid=${dataset.results[1].id}&startdate=${startdate}&enddate=${enddate}&units=standard&limit=1000&datatypeid=${type}`,
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
        const compareCall = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${datatype.results[19].id}&datasetid=${dataset.results[1].id}&startdate=${comparestart}&enddate=${compareend}&units=standard&limit=1000&datatypeid=${type}`,
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
        changeChart: this.state.changeChart === false ? true : false,
        res: undefined,
        compare: undefined,
        type: e.target.value
      }, ()=> {
        this.getData(`${this.state.year}-01-01`,`${this.state.year}-12-31`, '2018-01-01','2018-12-31', `${this.state.type}`);
      });

      
     
  }

  changeYear = (e) => {
    // console.log(e.target.value);
    this.setState({
      year: e.target.value,
      changeChart: false,
      res: undefined,
      compare: undefined
    });
    this.getData(`${e.target.value}-01-01`,`${e.target.value}-12-31`, '2018-01-01','2018-12-31',`${this.state.type}`);
  }

    
  /*
  TMAX
  TMIN
  TAVG
  PRCP
  SNOW
  */ 

  // comp

    // componentDidUpdate(){
    //   this.getData(`${this.state.year}-01-01`,`${this.state.year}-12-31`, '2018-01-01','2018-12-31','TAVG');
    // }
    componentDidMount () {
      // console.log('mount');
      this.getData(`${this.state.year}-01-01`,`${this.state.year}-12-31`, '2018-01-01','2018-12-31','TAVG');
    }

    render() {
      const res = this.state.res;
      const compare = this.state.compare;
     
      // console.log(deg)
      if (!this.state.res || res == undefined) {
        return <div className="spinner">Loading Data...<span></span></div>;
      } else if (!this.state.compare || compare == undefined){
        return <div className="spinner">Comparing Data...<span></span></div>;
      }
        return (
          <main>
            
            <Temperature
              value={res}
              compare={compare}
              onClick={this.changeChart}
              changeChart={this.state.changeChart }
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
