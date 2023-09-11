import { useState } from 'react';
import { Button } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import CustomTooltip from './CustomTooltip';

const Chart = ({ expenses, revenue }) => {
  const theme = useTheme();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [visibleRange, setVisibleRange] = useState([0, 6]);

  const data = months
    .map((month, index) => ({
      month,
      expenses: expenses[index],
      revenue: revenue[index]
    }))
    .slice(visibleRange[0], visibleRange[1]);

  const shiftData = (amount) => {
    const newStart = Math.max(0, visibleRange[0] + amount);
    const newEnd = Math.min(12, visibleRange[1] + amount);
    setVisibleRange([newStart, newEnd]);
  };

  return (
    <div style={{ width: '100%', height: 430, borderRadius: 5, backgroundColor: theme.palette.background.paper, paddingRight: 20 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="1 5" />
          <XAxis stroke={theme.palette.text.primary} dataKey="month" />
          <YAxis stroke={theme.palette.text.primary} tickCount={8} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Area type="monotone" dataKey="expenses" activeDot={{ r: 5 }} stroke={theme.palette.info.main} fill={theme.palette.info.main} fillOpacity={0.3} />
          <Area type="monotone" dataKey="revenue" activeDot={{ r: 5 }} stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.1} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', marginTop: 10, justifyContent: 'center' }}>
        <Button variant="contained" disabled={visibleRange[0] === 0} style={{ height: 26, marginRight: 30}}  onClick={() => shiftData(-6)}>
          {'<'}
        </Button>
        <Button variant="contained" disabled={visibleRange[1] === 12} style={{ height: 26, marginRight: 30}}  onClick={() => shiftData(6)}>
          {'>'}
        </Button>
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
