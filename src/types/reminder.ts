import moment, {Moment} from 'moment';

export type Reminder = {
  day: Moment;
  reminderText: string;
  city: string;
  color: string;
  id?: string | number;
  forecast?: string;
};

export const initialReminder = {
  day: moment(),
  reminderText: '',
  city: '',
  color: '#E07070',
};
