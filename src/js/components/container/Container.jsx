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
          res: '',
          compare: '',
          changeChart: false
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

      // `https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?datatypeid=${datatype.results[55].id}`
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
          compare: compareData.results,
          changeChart: this.state.changeChart == false ? true : false
        })
      }

    }

    changeChart = () => {
      console.log(this.state.changeChart);
      if(!this.state.changeChart){
      this.getData('1958-01-01','1958-12-31','2018-01-01','2018-12-31', 'PRCP');
    } else {
      this.getData('1958-01-01','1958-12-31','2018-01-01','2018-12-31', 'TAVG');
    }
  }

    

    componentDidMount () {
      // this.compareData('2018-01-01','2018-12-31');
      this.getData('1958-01-01','1958-12-31','2018-01-01','2018-12-31', 'TAVG');
    }


    render() {
      const res = this.state.res;
      const compare = this.state.compare;
      // console.log(res);
      // console.log(compare);

      if (!this.state.res || res == undefined ||!this.state.compare || compare == undefined) {
        return null; //You can change here to put a customized loading spinner
      }
        return (
          <main>
            
            <Temperature
              value={res}
              compare={compare}
              onClick={this.changeChart}
            
            />
            {/* {res.map((r, i) => {
            <Temperature
              value={r}
                
            
            />
            })} */}
          
            
          </main>

        );
    }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
