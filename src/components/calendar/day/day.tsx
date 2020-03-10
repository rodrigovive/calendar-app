import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './styles';
import moment, {Moment} from 'moment';
import {Reminder, initialReminder} from 'types/reminder';
import Note from 'components/calendar/note';
import {
  useReminderState,
  useReminderDispatch,
  State as ReminderState,
} from 'context/reminder';
import * as CSS from 'csstype';
type Props = {
  weekCalendar: Moment[];
  setModalOpen: (isOpen: boolean) => void;
  setReminder: (values: Reminder) => void;
  weekNumber: string;
  month: number;
};

type TypeAcc = {
  [key: string]: Reminder[];
};

const getReminderInWeek = (
  reminderState: ReminderState,
  weekCalendar: Moment[],
  weekNumberInYear: string,
) => {
  const objectReminder: TypeAcc = {};
  weekCalendar.map((day, idx) => {
    const year = String(day.year());
    const weekNumber = String(day.week());
    const weekDay = String(day.weekday());
    const reminders =
      (reminderState[year] &&
        reminderState[year][weekNumber] &&
        reminderState[year][weekNumber][weekDay]) ||
      [];
    if (reminders.length) {
      objectReminder[String(idx)] = reminders;
    }
  });
  let existReminderWeek = Object.keys(objectReminder).some(k =>
    Boolean(objectReminder[k].length),
  ); // O(7)
  const reminderWeek = [];
  while (existReminderWeek) {
    const newArr = Array(7)
      .fill(undefined)
      .map((_, idx) => {
        let reminder = undefined;
        const checkReminder = Boolean(
          objectReminder[idx] && objectReminder[idx].length,
        );
        if (checkReminder) {
          reminder = objectReminder[idx][0];
          objectReminder[idx] = [...objectReminder[idx].slice(1)];
        }
        return reminder;
      }); // O(7);
    reminderWeek.push({
      week: newArr,
      id: weekNumberInYear,
    });
    existReminderWeek = Object.keys(objectReminder).some(k =>
      Boolean(objectReminder[k].length),
    );
  }
  return reminderWeek;
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
