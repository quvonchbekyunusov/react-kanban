import React, { useRef } from 'react'
import { Formik, Form, FormikProps, FormikValues } from 'formik'
import * as Yup from 'yup'
import { TextField } from '../../signUp/components/TextField'
import { request } from '../../../utils/request'
import { useQuery } from 'react-query'
import { getUsers } from '../../../requests/queries/users'
import { useLocation, useNavigate } from 'react-router-dom'

export const Signin = () => {
    const ref = useRef<FormikProps<FormikValues>>(null)
    const navigate = useNavigate()
    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),
    })

    const { data, isLoading, refetch } = useQuery(
        [
            'getUsers',
            ref?.current?.values?.email,
            ref?.current?.values?.password,
        ],
        () => getUsers(ref?.current?.values),
        {
            enabled: false,
            onSuccess: async (data: any) => {
                if (data.length) {
                    await localStorage.setItem('user', JSON.stringify(data[0]))
                    navigate('/')
                } else {
                    alert('User not found')
                }
            },
        }
    )
    return (
        <Formik
            innerRef={ref}
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                refetch()
            }}
        >
            {(formik) => (
                <div>
                    <h1 className="my-4 font-weight-bold .display-4">
                        Sign In
                    </h1>
                    <Form>
                        <TextField label="Email" name="email" type="email" />
                        <TextField
                            label="password"
                            name="password"
                            type="password"
                        />
                        <button className="btn btn-dark m-3" type="submit">
                            Log in
                        </button>
                        <button className="btn btn-danger m-3" type="reset">
                            Reset
                        </button>
                        <a className="btn btn-danger m-3" href="/signup">
                            signup
                        </a>
                    </Form>
                </div>
            )}
        </Formik>
    )
}
