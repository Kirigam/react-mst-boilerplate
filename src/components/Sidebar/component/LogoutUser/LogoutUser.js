import React from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import useStyles from './style';
import { useStore } from '../../../../stores/stores';
import { publicRoutes } from '../../../../constants/routes';

const LogoutUser = () => {
  var classes = useStyles();
  let history = useHistory();
  const { auth } = useStore();

  function onClick() {
    auth.logout();

    history.push(publicRoutes.LOGIN);
  }

  return (
    <div className={classes.wrap}>
      <button className={classes.exit} onClick={onClick}>
        <Typography variant="body2" className={classes.exit_text}>
          Вийти з профілю
        </Typography>
      </button>
    </div>
  );
};
export default observer(LogoutUser);
