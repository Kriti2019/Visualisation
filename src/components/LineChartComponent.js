import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Text } from 'recharts';

const LineChartComponent = () => {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        fetch('linedata.json')  
            .then(response => response.json())
            .then(jsonData => {
                const formattedData = formatData(jsonData);
                setData(formattedData);
            });

        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 4) % 12); 
        }, 5000);  // Adjust timing as needed

        return () => clearInterval(interval);
    }, []);

    const formatData = (jsonData) => {
        const allData = [];
        Object.keys(jsonData).forEach(year => {
            Object.keys(jsonData[year]).forEach(month => {
                if (month !== 'Total') {
                    const monthData = {
                        month: month,
                        year: year,
                        value: jsonData[year][month]
                    };
                    allData.push(monthData);
                }
            });
        });
        return allData;
    };

    const sliceDataToShow = data.filter(item => {
        const monthIndex = new Date(`1 ${item.month} 2000`).getMonth(); 
        return monthIndex >= index && monthIndex < index + 4; // display 4 months at a time
    });

    const currentMonths = monthNames.slice(index, index + 4).join(', ');

    return (
        <div>
            <h3>Displaying Data for: {currentMonths}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={sliceDataToShow}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;
