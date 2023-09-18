import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
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

    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  shadow-xl   min-h-screen flex items-center    justify-center">
      <div className={loginPage ? "w-96 h-full  shadow-xl bg-white rounded-md " : " w-96 h-full   bg-white shadow-xl bg-white rounded-md  "} >
        <div className="grid grid-cols-2 gap-2 m-3">
          <div className="text-center bg-red-600 rounded-full">
            <button className="rounded-full p-2 text-slate-200" onClick={() => {
              setLoginPage(true)
            }}>LOGIN</button>
          </div>
          <div className="text-center bg-emerald-600 rounded-full">
            <button className="rounded-full p-2 text-slate-200" onClick={() => {
              setLoginPage(false)
            }}>SIGNUP</button>
          </div>
        </div>

        <div className={loginPage ? "flex justify-center  flex-col items-center " : "flex justify-center flex-col items-center    "} >
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
                  <div>
                    <div className="">
                      <h1 className="text-center p-2 m-2"> LOGIN   PAGE</h1>
                      <Form>
                        <div className="">
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
                              <Field name="password" id="password" type="password" placeholder="password" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                              {errors.password && touched.password ? <div style={{ color: "red" }}>{errors.password}</div> : null}
                            </div>
                            <div className="rounded-full text-slate-100 text-center m-8 px-4 p-2 bg-red-600 cursor-pointer">
                              <button type="submit">Submit</button>
                            </div>

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