import React from 'react';
import Home from './pages/home';
import {ThemeProvider} from '@material-ui/styles';
import {CssBaseline} from '@material-ui/core';
import theme from './themes/theme';
import {ReminderProvider} from 'context/reminder';
const App = () => {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReminderProvider>
          <Home />
        </ReminderProvider>
      </ThemeProvider>
    </main>
  );
};

export default App;
