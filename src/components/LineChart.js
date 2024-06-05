import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: title,
            data: Object.values(data),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [data, title]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
