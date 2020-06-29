import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, MstProvider } from './stores/stores';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { Router } from './scenes/Routes';
import { SnackbarProvider } from 'notistack';
import themes from './them';

const store = createStore();

const App = () => (
  <ThemeProvider theme={themes.default}>
    <MstProvider value={store}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SnackbarProvider>
    </MstProvider>
  </ThemeProvider>
);

export default App;
