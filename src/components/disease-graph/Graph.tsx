import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const csvData = [
  {
    Date: '2018-01-01',
    Malaria_Cases: 7,
    Chikungunya_Cases: 6,
    Dengue_Cases: 10,
  },
  {
    Date: '2018-01-02',
    Malaria_Cases: 43,
    Chikungunya_Cases: 3,
    Dengue_Cases: 45,
  },
  {
    Date: '2018-01-03',
    Malaria_Cases: 11,
    Chikungunya_Cases: 7,
    Dengue_Cases: 13,
  },
  {
    Date: '2018-01-04',
    Malaria_Cases: 40,
    Chikungunya_Cases: 4,
    Dengue_Cases: 48,
  },
  {
    Date: '2018-01-05',
    Malaria_Cases: 33,
    Chikungunya_Cases: 6,
    Dengue_Cases: 34,
  },
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
          label: 'Malaria Cases',
          data: malariaCases,
          borderColor: 'rgba(255, 0, 0, 0.9)',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderWidth: 3,
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'Chikungunya Cases',
          data: chikungunyaCases,
          borderColor: 'rgba(0, 0, 255, 0.9)',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderWidth: 3,
          pointStyle: 'rectRounded',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'Dengue Cases',
          data: dengueCases,
          borderColor: 'rgba(34, 197, 94, 1)', // Brighter Green
          backgroundColor: 'rgba(34, 197, 94, 0.3)',
          borderWidth: 3,
          pointStyle: 'triangle',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    });
  }, []);

  return (
    <div
      style={{
        width: '80%',
        maxWidth: '900px', // Set a max width
        height: '500px', // Set a fixed height
        margin: 'auto',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '10px',
        }}
      >
        Infectious Disease Trends
      </h2>
      {chartData ? (
        <div style={{ height: '400px' }}>
          {' '}
          {/* Restrict chart height */}
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true, // Prevent excessive stretching
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Graph;
