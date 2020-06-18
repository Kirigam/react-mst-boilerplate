import React from 'react';
import useStyles from './HeaderStyle';
import {
  Typography,
  Box,
  Select,
  MenuItem,
} from '@material-ui/core';

export const Headers = () => {
  const s = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box p={1.25}>
      <div className={s.headerBox}>
        <div className="">
          <a className={s.phone} href="tel:380688087708">
            <Typography className={s.phoneText} color="primary" variant="body1">
              +380 (68) 808 77 08
            </Typography>
          </a>
          <div className=""></div>
        </div>
        <div className="">
          <Select
            className={s.headerSelect}
            variant="standard"
            value={age}
            onChange={handleChange}
          >
            <MenuItem selected value={5}>УКР</MenuItem>
            <MenuItem value={10}>РУС</MenuItem>
          </Select>

          <a href="#" className={s.headerButton}>Повернутись на головну</a>
        </div>
      </div>
    </Box>
  );
};
