import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './styles';
import {Moment} from 'moment';
import {Reminder, initialReminder} from 'types/reminder';
import Note from 'components/calendar/note';
import {
  useReminderState,
  useReminderDispatch,
  State as ReminderState,
} from 'context/reminder';
import * as CSS from 'csstype';
import getReminderInWeek from 'utils/getReminderInWeek';

type Props = {
  weekCalendar: Moment[];
  setModalOpen: (isOpen: boolean) => void;
  setReminder: (values: Reminder) => void;
  weekNumber: string;
  month: number;
};

const stylesHeight: CSS.Properties = {
  height: '7rem',
};

const stylesNumberDay: CSS.Properties = {
  color: 'gray',
};

const Day: React.FC<Props> = ({
  weekCalendar,
  setModalOpen,
  setReminder,
  weekNumber,
  month,
}) => {
  const reminderState = useReminderState();
  const remindersInWeek = getReminderInWeek(
    {...reminderState},
    weekCalendar,
    weekNumber,
  );
  const classes = useStyles();

  return (
    <div
      className={classes.containerTable}
      style={remindersInWeek.length ? undefined : stylesHeight}
    >
      <div className={classes.containerBg}>
        <table className={classes.tableBg}>
          <tbody>
            <tr>
              {weekCalendar.map((day, idx) => (
                <td
                  key={day.dayOfYear()}
                  className={classes.rowBg}
                  onClick={() => {
                    setReminder({
                      ...initialReminder,
                      day,
                    });
                    setModalOpen(true);
                  }}
                />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.containerRowTable}>
        <table>
          <thead>
            <tr>
              {weekCalendar.map((day, idx) => (
                <td
                  key={day.dayOfYear()}
                  className={classes.rowHead}
                  onClick={() => {
                    setReminder({
                      ...initialReminder,
                      day,
                    });
                    setModalOpen(true);
                  }}
                  style={month !== day.month() ? stylesNumberDay : undefined}
                >
                  <Typography
                    color="inherit"
                    align="left"
                    className={classes.rowDay}
                  >
                    {day.date()}
                  </Typography>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {remindersInWeek.map(({week, id}, idx) => (
              <tr key={`${id}-${idx}`}>
                {week.map((reminder, idx) =>
                  reminder ? (
                    <td
                      key={reminder.id}
                      onClick={() => {
                        setReminder({
                          ...initialReminder,
                          day: weekCalendar[idx],
                          id: undefined,
                        });
                        setModalOpen(true);
                      }}
                    >
                      <div
                        className={classes.rowBody}
                        onClick={e => {
                          e.stopPropagation();
                          setReminder({
                            ...initialReminder,
                            ...reminder,
                          });
                          setModalOpen(true);
                        }}
                      >
                        <Note reminder={reminder} />
                      </div>
                    </td>
                  ) : (
                    <td
                      key={weekCalendar[idx].dayOfYear()}
                      onClick={e => {
                        setReminder({
                          ...initialReminder,
                          day: weekCalendar[idx],
                          id: undefined,
                        });
                        setModalOpen(true);
                      }}
                    />
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Day;
