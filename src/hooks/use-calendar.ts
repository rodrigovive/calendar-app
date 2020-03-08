import React from 'react';
import moment, {Moment} from 'moment';

type State = [
  {
    days: Moment[][];
    monthString: string;
    year: number;
    month: number;
  },
  any,
];

export default (defaultDate: Date): State => {
  const [date, setDate] = React.useState<Date>(defaultDate);
  const months = moment.months();
  const startDay = moment(date)
    .clone()
    .startOf('month')
    .startOf('week');
  const endDay = moment(date)
    .clone()
    .endOf('month')
    .endOf('week');
  const days: Moment[][] = [];
  const dateClone = startDay.clone().subtract(1, 'day');
  while (dateClone.isBefore(endDay, 'day')) {
    days.push(
      Array(7)
        .fill(0)
        .map(() => dateClone.add(1, 'day').clone()),
    );
  }
  const calendar = {
    days,
    monthString: months[date.getMonth()],
    year: date.getFullYear(),
    month: date.getMonth(),
  };
  return [calendar, setDate];
};
