import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';

const GroupedBarChart = () => {
    const [data, setData] = useState({});
    const [yearIndex, setYearIndex] = useState(0);
    const [years, setYears] = useState([]);

    
    const parsePercentage = (stringValue) => {
        if (!stringValue) return { value: 0, month: '' };
        const match = stringValue.match(/(\w+)\s*\((\d+\.\d+)%\)/);
        return match ? { value: parseFloat(match[2]), month: match[1] } : { value: 0, month: '' };
    };

    useEffect(() => {
        fetch('2.3.2_output.json')
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData);
                setYears(Object.keys(jsonData).sort((a, b) => a - b));
            });
    }, []);

    useEffect(() => {
        if (years.length > 0) {
            const interval = setInterval(() => {
                setYearIndex(prevIndex => (prevIndex + 1) % years.length);
            }, 3000); // Change year every 3 seconds
            return () => clearInterval(interval);
        }
    }, [years.length]);

    const currentYear = years[yearIndex];
    const currentData = data[currentYear]?.map(countryData => {
        const leanData = parsePercentage(countryData.lean);
        const peakData = parsePercentage(countryData.peak);
        return {
            nationality: countryData.nationality,
            lean: leanData.value,
            leanMonth: leanData.month,
            peak: peakData.value,
            peakMonth: peakData.month,
        };
    })
    .sort((a, b) => b.peak - a.lean)
    .slice(0, 10) || [];

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nationality" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lean" fill="#8884d8" name="Lean">
                    <LabelList dataKey="leanMonth" position="top" />
                </Bar>
                <Bar dataKey="peak" fill="#82ca9d" name="Peak">
                    <LabelList dataKey="peakMonth" position="top" />
                </Bar>
            </BarChart>
            {years.length > 0 && <h2>Year: {currentYear}</h2>}
        </ResponsiveContainer>
    );
};

export default GroupedBarChart;
