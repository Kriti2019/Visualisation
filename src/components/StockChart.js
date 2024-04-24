import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const StockChart = () => {
  const [allData, setAllData] = useState({});
  const [timeframe, setTimeframe] = useState('daily');
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/CS661Stockdata_processed.json');
        const jsonData = await response.json();
        setAllData(jsonData);
        setPlotData(jsonData.daily); // Set initial data to daily
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update plot data when timeframe changes
    if (allData[timeframe]) {
      setPlotData(allData[timeframe]);
    }
  }, [timeframe, allData]);

  const getPlotlyData = () => {
    return [{
      x: plotData.map(d => d.Date),
      close: plotData.map(d => d['INDIGO.NS_close']),
      high: plotData.map(d => d['INDIGO.NS_high']),
      low: plotData.map(d => d['INDIGO.NS_low']),
      open: plotData.map(d => d['INDIGO.NS_open']),
      type: 'candlestick',
      name: 'Candlestick Data',
    }];
  };

  const layout = {
    title: 'Candle Stick Chart for INDIGO',
    xaxis: {
      title: 'Date',
      rangeslider: { visible: false },
      gridcolor: 'lightgrey',
      gridwidth: 1,
    },
    yaxis: {
      title: 'Price',
      gridcolor: 'lightgrey',
      gridwidth: 1,
    },
    paper_bgcolor: '#F5F5F5',
    plot_bgcolor: '#F5F5F5',
    margin: { l: 40, r: 40, t: 40, b: 40 },
    showlegend: false,
  };

  return (
    <div style={{ position: 'relative', paddingTop: '50px' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
        <button onClick={() => setTimeframe('daily')} style={{ marginRight: '5px' }}>Daily</button>
        <button onClick={() => setTimeframe('monthly')} style={{ marginRight: '5px' }}>Monthly</button>
        <button onClick={() => setTimeframe('quarterly')} style={{ marginRight: '5px' }}>Quarterly</button>
        <button onClick={() => setTimeframe('yearly')} style={{ marginRight: '5px' }}>Yearly</button>
      </div>
      <Plot
        data={getPlotlyData()}
        layout={layout}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default StockChart;
