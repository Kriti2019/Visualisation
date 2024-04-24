import React from 'react';
import Plot from 'react-plotly.js';
import data from './output_data.json'; 

const StackedBarChart = () => {
  
  const colors = ['#ADD8E6', '#87CEEB', '#6495ED', '#4169E1']; 

  const traces = ['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, index) => {
    return {
      x: data.map(entry => entry.YEAR.toString()),
      y: data.map(entry => entry[quarter]),
      name: quarter,
      type: 'bar',
      marker: {
        color: colors[index],  
      },
    };
  });

  const layout = {
    barmode: 'stack',
    title: 'FTAs in India by Quarter',
    xaxis: {
      title: 'Year',
      tickmode: 'linear',
      type: 'category'  
    },
    yaxis: {
      title: 'Number of FTAs'
    },
    bargap: 0.15, 
    margin: { l: 50, r: 50, t: 100, b: 50 }, 
    paper_bgcolor: 'rgba(255,255,255,1)',
    plot_bgcolor: 'rgba(255,255,255,1)',
    autosize: true,
  };

  return (
    <div style={{ width: '80vw', height: '80vh', margin: 'auto' }}>
      <Plot
        data={traces}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default StackedBarChart;
