import React from 'react';
import {render} from '@testing-library/react';
import {ReminderProvider} from '../src/context/reminder';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
function renderProvider(ui) {
  function Wrapper(props) {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ReminderProvider {...props} />
      </MuiPickersUtilsProvider>
    );
  }
  return render(ui, {wrapper: Wrapper});
}

export * from '@testing-library/react';
export {renderProvider as render};
