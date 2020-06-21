import React from 'react';
import s from './Loader.module.scss';
import { CircularProgress } from '@material-ui/core';

export const Loader = () => {
    // const s = useStyles();

  return (
    <>
      <div className={s.wrap_loader}>
        <CircularProgress color="secondary" />
      </div>
    </>
  );
};
