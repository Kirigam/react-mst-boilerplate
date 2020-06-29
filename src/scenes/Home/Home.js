import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Route } from 'react-router-dom';
import s from './Home.module.scss';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { UserSetings } from '../../components/Users/UserSetings/UserSetings.js';
import { privateRoutes } from '../../constants/routes';
import localStorageKeys from '../../constants/localStorageKeys';
import { CreateOrder } from '../../components/Order/CreateOrder/CreateOrder.js';
import storageService from '../../utils/storageService';
import { useStore } from '../../stores/stores.js';
import { observer } from 'mobx-react';
import { Loader } from '../../components/Loader/Loader.js';
import { ViewsOrder } from '../../components/Order/ViewsOrder/ViewsOrder';
 
const MainScreen = () => {
  const [isLoading, setisLoading] = useState(true);

  const { orders, users } = useStore();
  console.log(orders);

  useEffect(() => {
    const userID = storageService.get(localStorageKeys.USER_ID);

    Promise.resolve(users.fetchUser(userID))
      .then((result) => {
        console.log(result.data.user);
        setisLoading(false);
      })
      .catch((error) => {
        // console.log( );

        console.log(error.response);
        setisLoading(false);
      });
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
              path={privateRoutes.SETTINGS}
              component={UserSetings}
              exact
            />
            <Route
              path={privateRoutes.CREATE_ORDER}
              component={CreateOrder}
              exact
            />

            <Route
              path={privateRoutes.HOME}
              component={ViewsOrder}
              exact
            />
          </div>
        </>
      )}
    </Box>
  );
};
export default observer(MainScreen);
