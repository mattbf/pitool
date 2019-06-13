import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import MainRouter from './MainRouter.js';

const theme = createMuiTheme({
  palette: {
    //type: 'dark',
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#d50000',
    },
  },
  status: {
    danger: '#f458ss',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter/>
    </ThemeProvider>
  );
}

export default App;
