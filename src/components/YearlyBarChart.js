import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import data from './2.8.1_output.json';  // Ensure this path is correct

const YearlyBarChart = ({ year }) => {
  // Filter the data for the selected year and transform it for the bar chart
  const dataForYear = data.filter(d => d.Year === year).map(item => ({
    name: item.Country,
    'Business and Professional': item['Business and Professional'],
    'Leisure Holiday and Recreation': item['Leisure Holiday and Recreation'],
    Medical: item['Medical'],
    'Indian Diaspora': item['Indian Diaspora'],
    Others: item['Others']
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={dataForYear}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
        barCategoryGap="10%"
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Business and Professional" fill="#407294" />
        <Bar dataKey="Leisure Holiday and Recreation" fill="#739e82" />
        <Bar dataKey="Medical" fill="#a64d79" />
        <Bar dataKey="Indian Diaspora" fill="#6a4c93" />
        <Bar dataKey="Others" fill="#4c6793" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default YearlyBarChart;
