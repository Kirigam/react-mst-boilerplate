import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Route } from 'react-router-dom';
import s from './Home.module.scss';
import { Sidebar } from '../../Components/Sidebar/Sidebar.js';
import { UserSetings } from '../../Components/Users/UserSetings/UserSetings.js';
import { PrivateRoute, NameStorage } from '../../Constants/Index.js';
import { CreateOrder } from '../../Components/Order/CreateOrder/CreateOrder.js';
import storageService from '../../utils/storageService';
import { useStore } from '../../stores/stores.js';
import { observer } from 'mobx-react';
import { Loader } from '../../Components/Loader/Loader.js';

const MainScreen = () => {
  const [isLoading, setisLoading] = useState(true);

  const { users } = useStore((store) => ({
    users: store.users,
  }));

  useEffect(() => {
    async function fun() {
      const userID = storageService.get(NameStorage.USERID);

      try {
        await users.fetchUser(userID);

        setisLoading(false);
      } catch (error) {
        console.log(error.response);
        setisLoading(false);
      }
    }
    fun();
  }, []);

  return (
    <Box className={s.mainScreen}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Box className={s.mainScreenSidebar}>
            <Sidebar />
          </Box>
          <div className={s.mainScreenHero}>
            <Route
              path={PrivateRoute.SETINGS}
              component={UserSetings}
              exact
            />
            <Route
              path={PrivateRoute.CREATEORDER}
              component={CreateOrder}
              exact
            />
          </div>
        </>
      )}
    </Box>
  );
};
export default observer(MainScreen);
