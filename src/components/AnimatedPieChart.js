import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const AnimatedPieChart = ({ dataUrl, chartTitle }) => {
  const [chartFrames, setChartFrames] = useState([]);
  const [chartSliderSteps, setChartSliderSteps] = useState([]);

  useEffect(() => {
    if (!dataUrl) {
      console.log("No URL provided for data fetch.");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const jsonData = await response.json();
        processData(jsonData);
      } catch (error) {
        console.error("Error fetching or parsing the data:", error);
      }
    };

    fetchData();
  }, [dataUrl]);

  const processData = (data) => {
    const framesData = [];
    const sliderStepsData = [];

    // Check if data is an array (like master_data.json)
    if (Array.isArray(data)) {
      data.forEach(item => {
        const year = item.year.toString();
        const values = item.data.map(d => d.value);
        const labels = item.data.map(d => d.category);

        framesData.push({
          data: [{ values, labels, type: 'pie' }],
          name: year
        });

        sliderStepsData.push(createSliderStep(year));
      });
    } else {
      // if the data format like 2.6.1_output.json and 2.7.1_output.json
      const years = Object.keys(data);
      years.forEach(year => {
        const categories = Object.keys(data[year]);
        const values = categories.map(category => data[year][category]);
        const labels = categories;

        framesData.push({
          data: [{ values, labels, type: 'pie' }],
          name: year
        });

        sliderStepsData.push(createSliderStep(year));
      });
    }

    setChartFrames(framesData);
    setChartSliderSteps(sliderStepsData);
  };

  const createSliderStep = (year) => ({
    label: year,
    method: 'animate',
    args: [[year], {
      mode: 'immediate',
      transition: { duration: 300 },
      frame: { duration: 300, redraw: true }
    }]
  });

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Plot
        data={chartFrames.length ? [chartFrames[0].data[0]] : []}
        layout={{
          title: chartTitle,
          updatemenus: [{
            buttons: [{
              label: 'Play',
              method: 'animate',
              args: [null, { frame: {duration: 500, redraw: true }, fromcurrent: true, mode: 'immediate'}]
            }, {
              label: 'Pause',
              method: 'animate',
              args: [[null], { mode: 'immediate', frame: {duration: 0} }]
            }]
          }],
          sliders: [{
            pad: { t: 50, b: 30 },
            steps: chartSliderSteps,
            transition: { duration: 300 }
          }]
        }}
        frames={chartFrames}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default AnimatedPieChart;
