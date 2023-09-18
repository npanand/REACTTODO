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
        if (res && res.status == 200) {
          getData();
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

      }
    }).catch((err) => {
      toast.error('network failed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000, // Close after 3 seconds
      });
    })

  }

  return (
    <div className='bg-red-200  shadow-xl   min-h-screen flex items-center    justify-center'>
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
                          <Field name="tododata" id="tododata" type="text" placeholder="insert Data" className="mt-1 block w-full px-3 py-1 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                          {errors.tododata && touched.tododata ? <div style={{ color: "red" }}>{errors.tododata}</div> : null}
                        </div>
                      </div>}
                      {

                        mode !== "add" && <div >
                          <div className="text-center m-2">
                            <label htmlFor="updatetodo"><h3 >update Data</h3></label>
                            <h5 className="text-center w-full">{updateTodo}</h5>
                            <h5 className="text-center w-full" ><AiOutlineArrowDown /></h5>
                          </div>

                          <div className="text-center m-2">
                            <Field name="modified" id="updatetodo" type="text" placeholder="update Data" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"  />
                            {errors.modified && touched.modified ? <div style={{ color: "red" }}>{errors.modified}</div> : null}
                          </div>
                        </div>
                      }
                    </div>
                    <div className="rounded-full text-green-100 text-center m-8 px-4 p-2 bg-lime-600 cursor-pointer">
                      <button type="submit">Submit</button>
                    </div>
                    {
                      mode !== "add" && <div className="rounded-full text-green-100 text-center m-8 px-4 p-2 bg-red-600 cursor-pointer text-center  ">
                        <button type="button" onClick={() => setmode("add")}>update cancel</button>
                      </div>
                    }
                    {todolist.length === 0 && <div className='div-list-data'>
                      <h1 style={{ textAlign: "center" }}> no data found</h1>
                    </div>}

                    {todolist && todolist.length > 0 && <div className='div-list-data'>
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