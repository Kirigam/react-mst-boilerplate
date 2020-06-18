import React from 'react';
// import { Provider } from 'mobx-react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import {createStore, Provider} from './stores/stores';
import Themes from './them';
import { Headers } from './Components/Header/Header';
import { Router } from './scenes/Routes';
 
import {  BrowserRouter } from 'react-router-dom';

function App() {
  const store = createStore();
  
  return (
    <ThemeProvider theme={Themes.default}>
      <Provider value={store}>
        <CssBaseline />
        <BrowserRouter>
          <Headers></Headers>

          <Router />
        </BrowserRouter>
       
      </Provider>
    </ThemeProvider>
  );
}

export default App;
