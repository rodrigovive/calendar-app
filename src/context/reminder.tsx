import React from 'react';
import {Reminder} from 'types/reminder';
import * as shortid from 'shortid';

type Action =
  | {type: 'add'; payload: Reminder}
  | {type: 'update'; payload: Reminder};
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
  switch (action.type) {
    case 'add': {
      const remindersInDay =
        (state[year] &&
          state[year][weekNumber] &&
          state[year][weekNumber][weekDay]) ||
        [];
      const sortedReminders = [
        ...remindersInDay,
        {
          ...action.payload,
          id: shortid.generate(),
        },
      ].sort((a, b) => {
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
    case 'update': {
      return {
        ...state,
        [year]: {
          ...state[year],
          [weekNumber]: {
            ...state[weekNumber],
            [weekDay]: [action.payload],
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
export {ReminderProvider, useReminderState, useReminderDispatch};
