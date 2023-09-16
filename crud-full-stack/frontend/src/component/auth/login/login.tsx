import { Field, Form, Formik } from "formik";
import react, { useState } from "react";
import * as Yup from 'yup';
import "./login.css";
import axios from "axios";
import { BrowserRouter, Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import Signup from "../signup/signup";
import { logIn } from "../../service/auth";

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const loginSchema = Yup.object().shape({
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

const Login = () => {

  const navigate = useNavigate();
  const [loginPage, setLoginPage] = useState(true);

  const getJwt = (values: any) => {
    try {
      logIn(values).then((res: any) => {
        console.log(res);
        if (res && res.status === 201) {
          // console.log("sucess");
          sessionStorage.setItem("jwt", res.data.token);
          toast.success('This is a success notification', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000, // Close after 3 seconds
          });
          console.log(sessionStorage.getItem("jwt"));
          sessionStorage.setItem("isloggedin", "success");
          navigate('/addData');
           window.location.reload();
        }
        else {
          toast.error('login Failed', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000, // Close after 3 seconds
          });
        }


      }).catch((err: any) => {

        toast.error('api error', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000, // Close after 3 seconds
        });
      })
    }
    catch {
      console.log("failed call");
    }
  }


  return (

    <div className="container-body">
      <div className="">

        <div className={loginPage ? "form-container" : "signup-container"}   >
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <button style={{ color: "blue", width: "100%" }} onClick={() => {
                setLoginPage(true)
              }}>login page</button>
            </div>
            <div>
              <button style={{ color: "blue", width: "100%" }} onClick={() => {
                setLoginPage(false)
              }}>signup</button>
            </div>
          </div>

          {
            loginPage ? <>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={(values, { resetForm }) => {
                  resetForm();
                  getJwt(values);
                }}
              >
                {({ errors, touched }) => (
                  <div >

                    <h1 style={{ textAlign: "center" }}> LOGIN PAGE</h1>
                    <div className="">


                      <Form>
                        <div className="style4">
                          <div >
                            <div style={{ textAlign: 'center', width: "100%" }}>
                              <label htmlFor="email"><h4 >Email</h4></label>
                            </div>
                            <div style={{ width: "100%" }}>
                              <Field name="email" id="email" type="email" placeholder="email" />
                              {errors.email && touched.email ? <div style={{ color: "red" }}>{errors.email}</div> : null}
                            </div>

                          </div>
                          <div>
                            <div style={{ textAlign: 'center', width: "100%" }}>
                              <label htmlFor="password"><h4>Password</h4></label>
                            </div>
                            <div style={{ width: "100%" }}>
                              <Field name="password" id="password" type="password" placeholder="password" />
                              {errors.password && touched.password ? <div style={{ color: "red" }}>{errors.password}</div> : null}
                            </div>

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
            </> :

              <Signup loginpageroute={() => { setLoginPage(true) }} />
          }
        </div>
      </div>
    </div>
  )
}
export default Login