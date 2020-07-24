import {State as ReminderState} from 'context/reminder';
import {Reminder} from 'types/reminder';
import {Moment} from 'moment';

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

export default getReminderInWeek;
