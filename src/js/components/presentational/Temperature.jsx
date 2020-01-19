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

    let labels = [
      {
        type:'TAVG',
        typeTitle:'Temp',
        title: 'Average Temperature'
      },
      {
        type:'PRCP',
        typeTitle:'Precipitation',
        title:'Average Precipitation'
      },
      {
        type:'SNOW',
        typeTitle:'Snowfall',
        title: 'Average Snowfall'}
    ];
    
    const label = labels.filter(l => this.props.type == l.type);
    // console.log(dataArr); this.props.type == l.type ? `${l.type} ${this.props.year}` : `TAVG ${this.props.year}`
    console.log(this.props.type, label);
    const ctx = document.getElementById('temp-chart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      responsive: false,
      data: {
          labels: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
          datasets: [
            {
              // label: !this.props.changeChart  ? `Temp ${this.props.year}` : `Precipitation ${this.props.year}` ,
              label: `${label[0].typeTitle} ${this.props.year}`,
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
              label: `${label[0].typeTitle} 2018`,
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
    // console.log('mount');
    
    let dataArr = [];
    let dateArr = [];
    let compareArr = [];
    let compareDate = [];
    this.buildChart(dateArr, dataArr, compareArr, compareDate);
    
  }

render() {
  const deg = <span>&#176;</span>; // degree symbol
  const change = this.props.changeChart;
  let start = '1958';
  var end = new Date().getFullYear();
  let years = []
  for(let year = start ; year <=end; year++){
    years.push(<option key={year} value={year}>{year}</option>);
  }

  let options = [
    {
      type:'TAVG',
      title: `Monthly Temperature F${deg.props.children}`
    },
    {
      type:'PRCP',
      title:'Monthly Precipation (inches)'
    },
    {
      type:'SNOW',
      title: 'Monthly Snowfall (inches)'}
  ];
  const label = options.filter(l => this.props.type == l.type);

  let select = <select value={this.props.type} onChange={this.props.onChange}>
      <option value="">--</option>
      { options.map((opt, i) => <option key={i} value={opt.type}>{opt.title}</option> ) }
    </select>



    return (
      <div className="chart">
        <h1>{label[0].title} Washington, DC </h1>
        <div className="change-chart-wrapper">
          
           {select}
          
          <select value={this.props.year} onChange={this.props.changeYear}>
            <option value="default">Select Year</option>
            {years}
          </select>
        </div>
        <canvas id="temp-chart" width="500" height="500"></canvas>
      </div>

    );
  }
}