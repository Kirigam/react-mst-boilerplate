import React from 'react';
import getStyle from './style';
import { Box, Select, MenuItem, Typography } from '@material-ui/core';

export const Headers = () => {
  const [language, setLanguage] = React.useState('ua');
  const s = getStyle();

  const selectLanguage = ({ target: { value } }) =>
    value !== language && setLanguage(value);

  return (
    <Box p={1.25}>
      <div className={s.headerBox}>
        <div>
          <a className={s.phone} href="tel:380688087708">
            <Typography
              className={s.phoneText}
              color="primary"
              variant="body1"
            >
              +380 (68) 808 77 08
            </Typography>
          </a>
        </div>
        <div>
          <Select
            className={s.headerSelect}
            variant="standard"
            value={language}
            onChange={selectLanguage}
          >
            <MenuItem selected value={'ua'}>
              УКР
            </MenuItem>
            <MenuItem value={'ru'}>РУС</MenuItem>
          </Select>

          <a href="/" className={s.headerButton}>
            Повернутись на головну
          </a>
        </div>
      </div>
    </Box>
  );
};
