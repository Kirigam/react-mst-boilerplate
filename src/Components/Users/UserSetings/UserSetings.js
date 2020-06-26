import React, { useState } from 'react';
import {
  Box, Button,
} from '@material-ui/core';

import s from './UserSetings.module.scss';
import { useStore } from '../../../stores/stores';
import { UserInfo } from '../../Form/userInfo/userInfo';
import { ChengPassword } from '../../Form/chengPassword/chengPassword';

export const UserSetings = () => {
  
  const { users } = useStore();
  const AuthUser = users.authUser;

  const [open, setOpen] = React.useState(false);

  console.log(open );
  
 
  function isOpenBox(){
    setOpen(!open);
  }
  
  return (
    <>
      <Box px={3}>
        <UserInfo isOpenBox={isOpenBox} ></UserInfo>
      </Box>
      {open&&(
        <Box p={3} className={s.setings}>
        <ChengPassword></ChengPassword>
      </Box>
      )}
      
    </>
  );
};
