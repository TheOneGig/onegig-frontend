import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'hsl(240, 1%, 26%)',
          color: '#fff',
          borderRadius: '5px',
          padding: '8px',
          minWidth: '150px',
          fontSize: '14px',
          opacity: '0.9'
        }}
      >
        <p style={{ margin: 0, lineHeight: 2, textTransform: 'uppercase', fontWeight: 600 }}>{label}</p>
        {payload.map((item, index) => (
          <p
            style={{ margin: 0, lineHeight: 1.5, color: item.name === 'revenue' ? '#54b79c' : '#e36161' }}
            key={index}
          >{`${item.name}: $${item.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

const Chart = ({ expenses, revenue, dates }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
    // 'August', 'September', 'October', 'November', 'December'
  ];

  const data = months.map((month) => ({ month }));

  dates.forEach((date, i) => {
    const month = dayjs(date).format('MMMM');
    const index = months.indexOf(month);
    if (index !== -1) {
      data[index].expenses = expenses[i];
      data[index].revenue = revenue[i];
    }
  });

  return (
    <LineChart width={750} height={400} data={data}>
      <CartesianGrid strokeDasharray="1 5" />
      <XAxis dataKey="month" />
      <YAxis tickCount={8} />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line type="monotone" dataKey="expenses" stroke="#e36161" />
      <Line type="monotone" dataKey="revenue" stroke="#54b79c" />
    </LineChart>
  );
};

Chart.propTypes = {
  expenses: PropTypes.array.isRequired,
  revenue: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Chart;
