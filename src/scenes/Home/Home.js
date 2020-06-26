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
import { ViewsOrder } from '../../Components/Order/ViewsOrder/ViewsOrder';
 
const MainScreen = () => {
  const [isLoading, setisLoading] = useState(true);

  const { orders, users } = useStore();
  console.log(orders);

  useEffect(() => {
    const userID = storageService.get(NameStorage.USERID);

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
              path={PrivateRoute.SETINGS}
              component={UserSetings}
              exact
            />
            <Route
              path={PrivateRoute.CREATEORDER}
              component={CreateOrder}
              exact
            />

            <Route
              path={PrivateRoute.HOME}
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
