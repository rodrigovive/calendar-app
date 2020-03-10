import React from 'react';
import {Reminder} from 'types/reminder';
import moment from 'moment';
export const ADD_REMINDER = 'ADD_REMINDER';
export const UPDATE_REMINDER = 'UPDATE_REMINDER';
export const ADD_FORECAST = 'ADD_FORECAST';
export const DELETE_REMINDER = 'DELETE_REMINDER';
type Action =
  | {type: 'ADD_REMINDER'; payload: Reminder}
  | {type: 'UPDATE_REMINDER'; payload: Reminder}
  | {type: 'DELETE_REMINDER'; payload: Reminder}
  | {
      type: 'ADD_FORECAST';
      payload: Reminder;
    };
type Dispatch = (action: Action) => void;
type ReminderProviderProps = {children: React.ReactNode};
export type State =
  | {
      [year: string]: {[weekNumber: string]: {[weekDay: string]: Reminder[]}};
    }
  | {[year: string]: {[weekNumber: string]: {}}};
const ReminderStateContext = React.createContext<State>({});

const ReminderDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);
function reminderReducer(state: State, action: Action) {
  const year = String(action.payload.day.year());
  const weekNumber = String(action.payload.day.week());
  const weekDay = String(action.payload.day.weekday());
  const remindersInDay =
    (state[year] &&
      state[year][weekNumber] &&
      state[year][weekNumber][weekDay]) ||
    [];
  switch (action.type) {
    case ADD_REMINDER: {
      const sortedReminders = [...remindersInDay, action.payload].sort(
        (a, b) => {
          if (a.day.clone().format('HHmm') < b.day.clone().format('HHmm')) {
            return -1;
          } else {
            return 1;
          }
        },
      );
      return {
        ...state,
        [year]: {
          ...state[year],
          [weekNumber]: {
            ...((state[year] && state[year][weekNumber]) || {}),
            [weekDay]: sortedReminders,
          },
        },
      };
    }
    case UPDATE_REMINDER: {
      const sortedReminders = remindersInDay
        .map(reminder => {
          if (reminder.id === action.payload.id) {
            return {
              ...reminder,
              ...action.payload,
            };
          }
          return reminder;
        })
        .sort((a, b) => {
          if (a.day.clone().format('HHmm') < b.day.clone().format('HHmm')) {
            return -1;
          } else {
            return 1;
          }
        });
      return {
        ...state,
        [year]: {
          ...state[year],
          [weekNumber]: {
            ...((state[year] && state[year][weekNumber]) || {}),
            [weekDay]: sortedReminders,
          },
        },
      };
    }
    case ADD_FORECAST: {
      const sortedReminders = remindersInDay.map(reminder => {
        if (reminder.id === action.payload.id) {
          return {
            ...reminder,
            forecast: action.payload.forecast,
          };
        }
        return reminder;
      });
      return {
        ...state,
        [year]: {
          ...state[year],
          [weekNumber]: {
            ...((state[year] && state[year][weekNumber]) || {}),
            [weekDay]: sortedReminders,
          },
        },
      };
    }
    case DELETE_REMINDER: {
      const sortedReminders = remindersInDay.filter(
        reminder => reminder.id !== action.payload.id,
      );
      return {
        ...state,
        [year]: {
          ...state[year],
          [weekNumber]: {
            ...((state[year] && state[year][weekNumber]) || {}),
            [weekDay]: sortedReminders,
          },
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}
function ReminderProvider({children}: ReminderProviderProps) {
  const [state, dispatch] = React.useReducer(reminderReducer, {});
  return (
    <ReminderStateContext.Provider value={state}>
      <ReminderDispatchContext.Provider value={dispatch}>
        {children}
      </ReminderDispatchContext.Provider>
    </ReminderStateContext.Provider>
  );
}
function useReminderState() {
  const context = React.useContext(ReminderStateContext);
  if (context === undefined) {
    throw new Error('ReminderProvider');
  }
  return context;
}
function useReminderDispatch() {
  const context = React.useContext(ReminderDispatchContext);
  if (context === undefined) {
    throw new Error('ReminderProvider');
  }
  return context;
}

async function getForecastByCity(dispatch: Dispatch, reminder: Reminder) {
  try {
    const {cod, list} = await (
      await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${reminder.city}&appid=17d1438a71bce72a11c6e3a38dbae6e4`,
      )
    ).json();
    if (cod === '200') {
      const dataForecast = list.find(
        (day: any) => moment(day.dt_txt) > reminder.day,
      );
      dispatch({
        type: ADD_FORECAST,
        payload: {
          ...reminder,
          forecast:
            (dataForecast.weather && dataForecast.weather[0].main) || '',
        },
      });
    }
  } catch (error) {
    console.log('error', error);
  }
}

export {
  ReminderProvider,
  useReminderState,
  useReminderDispatch,
  getForecastByCity,
};
