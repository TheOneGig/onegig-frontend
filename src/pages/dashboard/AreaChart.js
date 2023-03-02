import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// ==============================|| APEXCHART - AREA ||============================== //

const AreaChart = ({ expenses, revenues }) => {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Expenses',
        data: expenses,
        borderColor: 'rgb(200, 200, 200)',
        backgroundColor: 'rgba(200, 200, 200, 0.5)'
      },
      {
        fill: true,
        label: 'Revenues',
        data: revenues,
        borderColor: 'rgba(84, 183, 156, 1)',
        backgroundColor: 'rgba(84, 183, 156, 0.5)'
      }
    ]
  };
  return <Line options={options} data={data} />;
};

AreaChart.propTypes = {
  dates: PropTypes.array,
  expenses: PropTypes.array,
  revenues: PropTypes.array
};

export default AreaChart;
