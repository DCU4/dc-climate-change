import React, { Component } from 'react';
import Chart from 'chart.js';

export class Temperature extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isSelected: false,
      isDisabled: true
    }
    
  }

  handleChange() {
    const isSelected = this.state.isSelected;
    const handle = isSelected ? false : true
    const number = document.getElementById('number');
    number.value = "";

    this.setState({
      isSelected: handle
    })
  }
  buildChart(dateArr, dataArr, compareArr, compareDate) {


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
          labels: dateArr,
          datasets: [
            {
              label: 'Temp 1958',
              data: dataArr,
              
            },
            {
              label: 'Temp 2018',
              data: compareArr,
              backgroundColor: [
                'rgba(255, 99, 132, .1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',

              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',

              ],
              borderWidth: 1
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
          events: ['click']
      }
  });
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
  // console.log(window.chart);
  const isSelected = this.state.isSelected;
  if(window.line && window.line !== null){
    window.line.destroy();
}

  const deg = <span>&#176;</span>; // degree symbol


    return (
      <div className="chart">
        <canvas id="temp-chart" width="500" height="500"></canvas>
      </div>

    );
  }
}