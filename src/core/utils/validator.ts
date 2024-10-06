import * as Yup from 'yup';

export const signInValidator = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This field is required'),
  password: Yup.string().required('This field is required').min(8, 'Password must be at least 8 characters'),
});

export const signUpValidator = (step: number) => {
  return Yup.object().shape({
    email:
      step === 1 ? Yup.string().email('Invalid email').required('This field is required') : Yup.string().notRequired(),
    firstName: step === 2 ? Yup.string().required('This field is required') : Yup.string().notRequired(),
    lastName: step === 2 ? Yup.string().required('This field is required') : Yup.string().notRequired(),
    password:
      step === 3
        ? Yup.string().required('This field is required').min(8, 'Password must be at least 8 characters')
        : Yup.string().notRequired(),
    confirmPassword:
      step === 3
        ? Yup.string()
            .required('This field is required')
            .oneOf([Yup.ref('password')], 'Password must match')
        : Yup.string().notRequired(),
  });
};

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('This field is required'),
});

export const resetPasswordValidator = Yup.object().shape({
  password: Yup.string().required('This field is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('This field is required')
    .oneOf([Yup.ref('password')], 'Password must match'),
});

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const supportContactFormValidator = Yup.object().shape({
  name: Yup.string().required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
  phoneNumber: Yup.string().required('This field is required').matches(phoneRegExp, 'Phone number is not valid'),
  message: Yup.string().required('This field is required'),
});
