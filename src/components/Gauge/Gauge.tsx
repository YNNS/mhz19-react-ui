import {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";

interface GaugeProps {
    value: number;
}

export function Gauge(props: GaugeProps) {

    const [value, setValue] = useState('#8CC152')

    useEffect(() => {
        if (props.value >= 1400) {
            setValue('#DA4453')
        } else if (props.value >= 1000) {
            setValue('#E9573F')
        } else if (props.value >= 800) {
            setValue('#FCBB42')
        } else {
            setValue('#8CC152')
        }
    })

    return (
        <div id="chart">
            <ReactApexChart options={{
                chart: {
                    type: 'radialBar',
                    offsetY: 10
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        dataLabels: {
                            name: {
                                fontSize: '1rem',
                                color: '#ffffff',
                                offsetY: 120
                            },
                            value: {
                                offsetY: 76,
                                fontSize: '1.375rem',
                                fontFamily: 'Inter',
                                fontWeight: 400,
                                color: '#ffffff',
                                formatter: function (val) {
                                    return (((val * 1000) / 100) + 400) + " ppm";
                                }
                            }
                        }
                    }
                },
                fill: {
                    type: 'color',
                    colors: [value],
                },
                labels: ['']
            }} series={[(((props.value - 400) * 100) / 1000)]} type="radialBar" height={350}/>
        </div>
    );
}
