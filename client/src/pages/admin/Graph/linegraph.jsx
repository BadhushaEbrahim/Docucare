import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const LineGraph = ({ revenue }) => {
  // Sample dummy data for revenue
  const dummyRevenue = [
    { month: 1, revenue: 1000 },
    { month: 2, revenue: 1500 },
    { month: 3, revenue: 2000 },
    { month: 4, revenue: 1800 },
    { month: 5, revenue: 2500 },
    { month: 6, revenue: 2800 },
    { month: 7, revenue: 3000 },
    { month: 8, revenue: 3500 },
    { month: 9, revenue: 4000 },
    { month: 10, revenue: 3800 },
    { month: 11, revenue: 4200 },
    { month: 12, revenue: 4500 },
  ];

  const [data, setData] = useState({
    series: [
      {
        name: "Revenue",
        data: Array(12).fill(0),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Revenue per Month",
        align: "left",
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        min: 0,
        max: 10000,
      },
    },
  });

  useEffect(() => {
    const apexChartData = Array(12).fill(0); // Initialize the array with 12 elements, all set to 0
    const categories = [];

    dummyRevenue.forEach((item) => {
      if (item.month !== null && item.month >= 1 && item.month <= 12) {
        apexChartData[item.month - 1] = item.revenue;
      }
    });

    // Get the corresponding month names for the x-axis categories
    const fullMonthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    categories.push(...fullMonthNames.slice(0, apexChartData.length));

    setData((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Revenue",
          data: apexChartData,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: categories,
        },
      },
    }));
  }, [revenue]);

  return (
    <Chart
      options={data.options}
      series={data.series}
      type="line"
      width={1080}
      height={600}
    />
  );
};

// Usage with dummy data
const App = () => {
  // Use dummy data for testing
  const dummyData = dummyRevenue.map((item) => ({
    month: item.month,
    revenue: item.revenue,
  }));

  return (
    <div>
      <h1>Revenue Chart</h1>
      <LineGraph revenue={dummyData} />
    </div>
  );
};

export default LineGraph;
