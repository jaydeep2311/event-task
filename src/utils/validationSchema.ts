import * as Yup from 'yup';

export const signupSchema = Yup.object({
  name: Yup.string().required('Name is required').min(3, 'Must be at least 3 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
});

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
