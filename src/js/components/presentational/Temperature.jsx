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
  buildChart(dateArr, date, dataArr, data) {
    // console.log(data);
    dateArr.push(date);
    dataArr.push(data);
    // console.log(dataArr)
    const ctx = document.getElementById('temp-chart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: dateArr,
          datasets: [{
              label: 'Temp',
              data: dataArr,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      // beginAtZero: true,
                      // stacked:true
                  }
              }]
          }
      }
  });
  }

  componentDidMount () {
    console.log('mount');
    let dataArr = [];
    let dateArr = [];
    this.props.value.map((temp, i) => {
      let stringValue = temp.value.toString();
      this.buildChart(dateArr, temp.date, dataArr, stringValue);
    })
    
  }

render() {
  // console.log(window.chart);
  const isSelected = this.state.isSelected;
  if(window.chart && window.chart !== null){
    window.chart.destroy();
}

  const deg = <span>&#176;</span>; // degree symbol


    return (
      <div className="chart">
        <canvas id="temp-chart" width="500" height="500"></canvas>
      </div>

    );
  }
}