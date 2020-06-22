import React  from 'react';
import useStyles from './HeaderStyle';
import { Typography, Box} from '@material-ui/core';
import { PublicRoute } from '../../Constants/Index'; 
import { AdaptiveMenu } from './components/AdaptiveMenu/AdaptiveMenu'; 
import { HamburgerSlider } from 'react-animated-burgers';

export const Headers = ({isOpen,OpenMenu}) => {
  const s = useStyles();
  // const [age, setAge] = useState('');

  // // const [isOpen, SetOpen] = useState({ open: false });

  // // function OpenMenu() {
  // //   SetOpen({ open: !isOpen.open });
  // //   console.log(isOpen);
  // // }

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <>

      <Box p={1.25}>
        <div className={s.headerBox}>
          <div className="">
            <a className={s.phone} href="tel:380504318736">
              <Typography
                className={s.phoneText}
                color="primary"
                variant="body1"
              >
                
                +380 (50) 431 8736
                
              </Typography>
            </a>
            <div className=""></div>
          </div>
          <div className="">
            {/* <Select
            className={s.headerSelect}
            variant="standard"
            value={age}
            onChange={handleChange}
          >
            <MenuItem selected value={5}>УКР</MenuItem>
            <MenuItem value={10}>РУС</MenuItem>
          </Select> */}

            {/* Select LInk LEngwittch */}

            <a
              href={PublicRoute.URLWEBSITE}
              className={s.headerButton}
            >
              Повернутись на головну
            </a>
            <HamburgerSlider
              isActive={isOpen.open}
              toggleButton={OpenMenu}
              buttonWidth={28}
              barColor='#494a4e'
              className={s.HamburgerSlider}
            />
          </div>
        </div>
      </Box>
      <AdaptiveMenu isOpen={isOpen.open} ></AdaptiveMenu>
    </>
  );
};
