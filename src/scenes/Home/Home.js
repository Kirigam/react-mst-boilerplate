import React from 'react';
import { Box, Switch } from '@material-ui/core';
// import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Route  } from 'react-router-dom';
import useStyles from './style.js'; 
import { Sidebar } from '../../Components/Sidebar/Sidebar.js';
import { UserSetings } from '../../Components/Users/UserSetings/UserSetings.js';
import { PrivateRoute } from '../../Constants/Index.js';
import { CreateOrder } from '../../Components/Order/CreateOrder/CreateOrder.js';
// import { UserSetings } from '../../components/Users/UserSetings/UserSetings';

export const MainScreen = () => {
  var classes = useStyles();
 
  return (
    <Box className={classes.mainScreen}>
      <Box className={classes.mainScreenSidebar}>
        <Sidebar />
        1
      </Box>
      <div className={classes.mainScreenHero}>
      
        <Route path={PrivateRoute.SETINGS} component={UserSetings} exact />
        <Route path={PrivateRoute.CREATEORDER} component={CreateOrder} exact />
        <Switch>
         
        </Switch>
      </div>
    </Box>
  );
};
