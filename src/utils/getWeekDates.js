import moment from 'moment';

export const getWeekDates = (date) => {
  const currentDate = moment(date);
  const weekStart = currentDate.clone().startOf('week');
  const days = [];
  for (let i = 0; i <= 6; i++) {
    const day = moment(weekStart).add(i, 'days');
    days.push(day);
  }
  return days;
};
