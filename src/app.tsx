import React from 'react';
import Home from './pages/home';
import {ThemeProvider} from '@material-ui/styles';
import {CssBaseline} from '@material-ui/core';
import theme from './themes/theme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </>
  );
};

export default App;
