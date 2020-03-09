import React from 'react';
import moment, {Moment} from 'moment';

type Days = {
  weekCalendar: Moment[];
  id: string;
};
type State = [
  {
    days: Days[];
    monthString: string;
    year: number;
    month: number;
  },
  any,
];

export default (defaultDate: Date, months = moment.months()): State => {
  const [date, setDate] = React.useState<Date>(defaultDate);
  const startDay = moment(date)
    .clone()
    .startOf('month')
    .startOf('week');
  const endDay = moment(date)
    .clone()
    .endOf('month')
    .endOf('week');
  const days: Days[] = [];
  const dateClone = startDay.clone().subtract(1, 'day');
  while (dateClone.isBefore(endDay, 'day')) {
    days.push({
      weekCalendar: Array(7)
        .fill(0)
        .map(() => dateClone.add(1, 'day').clone()),
      id: String(dateClone.clone().week()),
    });
  }
  const calendar = {
    days,
    monthString: months[date.getMonth()],
    year: date.getFullYear(),
    month: date.getMonth(),
  };
  return [calendar, setDate];
};
