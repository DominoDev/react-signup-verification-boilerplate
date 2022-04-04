import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Register({ history }) {
    const initialValues = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        address1: Yup.string()
            .required('Address is required'),
        address2: Yup.string(),            
        city: Yup.string()
            .required('City is required'),
        state: Yup.string()
            .required('State is required'),
        postalCode: Yup.string()
            .required('Zip Code is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Terms & Conditions is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                history.push('login');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="card-header">Register</h3>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Title</label>
                                <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Ms">Ms</option>
                                </Field>
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <Field name="address1" type="text" className={'form-control' + (errors.address1 && touched.address1 ? ' is-invalid' : '')} />
                            <ErrorMessage name="address1" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="address2" type="text" className={'form-control' + (errors.addess2 && touched.address2 ? ' is-invalid' : '')} />                                                        
                        </div>                                                  
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>City</label>
                                <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                <ErrorMessage name="city" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>State</label>
                                <Field name="state" type="text" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} />
                                <ErrorMessage name="state" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Zip Code</label>
                                <Field name="postalCode" type="text" className={'form-control' + (errors.postalCode && touched.postalCode ? ' is-invalid' : '')} />
                                <ErrorMessage name="postalCode" component="div" className="invalid-feedback" />
                            </div>
                        </div>   
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>                                             
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group form-check">
                            <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                            <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                            <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Register
                            </button>
                            <Link to="login" className="btn btn-link">Cancel</Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Register }; 