import {useState} from 'react'
import {Button} from '@mantine/core'
import { AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import PropTypes from 'prop-types';

// ==============================|| CHART - AREA CHART ||============================== //

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'hsl(240, 1%, 26%)', color: '#fff', borderRadius: '5px', padding: '8px', minWidth: '150px', fontSize: '14px', opacity: '0.9' }}>
        <p style={{ margin: 0, lineHeight: 2, textTransform: 'uppercase', fontWeight: 600,}}>
          {label}
        </p>
        {payload.map((item, index) => (
          <p style={{ margin: 0, lineHeight: 1.5, color: item.name === "revenue" ? '#0eba9b' : '#e76161'
          }} key={index}>{`${item.name}: $${item.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

const Chart = ({ expenses, revenue }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
  ];
  
  const [visibleRange, setVisibleRange] = useState([0, 6]); 

  const data = months.map((month, index) => ({
    month,
    expenses: expenses[index],
    revenue: revenue[index]
  })).slice(visibleRange[0], visibleRange[1]); 

  const shiftData = (amount) => {
    const newStart = Math.max(0, visibleRange[0] + amount);
    const newEnd = Math.min(12, visibleRange[1] + amount);
    setVisibleRange([newStart, newEnd]);
  };

  return (
    <div style={{ width: "100%", height: 430, borderRadius: 5, backgroundColor: '#1e1e1e', paddingRight: 20 }}>
      <ResponsiveContainer>
        <AreaChart data={data} >
          <CartesianGrid strokeDasharray="1 5" />
          <XAxis stroke='#c3c3c3' dataKey='month'/>
          <YAxis  stroke='#c3c3c3' tickCount={8} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36}/>
          <Area type="monotone"  dataKey="expenses" activeDot={{ r: 5 }} stroke="#e76161" fill="#e76161" fillOpacity={0.3} />
          <Area type="monotone"  dataKey="revenue" activeDot={{ r: 5 }} stroke="#0eba9b" fill="#0eba9b" fillOpacity={0.1} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', marginTop: 10, justifyContent: 'center' }}>
        <Button variant='outline' disabled={visibleRange[0] === 0}h={26} mr={30} color='teal' onClick={() => shiftData(-6)}>{'<'}</Button>
        <Button variant='outline' disabled={visibleRange[1] === 12} h={26} color='teal' onClick={() => shiftData(6)}>{'>'}</Button>
      </div>
    </div>
  );
};

Chart.propTypes = {
  expenses: PropTypes.array.isRequired,
  revenue: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired
};

export default Chart;
