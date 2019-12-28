import React, { Component } from 'react';
import Chart from 'chart.js';

export class Temperature extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.state = {
    //   changeChart: false
    // }
    
  }


  buildChart(dateArr, dataArr, compareArr, compareDate, change = false) {


    this.props.value.map((temp, i) => {
      let stringValue = temp.value.toString();
      dateArr.push(temp.date);
      dataArr.push(stringValue);
    });

    this.props.compare.map((comp, i) => {
      let stringValue = comp.value.toString();
      compareDate.push(comp.date);
      compareArr.push(stringValue);
    });




    const ctx = document.getElementById('temp-chart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
          datasets: [
            {
              label: 'Temp 1958',
              data: dataArr,
              fill:false,
              backgroundColor: [
                'black',
                'black',
                'black',
                'black',
                'black',
                'black',
                'black',
                'black',
                'black',
                'black',
                'black',
                'black',

              ],
              borderColor: [
                'black'

              ],
              borderWidth: 2
              
            },
            {
              label: 'Temp 2018',
              data: compareArr,
              fill:false,
              backgroundColor: [
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',
                'red',

              ],
              borderColor: [
                'red'

              ],
              borderWidth: 2
            },
            
          ]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      // beginAtZero: true,
                      // stacked:true
                  }
              }]
          },
          // events: ['onmouseover']
      }
  }).resize();




  // if(change === true) {
  //   console.log('updating...')
  //   chart.update();
  // }


  }

  handleChange =()=>{
   this.props.onClick();
    let dataArr = [];
    let dateArr = [];
    let compareArr = [];
    let compareDate = [];

      this.buildChart(dateArr, dataArr, compareArr, compareDate );

    
  }


  componentDidMount () {
    console.log('mount');
    let dataArr = [];
    let dateArr = [];
    let compareArr = [];
    let compareDate = [];
    this.buildChart(dateArr, dataArr, compareArr, compareDate);
    
  }

render() {
  if(window.line && window.line !== null){
    window.line.destroy();
}

  const deg = <span>&#176;</span>; // degree symbol


    return (
      <div className="chart">
        <button onClick={this.handleChange}>Change Chart</button>
        <canvas id="temp-chart" width="200" height="200"></canvas>
      </div>

    );
  }
}