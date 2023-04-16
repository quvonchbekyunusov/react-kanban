import React, { useRef, useState } from 'react';
import { Formik, Form, FormikProps, FormikValues } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { request } from '../../../utils/request';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from 'react-query';
import { signup } from '../../../requests/mutations/user';
import { getUsers } from '../../../requests/queries/users';

export const Signup = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const ref = useRef<FormikProps<FormikValues>>(null);
   const validate = Yup.object({  
    firstName: Yup.string()
    .min(3, 'Must be 15 characters or less')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Password must match')
      .required('Confirm password is required'),
    })

    const {data: uData, isLoading: uLoading, refetch} = useQuery(['getUsers'],()=>getUsers({email: ref?.current?.values?.email}), {
        enabled: false,
        onSuccess: (data: any)=> {
            if(data?.length) {
                alert('bunday email bilan ro`yxatdan o`tilgan')
            } else {
                mutate(ref?.current?.values)
            }
        }
    })

  
  const {data, isLoading, mutate} = useMutation(signup, {
    onSuccess: ()=> {
        navigate('/signin')
    }
  })
  
  return (
    <Formik
    innerRef={ref}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        refetch()
        // mutate(values)
      }}
    >
      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="password" name="password" type="password" />
            <TextField label="Confirm Password" name="confirmPassword" type="password" />
            <button className="btn btn-dark m-3" type="submit" disabled={isLoading}>{isLoading?'Loading...':'Register'}</button>
            <button className="btn btn-danger m-3" type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
  )
}