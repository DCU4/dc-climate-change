import React, { Component } from 'react';
import Chart from 'chart.js';


export class Temperature extends Component {
  
  constructor(props) {
    // let chart;
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      changeChart: false,
      // chart: ''
    }
    
  }

// let chart;
  buildChart(dateArr, dataArr, compareArr, compareDate,changeChart) {
    // console.log(dataArr)
    let chart;
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

    console.log(dataArr);
    const ctx = document.getElementById('temp-chart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      responsive: false,
      data: {
          labels: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
          datasets: [
            {
              label: !this.props.changeChart ? 'Temp 1958' : 'Precipation 1958',
              data: dataArr,
              fill:false,
              backgroundColor: [
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',
                '#303f9f',

              ],
              borderColor: [
                '#303f9f'

              ],
              borderWidth: 2
              
            },
            {
              label: !this.props.changeChart ? 'Temp 2018' : 'Precipation 2018',
              data: compareArr,
              fill:false,
              backgroundColor: [
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',
                '#d32f2f',

              ],
              borderColor: [
                '#d32f2f'

              ],
              borderWidth: 2
            },
            
          ]
      },
      options: {
          // scales: {
          //     yAxes: [{
          //         ticks: {
          //             // beginAtZero: true,
          //             // stacked:true
          //         }
          //     }]
          // },
          elements: {
            point: {
              radius: 5,
              borderWidth: 0,
              borderColor: 'rgba(0, 0, 0, 0)',
              hoverRadius: 15
            }
          },
          tooltips: {
            mode: 'index',
            axis: 'y'
          },
          // animation: {
          //   duration: 10000,
          //   chart:chart
          // }
          // events: ['onmouseover']
      }
  });
  chart.update();
  
  chart.resize();



  }

  handleChange =  () =>{
     this.props.onClick();
  }

  componentDidUpdate(){
    console.log('update');
    let dataArr = [];
    let dateArr = [];
    let compareArr = [];
    let compareDate = [];
    this.buildChart(dateArr, dataArr, compareArr, compareDate);
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
  const deg = <span>&#176;</span>; // degree symbol
  const change = this.props.changeChart;
    return (
      <div className="chart">
        <h1>{!change ? `Monthly Temperature F${deg.props.children}`:'Monthly Precipation (inches)'} Washington, DC </h1>
        <button onClick={this.handleChange}>{!this.props.changeChart ? 'Show Precipitation' : 'Show Temperature'}</button>
        <canvas id="temp-chart" width="500" height="500"></canvas>
      </div>

    );
  }
}