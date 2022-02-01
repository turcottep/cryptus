//react and css
import React, { useState, useEffect, Component } from "react";
import s from "./graph.module.scss";

//external exports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    Filler,
} from 'chart.js';

import { Chart, Line } from 'react-chartjs-2';

// //internal imports
import { data_raw } from "./data";
import { rgb } from "d3";


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

console.log(data_clean);
console.log(all_prices);


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
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
};


const DATA_COUNT = 12;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
}

const gradient_N = 10;

const datapoints = all_prices

const datapoints_2 = [2, 4, 6, 8, 10, 12];

const all_datasets = [
    {
        label: 'Cubic interpolation (monotone)',
        data: datapoints,
        borderColor: 'rgb(53, 162, 235)',
        fill: '+1',
        below: 'rgba(255, 99, 132, 0.2)',
        backgroundColor: 'rgba(53, 162, 235,0)',
        // fillColor: 'rgb(255, 162, 235)',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        pointRadius: 0,
    },
];

for (let i = 0; i < gradient_N; ++i) {
    const datapoints_temp = [];
    for (let j = 0; j < datapoints.length; ++j) {
        datapoints_temp.push(datapoints[j] * (1 - i / gradient_N));
    }
    all_datasets.push(
        {
            label: 'Cubic interpolation (monotone)',
            data: datapoints_temp,
            borderColor: 'rgb(53, 162, 235,0)',
            fill: (i === gradient_N - 1) ? 'origin' : '+1',
            below: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(53, 162, 235, ' + (0.4 - (i / gradient_N) * 0.4) + ')',
            // fillColor: 'rgb(255, 162, 235)',
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            pointRadius: 0,
        },
    );
}


const data = {
    labels: labels,
    datasets: all_datasets
    // {
    //     fillColor: 'rgb(255,0,0)', // Put the gradient here as a fill color
    //     strokeColor: 'rgb(255,0,0)',
    //     pointColor: 'rgb(255,0,0)',
    //     pointStrokeColor: "#ff6c23",
    //     pointHighlightFill: "#fff",
    //     pointHighlightStroke: "#ff6c23",
    //     data: [25.0, 32.4, 22.2, 39.4, 34.2, 22.0, 23.2, 24.1, 20.0, 18.4, 19.1, 17.4]
    // }



    // {
    //     label: 'Dataset 1',
    //     data: datapoints_2,
    //     borderColor: 'rgb(255, 99, 132)',
    //     backgroundColor: 'rgb(255, 99, 132)',
    //     stack: 'combined',
    //     type: 'bar'
    // }
    // {
    //     label: 'Cubic interpolation',
    //     data: datapoints,
    //     borderColor: 'rgb(255, 99, 132)',
    //     fill: false,
    //     tension: 0.4
    // },
    // {
    //     label: 'Linear interpolation (default)',
    //     data: datapoints,
    //     borderColor: 'rgb(255, 159, 64)',
    //     fill: false
    // }

} as any;

export default function Graph() {
    return (
        <Line data={data} options={options} />
    );
}

// export default class ColorPicker extends React.Component {
//     colorPickerRef: any;
//     constructor(props) {
//         super(props);

//         this.colorPickerRef = React.createRef();
//     }

//     componentDidMount() {
//         this.context = this.colorPickerRef.current.getContext('2d');
//     }

//     render() {
//         // return (
//         //     <Line options={options} data={data} />
//         // )
//         const gradient = this.context.createLinearGradient(0, 0, 0, 300);

//         return (
//             <canvas ref={this.colorPickerRef} />
//         )
//     }
// }


// export default class ColorPicker extends React.Component {
//     componentDidMount() {
//         const ctx = this.refs.chart.getContext('2d');
//         const x = this.props.data.map(obj => obj.datetime);
//         const y = this.props.data.map(obj => obj.price);
//         const gradient = ctx.createLinearGradient(0, 0, 0, 400);
//         gradient.addColorStop(0, 'rgba(250,174,50,1)');
//         gradient.addColorStop(1, 'rgba(250,174,50,0)');
//         const data = {
//             labels: x,
//             datasets: [
//                 {
//                     fillColor: gradient,
//                     data: y,
//                 },
//             ],
//         };
//         const options = {
//             // Boolean - If we should show the scale at all
//             showScale: false,
//             // Boolean - Whether to show a dot for each point
//             pointDot: false,
//             // Boolean - Whether to show a stroke for datasets
//             datasetStroke: false,
//         };
//         /* eslint new-cap: ["error", {"capIsNewExceptions": ["Line"]}] */
//         const myLineChart = new ChartJS(ctx).Line(data, options);
//     },
//     render() {
//         return <canvas className="chart" width="300" height="150" ref="chart" />;
//     },
// });