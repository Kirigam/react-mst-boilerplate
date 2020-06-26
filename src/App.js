import React  from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createStore, Provider } from './stores/stores';
import Themes from './them';
import { Router } from './scenes/Routes';
import s from './App.module.scss';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { SnackbarProvider } from 'notistack';

function App() {
  const store = createStore();
  const errorStore = createStore();

  return (
    <ThemeProvider theme={Themes.default}>
      <Provider value={store}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <BrowserRouter>
          <div className={s.wrap}>
            <Router />
          </div>
        </BrowserRouter>
      </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default observer(App);
