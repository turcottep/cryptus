import React, { useRef, useEffect, useState } from 'react';
import { ChartData, ChartArea, Filler, BarElement } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
    Tooltip,
    Legend
);

const color_graph = [53, 198, 90]

const create_rgba = (color: number[], alpha: number) => {
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = create_rgba(color_graph, 0.8);
    const colorMid = create_rgba(color_graph, 0.4);
    const colorEnd = create_rgba(color_graph, 0.1);

    const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
}

export default function Graph(props: { data: any, includeVolume: boolean }) {
    const { data, includeVolume } = props;

    const labels = []

    let average = 0;
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);

        average += data[i];
        labels.push("");
    }
    console.log(average);

    average = average / data.length;

    const data_line = labels.map((_, i) => data[i]);

    const data_average = []
    for (let i = 0; i < data.length; i++) {
        data_average.push(data[data.length - 1]);
    }
    console.log(data_average);

    const data_bar = labels.map((_, i) => Math.random() * 100);

    const optionsLine = {
        responsive: true,
        layout: {
            padding: {
                right: -50,
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                display: false,
            },
            y: {
                grid: {
                    display: false
                },
                suggestedMin: Math.min(...data_line) * 1.1,
                suggestedMax: Math.max(...data_line) * 1.05,
                position: 'right',
                ticks: {
                    mirror: true,
                    backdropPadding: 2,
                    // backdropColor: 'rgba(200,200,200)',
                    showLabelBackdrop: true,
                    padding: -10,
                    // major: true,
                    // textStrokeColor: '#000',
                    // textStrokeWidth: 1,
                    callback: function (value, index, values) {
                        // only return half of the values
                        const total_amount = values.length;
                        if ((index + 1) % 2 === 0 && index < total_amount - 1) {
                            return `${value} ⧫`;
                        }
                    },
                },
            }
        },
        spanGaps: true,
    };

    const optionsBar = {
        responsive: true,
        layout: {
            padding: {
                right: -50,
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                display: false,
            },
            y: {
                grid: {
                    display: false
                },
                beginAtZero: true,
                position: 'right',
                ticks: {
                    display: false,
                },
            }
        },
        spanGaps: true,
    };

    const chartRef = useRef<ChartJS>(null);
    const [chartDataLine, setChartDataLine] = useState<ChartData<'bar'>>({
        datasets: [],
    });
    const [chartDataBar, setChartDataBar] = useState<ChartData<'bar'>>({
        datasets: [],
    });

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) {
            return;
        }

        const chartDataLine = {
            labels,
            datasets: [{

                data: data_line,
                borderColor: create_rgba(color_graph, 1),
                // fill: '+1',
                pointBackgroundColor: create_rgba(color_graph, 1),
                // backgroundColor: createGradient(chart.ctx, chart.chartArea),
                cubicInterpolationMode: 'monotone',
                pointRadius: 0,
                tension: 0.4,
            },
            {
                data: data_average,
                lineStyle: 'dashed',
                fill: false,
                borderDash: [4, 5],
                borderWidth: 2,
                borderColor: 'rgba(0,0,0,0.5)', //create_rgba(color_graph, 1),
                pointRadius: 0,
            }],
        } as any;

        const chartDataBar = {
            labels,
            datasets: [
                {
                    data: data_bar,
                    backgroundColor: create_rgba(color_graph, 0.5),
                    borderColor: create_rgba(color_graph, 1),
                    borderRadius: 0,
                    borderWidth: 0,
                    type: 'bar',
                    // barThickness: 50,
                    borderSkipped: false,
                    barPercentage: 0.8,
                    categoryPercentage: 1,
                    // clip: { left: -40, right: 0, top: 0, bottom: 0 },
                }
            ],

        } as any;
        setChartDataLine(chartDataLine);
        setChartDataBar(chartDataBar);
    }, []);

    return (
        <div className="flex flex-col  mx-4">
            <div className="flex flex-col items-center">
                <span>
                    BAYC
                </span>
                <span>
                    Bored Ape Yacht Club
                </span>
            </div>
            <Chart className='bg-white p' ref={chartRef} type='line' data={chartDataLine} options={optionsLine} />
            {includeVolume ? <Chart className='bg-white max-h-12' ref={chartRef} type='line' data={chartDataBar} options={optionsBar} /> : null}
        </div >
    )
}
