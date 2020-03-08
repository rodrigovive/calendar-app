import React from 'react';
import {Reminder} from 'types/reminder';

const reducer = (prevState = {}, updatedState: Reminder) => {
  return {
    ...prevState,
    ...updatedState,
  };
};

const useSetState = (initialState: Reminder): [Reminder, any] => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setState = (updatedState: Reminder) => dispatch(updatedState);

  return [state, setState];
};

export default useSetState;
