import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AnimatedWorldMap from './components/AnimatedWorldMap';
import AnimatedPieChart from './components/AnimatedPieChart';
import StackedBarChart from './components/StackedBarChart';
import LineChartComponent from './components/LineChartComponent';
import GroupedBarChart from './components/GroupedBarChart';
import StockChart from './components/StockChart';
import ReturnsDistributionChart from './components/ReturnsDistributionChart';
import IndiaChoroplethMap from './components/IndiaChoroplethMap';
import YearlyBarChart from './components/YearlyBarChart';
import BarGraphComponent from './components/BarGraphComponent';
import data261 from './components/2.6.1_output.json';
import data271 from './components/2.7.1_output.json';

const App = () => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <StockChart/>
    </div>
  );
};

export default App; // Ensure this line is correctly placed and there are no syntax errors around it

ReactDOM.render(<App />, document.getElementById('root'));

