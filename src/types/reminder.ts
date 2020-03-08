import moment, {Moment} from 'moment';

export type Reminder = {
  day: Moment;
  reminderText: string;
  city: string;
  time: string | Moment;
  color: string;
  id?: string | number;
};

export const initialReminder = {
  day: moment(),
  reminderText: '',
  city: '',
  time: moment(),
  color: '',
};
