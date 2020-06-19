import React from "react";
import { Avatar, Button, Typography, Box } from "@material-ui/core";
import useStyles from "./UserSetingsStyle";
// import { CustomInput } from "../../form/input/input";
import { Field, Form, Formik } from "formik";
// import { CustomInputMask } from "../../form/inputMask/inputMask";
import { CustomInput } from "../../Form/Elements/input/input";
import { CustomInputMask } from "../../Form/Elements/inputMask/inputMask";

export const UserSetings = () => {
  var classes = useStyles();

  // let User_info;
  // User_info = JSON.parse(window.localStorage.getItem("___User")).user;
  // console.log();

  return (
    <Box p={3}>
      <Typography variant="h2" fontWeight="600">
        Налаштування профілю
      </Typography>
      <Formik>
        <Form>
          <Box mt={2} className={classes.setings}>
            <div className={classes.conteiner}>
              <Typography
                className={classes.SetingTitle}
                variant="h4"
                fontWeight="600"
              >
                Особиста інформація
              </Typography>
              <div className={classes.SetingAvatar}>
                <Avatar className={classes.SetingAvatarFoto}></Avatar>
                <Button>Завантажити фото </Button>
              </div>
              <Field
                placeholder="E-mail"
                name="email"
                id="email"
                type="text"
                // value={User_info.fullName}
                component={CustomInput}
              />
              <Field
                placeholder="Номер телефону"
                name="phone"
                id="phone"
                mask="+380(99)999-99-99"
                type="tel"
                component={CustomInputMask}
              />

              <Field
              disabled
                placeholder="E-mail"
                name="email"
                id="email"
                type="text"
                // value={User_info.fullName}
                component={CustomInput}
              />

              <div className="">
                <Typography className={classes.InpunTitle} variant="body2">
                  Пароль
                </Typography>

                <Field
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Старий пароль"
                  component={CustomInput}
                />
                <Field
                  placeholder="Новий пароль"
                  name="password"
                  id="password"
                  type="password"
                  component={CustomInput}
                />
                <Field
                  placeholder="Повторити пароль"
                  name="RepeatPassword"
                  id="RepeatPassword"
                  type="password"
                  component={CustomInput}
                />
              </div>
            </div>

            <div className={classes.conteiner}>
              <Typography
                className={classes.SetingTitle}
                variant="h4"
                fontWeight="600"
              >
                Особиста інформація
              </Typography>

              <div className="">
                <Typography className={classes.InpunTitle} variant="body2">
                  Назва компанії
                </Typography>

                <Field
                  placeholder="E-mail"
                  name="email"
                  id="email"
                  type="text"
                  value="ТОВ Добробут"
                  disabled
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography className={classes.InpunTitle} variant="body2">
                  Код ЄДРПОУ
                </Typography>

                <Field
                  disabled
                  placeholder="E-mail"
                  name="email"
                  id="email"
                  type="text"
                  value="1263712631267838712"
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography className={classes.InpunTitle} variant="body2">
                  Адреса поставки
                </Typography>

                <Field
                  placeholder="E-mail"
                  name="email"
                  id="email"
                  type="text"
                  value="м. Тернопіль, С.Будного 32 А"
                  component={CustomInput}
                />
              </div>
              <div className="">
                <Typography className={classes.InpunTitle} variant="body2">
                  Сайт
                </Typography>

                <Field
                  placeholder="E-mail"
                  name="email"
                  id="email"
                  type="text"
                  value="www.company-site.com"
                  component={CustomInput}
                />
              </div>
            </div>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};
