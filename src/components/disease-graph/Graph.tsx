import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const csvData = [
  { Date: "2018-01-01", Malaria_Cases: 7, Chikungunya_Cases: 6, Dengue_Cases: 7 },
  { Date: "2018-01-02", Malaria_Cases: 43, Chikungunya_Cases: 3, Dengue_Cases: 43 },
  { Date: "2018-01-03", Malaria_Cases: 11, Chikungunya_Cases: 7, Dengue_Cases: 11 },
  { Date: "2018-01-04", Malaria_Cases: 40, Chikungunya_Cases: 4, Dengue_Cases: 40 },
  { Date: "2018-01-05", Malaria_Cases: 33, Chikungunya_Cases: 6, Dengue_Cases: 33 },
];

const Graph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const labels = csvData.map((row) => row.Date);

    const malariaCases = csvData.map((row) => row.Malaria_Cases);
    const chikungunyaCases = csvData.map((row) => row.Chikungunya_Cases);
    const dengueCases = csvData.map((row) => row.Dengue_Cases);

    setChartData({
      labels,
      datasets: [
        {
          label: "Malaria Cases",
          data: malariaCases,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        },
        {
          label: "Chikungunya Cases",
          data: chikungunyaCases,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
        },
        {
          label: "Dengue Cases",
          data: dengueCases,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
        },
      ],
    });
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>Infectious Disease Trends</h2>
      {chartData ? <Line data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default Graph;
