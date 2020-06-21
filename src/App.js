import React, { useEffect, useState } from 'react';
// import { Provider } from 'mobx-react';
import { CssBaseline, ThemeProvider, Box } from '@material-ui/core';
import { createStore, Provider, useStore } from './stores/stores';
import Themes from './them';
import { Headers } from './Components/Header/Header';
import { Router } from './scenes/Routes';
import s from './App.module.scss';
import { BrowserRouter } from 'react-router-dom';
import storageService from './utils/storageService';
import { NameStorage } from './Constants/Index';
import { Loader } from './Components/Loader/Loader';
import { observer } from 'mobx-react';

function App() {
  const store = createStore();

  const [isLoading, setisLoading] = useState(true);

  // const { users } = useStore((store) => ({
  //   users: store.users,
  // }));

  useEffect(() => {
    async function fun() {
      const userID = storageService.get(NameStorage.USERID);

      try {
        const result = await store.users.fetchUser(userID);
        console.log('oc' );
        
        setisLoading(false);
      } catch (error) {
        console.log(error);
        // console.log(error.response);
        // setisLoading(false);
      }
    }
    fun();
  }, []);

  return (
    <ThemeProvider theme={Themes.default}>
      <Provider value={store}>
        <CssBaseline />
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <BrowserRouter>
            <div className={s.wrap}>
              <Router />
            </div>
          </BrowserRouter>
        )}
      </Provider>
    </ThemeProvider>
  );
}

export default observer(App);
