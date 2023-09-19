import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import Listout from './fragment/listout';
import listout from './fragment/listout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { AddTodoData, getTodoData, updateTodoData } from '../service/todoData';
const todoschema = Yup.object().shape({
  tododata: Yup.string().required("required"),
})

const todoupdateschema = Yup.object().shape({
  modified: Yup.string().required("required"),
})


function AddData() {

  const [todolist, settodolist] = useState([]);
  const [mode, setmode] = useState("add");
  const [updateTodo, setupdateTodo] = useState("");
  const getData = () => {

    try {
      getTodoData().then((res: any) => {
        if (res && res.status === 200) {
          settodolist(res.data);
        }
        else {
          toast.error('retrieve data failed', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000, // Close after 3 seconds
          });
        }
      }).catch((err: any) => {
        toast.error('network failed', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000, // Close after 3 seconds
        });
      })
    }
    catch {
      console.log("failed");
    }

  }

  useEffect(() => {
    getData();
  }, [])



  const postData = async (val: any) => {
    var data = {
      title: val,
      completed: true
    }
    console.log(data);
    try {
      AddTodoData(data).then((res: any) => {
        if (res && res.status === 200) {
          getData();
          toast.success('successfully data added', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000, // Close after 3 seconds
          });
        }
        else {
          toast.error('insert failed', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000, // Close after 3 seconds
          });

        }

      }).catch((err: any) => {
        toast.error('data added failed', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000, // Close after 3 seconds
        });
        console.log("post error" + err);
      })
    }
    catch {
      toast.error('network failed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000, // Close after 3 seconds
      });
      console.log("failed");
    }
  }

  const updateData = async (args: any) => {

    const data = {
      "title": updateTodo,
      "modified": args
    }
    updateTodoData(data).then((res) => {
      if (res && res.status === 200) {
        getData();
        setmode("add");
        toast.success('successfully data update', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000, // Close after 3 seconds
        });
      }
      else {
        toast.error('update failed', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000, // Close after 3 seconds
        });
      }


    }).catch((err) => {
      toast.error('network failed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000, // Close after 3 seconds
      });
    })

  }

  return (
    <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%   shadow-xl   min-h-screen flex items-center    justify-center'>
      <div className='w-96 h-full  shadow-xl bg-white rounded-md'>
        <div>
          <Formik
            initialValues={mode == "add" ? {
              tododata: ""
            } : { modified: "" }}
            validationSchema={mode === "add" ? todoschema : todoupdateschema}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              { mode === "add" && postData(values.tododata); }
              { mode !== "add" && updateData(values.modified) }
            }}
          >
            {({ errors, touched }) => (
              <div >
                <h1 className="text-center m-2 text-red-600">CRUD DATA</h1>
                <div className="">
                  <Form>
                    <div>
                      {mode === "add" && <div >
                        <div className='m-4'>
                          <label htmlFor="tododata" className='text-center '><h4 >INSERT TODO</h4></label>
                        </div>
                        <div className='text-center'>
                          <Field name="tododata" id="tododata" type="text" placeholder="insert Data" className="mt-1 block mx-auto px-5 py-1 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
                                                                                                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                                                                       disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                                                                                       invalid:border-pink-500 invalid:text-pink-600
                                                                                                       focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                          {errors.tododata && touched.tododata ? <div style={{ color: "red" }}>{errors.tododata}</div> : null}
                        </div>
                      </div>}
                      {

                        mode !== "add" && <div >
                          <div className="text-center mt-2">
                            <label htmlFor="updatetodo"><h3 className='uppercase'>update Data</h3></label>

                          </div>
                          <div className="text-xl ">
                            <h5 className="text-center w-full bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{updateTodo}</h5>
                            <h5><AiOutlineArrowDown className="text-center mx-auto" /></h5>
                          </div>
                          <div className="text-center m-2">
                            <Field name="modified" id="updatetodo" type="text" placeholder="update Data" className="mt-1 block mx-auto px-5 py-1 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"  />
                            {errors.modified && touched.modified ? <div style={{ color: "red" }}>{errors.modified}</div> : null}
                          </div>
                        </div>
                      }
                    </div>
                    <div className='text-center'>
                      <button className="rounded-full text-green-100 text-center m-4 px-20 p-2 bg-lime-600 cursor-pointer" type="submit">Submit</button>
                    </div>
                    {
                      mode !== "add" && <div className='text-center' >
                        <button className="rounded-full text-green-100 text-center  px-20 p-2 bg-red-600 cursor-pointer text-center mb-2 " type="button" onClick={() => setmode("add")}>cancel</button>
                      </div>
                    }

                    {todolist && todolist.length === 0 && <div className='border-orange-600 w-80 h-40 overflow-auto border-2 border-solid mx-auto mb-2'>
                      <h1 className=' text-center my-auto' > no data found</h1>
                    </div>}

                    {todolist && todolist.length > 0 && <div className='border-orange-600 w-80 h-40 mb-5 overflow-auto border-2 border-solid mx-auto'>
                      <Listout todolist={todolist} getCall={() => getData()} updateData={setupdateTodo} modeChange={setmode} />
                    </div>}

                  </Form>
                </div>
              </div>
            )}
          </Formik>

        </div>
      </div>

    </div>
  )
}

export default AddData;