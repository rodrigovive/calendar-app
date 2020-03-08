import React from 'react';
import Weeks from 'components/calendar/weeks';
import Day from 'components/calendar/day';
import useStyles from './styles';
import {Moment} from 'moment';

type Props = {
  days: Moment[][];
};
const Calendar: React.FC<Props> = ({days}) => {
  const classes = useStyles();

  return (
    <table className={classes.table}>
      <thead className={classes.tableHead}>
        <tr>
          <td>
            <div>
              <Weeks />
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {days.map((weekCalendar, idx) => (
              <Day key={idx} weekCalendar={weekCalendar} />
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Calendar;
