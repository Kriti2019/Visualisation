import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import jsonData from './2.7.1_output.json';  
const BarGraphComponent = ({ year }) => {
    
    const yearData = jsonData[year] ? [{
        name: '0-14',
        Count: jsonData[year]['0-14'],
    }, {
        name: '15-24',
        Count: jsonData[year]['15-24'],
    }, {
        name: '25-34',
        Count: jsonData[year]['25-34'],
    }, {
        name: '35-44',
        Count: jsonData[year]['35-44'],
    }, {
        name: '45-54',
        Count: jsonData[year]['45-54'],
    }, {
        name: '55-64',
        Count: jsonData[year]['55-64'],
    }, {
        name: '65 and Above',
        Count: jsonData[year]['65 and Above'],
    }, {
        name: 'Not Reported',
        Count: jsonData[year]['Not Reported'],
    }] : [];

    return (
        <div>
            <h2>Data for {year}</h2>
            <BarChart
                width={600}
                height={300}
                data={yearData}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Count" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarGraphComponent;







