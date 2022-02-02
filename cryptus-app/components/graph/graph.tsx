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

//internal imports
import { data_raw } from "./data";
import { type } from 'os';
import { min } from 'cypress/types/lodash';


// // parse data from "0     18462 2022-01-31 15:40:26         3.98           ETH    2549.53  0x63950ef80536bce5b4f0942ada77a5eeef7368ee9842af49ebbc2b6383e2bdde      1643661626" to "tokenid,timestamp_raw,total_price payment_token,usd_price,transaction_hash,timestamp_unix"
const data_clean = data_raw.split('\n').map((row) => {
    const [tx_id, tokenid, timestamp_day, timestamp_time, total_price, payment_token, usd_price, transaction_hash, timestamp_unix] = row.split(/\s+/);
    return {
        tx_id,
        tokenid,
        timestamp_day,
        timestamp_time,
        total_price,
        payment_token,
        usd_price,
        transaction_hash,
        timestamp_unix,
    };
});

const all_prices = data_clean.map((row) => {
    return parseFloat(row.total_price);
});

// console.log(data_clean);
// console.log(all_prices);


// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Filler,
//     Title,
//     Tooltip,
//     Legend
// );

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const temp_faranheit = [120, 100, 140, 100, 180, 185, 190];
const labels = []

let average = 0;
for (let i = 0; i < data_clean.length; i++) {
    console.log(all_prices[i]);

    average += all_prices[i];
    labels.push(data_clean[i].timestamp_day);
}
console.log(average);

average = average / data_clean.length;

const data_line = labels.map((_, i) => all_prices[i]);

const data_average = []
for (let i = 0; i < all_prices.length; i++) {
    // if (i % 10 === 0) {
    data_average.push(all_prices[all_prices.length - 1]);
    // }
    // else {
    //     data_average.push(null);
    // }
}
console.log(data_average);

// const volume = [10, 20, 30, 40, 50, 20, 40];
const data_bar = labels.map((_, i) => Math.random() * 100);


export const optionsLine = {
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

            // type: "linear",
        },
        y: {
            grid: {
                display: false
            },
            suggestedMin: Math.min(...data_line) * 0.9,
            suggestedMax: Math.max(...data_line) * 1.05,
            // beginAtZero: true,
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
    // ticks: {
    //     
    // },
};

export const optionsBar = {
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

            // type: "linear",
        },
        y: {
            grid: {
                display: false
            },
            // suggestedMin: Math.min(...data_line) * 0.9,
            // suggestedMax: Math.max(...data_line) * 1.05,
            beginAtZero: true,
            position: 'right',
            ticks: {
                display: false,
            },
        }
    },
    spanGaps: true,
    // ticks: {
    //     
    // },
};

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

export default function App() {
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
                fill: '+1',
                pointBackgroundColor: create_rgba(color_graph, 1),
                backgroundColor: createGradient(chart.ctx, chart.chartArea),
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
            }

            ],

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
            {/* <div className='bg-green-100 h-12'> */}
            {/* </div> */}
            <Chart className='bg-white max-h-12' ref={chartRef} type='line' data={chartDataBar} options={optionsBar} />
        </div >
    )
}
