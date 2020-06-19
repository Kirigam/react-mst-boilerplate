import React, { useEffect, useState } from 'react';
// import { Provider } from 'mobx-react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createStore, Provider } from './stores/stores';
import Themes from './them';
import { Headers } from './Components/Header/Header';
import { Router } from './scenes/Routes';

import { BrowserRouter } from 'react-router-dom';

function App() {
  const store = createStore();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    store.users.GetUsersInfo().then(() => {
      setLoading(false);
    });
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } 

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
