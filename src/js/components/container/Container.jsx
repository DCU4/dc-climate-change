import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Converter } from "../presentational/Converter.jsx";
// import { start } from "repl";

class Container extends Component {
    constructor(props) {
        super(props);
        // this.handleFtoC = this.handleFtoC.bind(this);
        // this.handleCtoF = this.handleCtoF.bind(this);
        this.state = {
          // convert: Math.floor((32-32)*(5/9))
          res: ''
        }
    }

    getData = async (startdate, enddate) => {
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
        const call = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${datatype.results[19].id}&datasetid=${dataset.results[0].id}&startdate=${startdate}&enddate=${enddate}&units=standard&limit=1000&datatypeid=TOBS`,
          {
          headers :{
            token: token
          }
        })
        .catch(err => console.log(err))
      
        const data = await call.json();
        console.log('data', data, call);
        // let results = 
        this.setState({
          res: data.results
        })
      }

    }

    componentDidMount () {
      this.getData('2018-01-01','2018-12-31');
    }


    render() {
      const res = this.state.res;
      console.log(res);
      if (!this.state.res || res == undefined) {
        return null; //You can change here to put a customized loading spinner
      }
        return (
          <main>
            <h1>Convert Away!</h1>

            <Converter
              // handleFtoC={this.handleFtoC}
              // handleCtoF={this.handleCtoF}
              // convert={this.state.convert}
            />
            <ul >
            {res.map((r, i) => {
              return(
                
              <li key={i}>{r.value}</li>
            
                ) 
              })}
          </ul>
            
          </main>

        );
    }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
