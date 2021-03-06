import React from 'react';
import Weeks from 'components/calendar/weeks';
import Day from 'components/calendar/day';
import useStyles from './styles';
import moment, {Moment} from 'moment';
import ModalReminder from 'components/modal-reminder';
import {Reminder, initialReminder} from 'types/reminder';

type Props = {
  days: {
    weekCalendar: Moment[];
    id: string;
  }[];
  month: number;
};

const Calendar: React.FC<Props> = ({days, month}) => {
  const classes = useStyles();
  const [isModalReminderOpen, setModalReminderOpen] = React.useState(false);
  const [reminder, setReminder] = React.useState<Reminder>(initialReminder);
  return (
    <>
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
              {days.map(({weekCalendar, id}, idx) => (
                <Day
                  key={id}
                  weekNumber={id}
                  weekCalendar={weekCalendar}
                  setReminder={setReminder}
                  setModalOpen={setModalReminderOpen}
                  month={month}
                />
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      <ModalReminder
        isOpen={isModalReminderOpen}
        setModalOpen={setModalReminderOpen}
        reminder={reminder}
      />
    </>
  );
};

export default Calendar;
