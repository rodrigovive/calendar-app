import React from 'react';
import Home from './pages/home';
import {ThemeProvider} from '@material-ui/styles';
import {CssBaseline} from '@material-ui/core';
import theme from './themes/theme';
import {ReminderProvider} from 'context/reminder';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const App = () => {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReminderProvider>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Home />
          </MuiPickersUtilsProvider>
        </ReminderProvider>
      </ThemeProvider>
    </main>
  );
};

export default App;
