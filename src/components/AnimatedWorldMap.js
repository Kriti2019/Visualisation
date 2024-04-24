import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import data from './data.json';

const AnimatedWorldMap = () => {
        const [frames, setFrames] = useState([]);
        const [sliderSteps, setSliderSteps] = useState([]);

        useEffect(() => {
            // Set the JSON data to the state
            processData();
        }, []);


        const processData = () => {
            const filterAndUnpack = (data, key, year) => {
                return data.filter(d => parseInt(d.year) === year).map(d => d[key]);
            };

            const framesData = [];
            const sliderStepsData = []

            let num = 1952;
            for (let i = 0; i <= 11; i++) {
                const z = filterAndUnpack(data, 'lifeExp', num);
                const locations = filterAndUnpack(data, 'iso_alpha', num);
                framesData[i] = {
                    data: [{z: z, locations: locations, text: locations}],
                    name: num
                };
                sliderStepsData.push({
                    label: num.toString(),
                    method: "animate",
                    args: [[num], {
                        mode: "immediate",
                        transition: {duration: 300},
                        frame: {duration: 300}
                    }]
                })

                num = num + 5
                console.log(num);
            }
            setFrames(framesData)
            setSliderSteps(sliderStepsData)
        }


        return (
            <div style={{width: '100%', height: '600px'}}>

                <Plot
                    data={[
                        {
                            type: 'choropleth',
                            locationmode: 'ISO-3',
                            locations: frames[0]?.data[0]?.locations || [],
                            z: frames[0]?.data[0]?.z || [],
                            text: frames[0]?.data[0]?.locations || [],
                            zauto: false,
                            zmin: 30,
                            zmax: 90,
                            colorscale: 'Viridis',
                        },
                    ]}
                    layout={{
                        title: 'World Life Expectancy',
                        geo: {
                            scope: 'world',
                            countrycolor: 'rgb(255, 255, 255)',
                            showland: true,
                            landcolor: 'rgb(217, 217, 217)',
                            showlakes: true,
                            lakecolor: 'rgb(255, 255, 255)',
                            subunitcolor: 'rgb(255, 255, 255)',
                            lonaxis: {},
                            lataxis: {},
                        },
                        updatemenus: [
                            {
                                x: 0.1,
                                y: 0,
                                yanchor: 'top',
                                xanchor: 'right',
                                showactive: false,
                                direction: 'left',
                                type: 'buttons',
                                pad: {t: 87, r: 10},
                                buttons: [
                                    {
                                        method: 'animate',
                                        args: [null, {
                                            fromcurrent: true,
                                            transition: {
                                                duration: 200,
                                            },
                                            frame: {
                                                duration: 500,
                                            },
                                        }],
                                        label: 'Play',
                                    },
                                    {
                                        method: 'animate',
                                        args: [
                                            [null],
                                            {
                                                mode: 'immediate',
                                                transition: {
                                                    duration: 0,
                                                },
                                                frame: {
                                                    duration: 0,
                                                },
                                            },
                                        ],
                                        label: 'Pause',
                                    },
                                ],
                            },
                        ],
                        sliders: [
                            {
                                active: 0,
                                steps: sliderSteps,
                                x: 0.1,
                                len: 0.9,
                                xanchor: 'left',
                                y: 0,
                                yanchor: 'top',
                                pad: {t: 50, b: 10},
                                currentvalue: {
                                    visible: true,
                                    prefix: 'Year:',
                                    xanchor: 'right',
                                    font: {
                                        size: 20,
                                        color: '#666',
                                    },
                                },
                                transition: {
                                    duration: 300,
                                    easing: 'cubic-in-out',
                                },
                            },
                        ],
                    }}
                    config={{displayModeBar: false}}
                    style={{width: '100%', height: '100%'}}
                    frames={frames}
                />
            </div>
        );
    }
;

export default AnimatedWorldMap