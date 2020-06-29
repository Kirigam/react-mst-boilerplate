import * as Yup from 'yup';

export const emailValidation = () =>
  Yup.string()
    .required("Поле обов'язкове для заповнення")
    .email('Введіть E-mail адресу');

export const passwordValidation = () =>
  Yup.string()
    .min(8, 'Довжина паролю має бути не менше 8 символів')
    .required("Поле обов'язкове для заповнення");

export const nameValidation = (fieldName) =>
  Yup.string().matches(
    /^([А-ЯҐЄЁІЇа-яґєёії]|[A-Za-z]|[']|["]|[ ]|[-]){2,}$/,
    `${fieldName} має бути не менше двох символів і містити тільки букви`,
  );
