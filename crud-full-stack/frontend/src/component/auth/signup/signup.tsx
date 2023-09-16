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

const Signup=({loginpageroute}:any)=>{

    const signup =  (values: any) => {
        console.log(values);
        try {
          signUp(values).then((res: any) => {
            if(res&&res.status===201){
                loginpageroute();
            toast.success('registration sucess', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 4000, // Close after 3 seconds
            });}
            else{
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

        <h1 style={{ textAlign: "center" }}> SIGNUP PAGE</h1>
        <div className="">
          <Form>
            <div className="style4">
              <div >
                <div style={{ textAlign: 'center', width: "100%" }}>
                  <label htmlFor="name"><h4 >Name</h4></label>
                </div>
                <div style={{ width: "100%" }}>
                  <Field name="name" id="name" type="text" placeholder="name" />
                </div>
                {errors.name && touched.name ? <div style={{ color: "red" }}>{errors.name}</div> : null}
              </div>
              <div >

                <div style={{ textAlign: 'center', width: "100%" }}>
                  <label htmlFor="email"><h4 >Email</h4></label>
                </div>
                <div style={{ width: "100%" }}>
                  <Field name="email" id="email" type="email" placeholder="email" />
                </div>
                {errors.email && touched.email ? <div style={{ color: "red" }}>{errors.email}</div> : null}
              </div>
              <div>
                <div style={{ textAlign: 'center', width: "100%" }}>
                  <label htmlFor="password"><h4>Password</h4></label>
                </div>
                <div style={{ width: "100%" }}>
                  <Field name="password" id="password" type="password" placeholder="password" />
                </div>
                {errors.password && touched.password ? <div style={{ color: "red" }}>{errors.password}</div> : null}
              </div>

              <div style={{ textAlign: "center", marginTop: "30px" }}>
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