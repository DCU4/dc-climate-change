import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

const WeatherChart = (props) => {
  const chartRef = useRef(null);
  // Chart instance ref to avoid multiple initializations
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!props.value || !props.compare) return;
    let dataArr = [];
    let dateArr = [];
    let compareArr = [];
    let compareDate = [];

    props.value.forEach((temp) => {
      let stringValue = temp.value.toString();
      dateArr.push(temp.date);
      dataArr.push(stringValue);
    });

    props.compare.forEach((comp) => {
      let stringValue = comp.value.toString();
      compareDate.push(comp.date);
      compareArr.push(stringValue);
    });

    let labels = [
      {
        type: 'TAVG',
        typeTitle: 'Temp',
        title: 'Average Temperature'
      },
      {
        type: 'PRCP',
        typeTitle: 'Precipitation',
        title: 'Average Precipitation'
      },
      {
        type: 'SNOW',
        typeTitle: 'Snowfall',
        title: 'Average Snowfall'
      }
    ];

    const label = labels.filter(l => props.type === l.type);
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Fill missing months by checking which months are present in the data
    const fillMissingMonths = (data, dates) => {
      // Map from month index (0-11) to value
      const monthMap = {};
      dates.forEach((date, idx) => {
        const d = new Date(date);
        if (!isNaN(d)) {
          const month = d.getMonth();
          monthMap[month] = parseFloat(data[idx]);
        }
      });
      // Fill array with value if present, else null
      return Array.from({ length: 12 }, (_, i) =>
        monthMap.hasOwnProperty(i) ? monthMap[i] : null
      );
    };

    dataArr = fillMissingMonths(dataArr, dateArr);
    compareArr = fillMissingMonths(compareArr, compareDate);

    // console.log(dataArr, dateArr, compareArr, compareDate);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      responsive: false,
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: `${label[0].typeTitle} ${props.year}`,
            data: dataArr,
            fill: false,
            backgroundColor: '#303f9f',
            borderColor: '#303f9f',
            borderWidth: 2
          },
          {
            label: `${label[0].typeTitle} 2024`,
            data: compareArr,
            fill: false,
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
      }
    });
    // No need to call update/resize, Chart.js handles it
    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [props.value, props.compare, props.type, props.year]);

  // create date options
  const start = 1958;
  const end = 2022;
  const years = [];
  for (let year = start; year <= end; year++) {
    years.push(<option key={year} value={year}>{year}</option>);
  }

  // set up labels/type options
  const deg = <span>&#176;</span>;
  const options = [
    {
      type: 'TAVG',
      title: `Monthly Temperature F${deg.props.children}`
    },
    {
      type: 'PRCP',
      title: 'Monthly Precipation (inches)'
    },
    {
      type: 'SNOW',
      title: 'Monthly Snowfall (inches)'
    }
  ];
  const label = options.filter(l => props.type === l.type);
  const types = options.map((opt, i) => <option key={i} value={opt.type}>{opt.title}</option>);

  return (
    <div className="chart">
      <h1>{label[0].title} Washington, DC </h1>
      <p>Data pulled from the National Arboretum</p>
      <div className="change-chart-wrapper">
        <select value={props.type} onChange={props.onChange}>
          {types}
        </select>
        <select value={props.year} onChange={props.changeYear}>
          {years}
        </select>
      </div>
      <div className="chart-container" style={{position:'relative', width: '44vw', margin: '0 auto'}}>
        <canvas ref={chartRef} id="temp-chart" width="500" height="500"></canvas>
      </div>
    </div>
  );
};

export default WeatherChart;
