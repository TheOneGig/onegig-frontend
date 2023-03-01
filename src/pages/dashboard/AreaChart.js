import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';

// chart options

// ==============================|| APEXCHART - AREA ||============================== //

const AreaChart = ({ dates, expenses, revenues }) => {
  const theme = useTheme();

  const areaChartOptions = {
    chart: {
      height: 350,
      type: 'area'
    },
    colors: ['#0eba9b', 'red'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: dates
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      }
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    }
  };
  const { mode } = useConfig();
  const line = theme.palette.divider;
  const { primary, secondary } = theme.palette.text;

  const [series] = useState([
    {
      name: 'Income',
      data: revenues
    },
    {
      name: 'Expenses',
      data: expenses
    }
  ]);

  const [options, setOptions] = useState(areaChartOptions);
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#0eba9b', 'red'],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: mode === 'dark' ? 'dark' : 'light'
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

AreaChart.propTypes = {
  dates: PropTypes.array,
  expenses: PropTypes.array,
  revenues: PropTypes.array
};

export default AreaChart;
