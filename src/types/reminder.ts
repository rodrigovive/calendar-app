import moment, {Moment} from 'moment';

export type Reminder = {
  day: Moment;
  reminderText: string;
  city: string;
  color: string;
  id?: string | number;
};

export const initialReminder = {
  day: moment(),
  reminderText: '',
  city: '',
  color: '',
};
