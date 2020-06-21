import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createStore, Provider } from './stores/stores';

import { Routes } from './scenes/Routes';
import { Headers } from './components/Header/Header';

import themes from './them';

function App() {
  const store = createStore();

  return (
    <ThemeProvider theme={themes.default}>
      <Provider value={store}>
        <CssBaseline />
        <Headers />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
