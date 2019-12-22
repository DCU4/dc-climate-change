import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Converter } from "../presentational/Converter.jsx";

class Container extends Component {
    constructor(props) {
        super(props);
        // this.handleFtoC = this.handleFtoC.bind(this);
        // this.handleCtoF = this.handleCtoF.bind(this);
        this.state = {
          // convert: Math.floor((32-32)*(5/9))
        }
    }

    getData = async e => {
      const dc = 'FIPS:11';
      const token = 'CsgMDhKauNyJczMlffoEibhLIPkiQXDj';
      const datatypeCall = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/datatypes?locationcategoryid=${dc}&datacategoryid=TEMP&limit=1000`,{
        headers :{
          token: token
        }
      });
      const datatype = await datatypeCall.json();
      console.log('dataype:',datatype);


      const datasetCall = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?datatypeid=${datatype.results[55].id}`,{
        headers :{
          token: token
        }
      });
      const dataset = await datasetCall.json();
      console.log('dataset:',dataset);
      if (dataset){
        console.log('getting data...')
        const call = await fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=${dataset.results[0].id}&startdate=2019-12-19&enddate=${dataset.results[0].maxdate}&units=standard&limit=1000`,
          {
          headers :{
            token: token
          }
        })
        .catch(err => console.log(err));
        const data = await call.json();
        console.log('data', data, call);
      }
      // if(data){

      //   // this.setState({
      //   //   dollar: data.rates.USD,
      //   //   euro: data.rates.EUR
      //   // });
      // }
    }

    componentDidMount () {
      this.getData();
    }


    render() {
        return (
          <main>
            <h1>Convert Away!</h1>
            <Converter
              // handleFtoC={this.handleFtoC}
              // handleCtoF={this.handleCtoF}
              // convert={this.state.convert}
            />

          </main>

        );
    }
}
export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;
