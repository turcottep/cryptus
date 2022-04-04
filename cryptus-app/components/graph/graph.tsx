import React, { useRef, useEffect, useState } from "react";
import s from "./graph.module.scss";

import { ChartData, ChartArea, Filler, BarElement } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

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

const create_rgba = (color: number[], alpha: number) => {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
};

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
//   const colorStart = create_rgba(color_graph, 0.8);
//   const colorMid = create_rgba(color_graph, 0.4);
//   const colorEnd = create_rgba(color_graph, 0.1);

//   const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);

//   gradient.addColorStop(0, colorStart);
//   gradient.addColorStop(0.5, colorMid);
//   gradient.addColorStop(1, colorEnd);

//   return gradient;
// }

export default function Graph(props: {
  data_price: number[];
  data_volume: number[];
  color: "green" | "red";
  detailled: boolean;
}) {
  const { data_price, data_volume, detailled: detailled } = props;
  const chartRef = useRef<ChartJS>(null);
  const [chartDataLine, setChartDataLine] = useState<ChartData<"line">>({
    datasets: [],
  });
  const [optionsBar, setoptionsBar] = useState<any>();
  const [optionsLine, setoptionsLine] = useState<any>();
  const [key, setKey] = useState<number>(0);
  const [chartDataBar, setChartDataBar] = useState<ChartData<"bar">>({
    datasets: [],
  });

  const ReloadGraph = () => {
    const { data_price, data_volume, detailled: detailled } = props;

    const labels = [];

    let average = 0;
    for (const price of data_price) {
      average += price;
      labels.push(""); // TODO: add date
    }
    average = average / data_price.length;

    const data_line = labels.map((_, i) => data_price[i]);

    const data_average = [];
    for (const _ of data_price) {
      data_average.push(data_price[data_price.length - 1]);
    }

    const data_bar = data_volume ? labels.map((_, i) => data_volume[i]) : [];

    const optionsLine = {
      devicePixelRatio: detailled ? 4 : 1,
      responsive: true,
      layout: {
        padding: {
          right: -50,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
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
            display: false,
          },
          beginAtZero: false,
          display: detailled,
          suggestedMin: Math.min(...data_line) * 1.1,
          suggestedMax: Math.max(...data_line) * 1.05,
          position: "right",

          ticks: {
            // display: false,
            z: 1,
            mirror: true,
            backdropPadding: 2,
            showLabelBackdrop: true,
            padding: -10,
            callback: function (value, index, values) {
              // only return half of the values
              const total_amount = values.length;
              if ((index + 1) % 2 === 0 && index < total_amount - 1) {
                return `${value} ⧫`;
              }
            },
          },
        },
      },
      maintainAspectRatio: false,
      spanGaps: true,
    };

    const optionsBartemp = {
      devicePixelRatio: detailled ? 4 : 1,
      responsive: true,
      layout: {
        padding: {
          right: -50,
        },
      },
      plugins: {
        legend: {
          display: false,
          position: "top" as const,
        },
        title: {
          display: false,
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
            display: false,
          },
          beginAtZero: true,
          position: "right",
          ticks: {
            display: false,
          },
        },
      },
      maintainAspectRatio: false,
      spanGaps: true,
    };
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    const color_graph = props.color == "green" ? [53, 198, 90] : [255, 0, 0];

    const chartDataLine = {
      labels,
      datasets: [
        {
          data: data_line,
          borderColor: create_rgba(color_graph, 1),
          // fill: '+1',
          pointBackgroundColor: create_rgba(color_graph, 1),
          borderWidth: detailled ? 2 : 1,
          // backgroundColor: createGradient(chart.ctx, chart.chartArea),
          cubicInterpolationMode: "monotone",
          pointRadius: 0,
          tension: 0.4,
        },
        detailled && {
          data: data_average,
          lineStyle: "dashed",
          fill: false,
          borderDash: [4, 5],
          borderWidth: detailled ? 2 : 1,
          borderColor: "rgba(0,0,0,0.5)",
          pointRadius: 0,
        },
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
          type: "bar",
          borderSkipped: false,
          barPercentage: 0.8,
          categoryPercentage: 1,
        },
      ],
    } as any;
    setoptionsLine(optionsLine);
    setoptionsBar(optionsBartemp);
    setChartDataLine(chartDataLine);
    setChartDataBar(chartDataBar);
    // setKey(key + 1);
    // console.log("key", key);
  };

  useEffect(() => {
    ReloadGraph();
  }, [props]);

  return (
    <div className={s.container}>
      <Chart
        className={s.chart_line}
        ref={chartRef}
        type="line"
        data={chartDataLine}
        options={optionsLine}
      />
      {data_volume ? (
        <Chart
          className={s.chart_bar}
          ref={chartRef}
          type="line"
          data={chartDataBar}
          options={optionsBar}
        />
      ) : null}
    </div>
  );
}
