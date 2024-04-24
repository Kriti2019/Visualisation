import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import stockData from './CS661Stockdata.json'; // Adjust the path as necessary

const ReturnsDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const processedData = processStockData(stockData.daily);
    setData(processedData);
  }, []);

  // Process the stock data into the format required by Plotly
  const processStockData = (stockData) => {
    const years = [...new Set(stockData.map(item => new Date(item.Date).getFullYear()))];
    const groupedData = years.map(year => {
      const yearData = stockData.filter(item => new Date(item.Date).getFullYear() === year);
      const logReturns = yearData.map((day, index, arr) => {
        if (index === 0) return null; // Skip the first entry
        return Math.log(day['INDIGO.NS_close'] / arr[index - 1]['INDIGO.NS_close']);
      }).filter(val => val != null); // Filter out the first null entry

      return {
        type: 'scatter',
        mode: 'lines',
        name: year.toString(),
        x: logReturns,
        y: Array(logReturns.length).fill(1), // Dummy Y value, replace with actual density if needed
        line: { shape: 'spline' }, // Smooth line, you can remove this for a linear line
      };
    });

    return groupedData;
  };

  const layout = {
    title: 'Returns Distribution',
    xaxis: {
      title: 'Log Returns',
      autorange: true
    },
    yaxis: {
      title: 'Density',
      autorange: true
    },
    shapes: [
      // Optional: add shapes, annotations, etc.
    ]
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ReturnsDistributionChart;
