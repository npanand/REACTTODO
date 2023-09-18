import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { signUp } from "../../service/auth";

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const signupSchema = Yup.object().shape({
  name: Yup.string().required("required"),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required("Please enter a password")
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
})

const Signup = ({ loginpageroute }: any) => {

  const signup = (values: any) => {
    console.log(values);
    try {
      signUp(values).then((res: any) => {
        if (res && res.status === 201) {
          loginpageroute();
          toast.success('registration sucess', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000, // Close after 3 seconds
          });
        }
        else {
          toast.error('registration failed', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000, // Close after 3 seconds
          });
        }
      }).catch((err: any) => {
        toast.error('network error', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000, // Close after 3 seconds
        });

      })
    }
    catch {
      console.log("failed call")
    }
  }
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values, { resetForm }) => {
        signup(values);
        resetForm();

      }}
    >
      {({ errors, touched }) => (
        <div >

          <h1 className="text-center"> SIGNUP PAGE</h1>
          <div className="">
            <Form>
              <div className="">
                <div >
                  <div className="text-center m-2">
                    <label htmlFor="name"><h4 >Name</h4></label>
                  </div>
                  <div className="text-center m-2">
                    <Field name="name" id="name" type="text" placeholder="name" className="mt-1 block w-full px-12 py-2 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />

                    {errors.name && touched.name ? <div className='text-red-600'>{errors.name}</div> : null}</div>
                </div>
                <div >

                  <div className="text-center m-2">
                    <label htmlFor="email"><h4 >Email</h4></label>
                  </div>
                  <div className="text-center m-2">
                    <Field name="email" id="email" type="email" placeholder="email" className="mt-1 block w-full px-12 py-2 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />

                    {errors.email && touched.email ? <div style={{ color: "red" }}>{errors.email}</div> : null}
                  </div>
                </div>
                <div>
                  <div className="text-center m-2">
                    <label htmlFor="password"><h4>Password</h4></label>
                  </div>
                  <div className="text-center m-2">
                    <Field name="password" id="password" type="password" placeholder="password" className="mt-1 block w-full px-12 py-2 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />

                    {errors.password && touched.password ? <div className='text-red-600'>{errors.password}</div> : null}
                  </div>
                </div>

                <div className="rounded-full text-slate-100  cursor-pointer text-center m-8 px-4 p-2 bg-red-600">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </Form>
          </div>

        </div>
      )}
    </Formik>
  )
}

export default Signup