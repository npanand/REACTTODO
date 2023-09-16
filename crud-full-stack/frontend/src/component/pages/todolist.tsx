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
    <div className='container-body'>
      <div className='container-todo'>
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
                <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>crud data</h1>
                <div className="">
                  <Form>
                    <div>
                      {mode === "add" && <div >
                        <div style={{ textAlign: 'center', width: "100%" }}>
                          <label htmlFor="tododata"><h4 style={{ textTransform: "uppercase" }}>insert Todo</h4></label>
                        </div>
                        <div style={{ width: "100%", marginLeft: '25%' }}>
                          <Field name="tododata" id="tododata" type="text" placeholder="insert Data" />
                          {errors.tododata && touched.tododata ? <div style={{ color: "red" }}>{errors.tododata}</div> : null}
                        </div>
                      </div>}
                      {

                        mode !== "add" && <div >
                          <div style={{ textAlign: 'center', width: "100%" }}>
                            <label htmlFor="updatetodo"><h3 style={{ textTransform: "uppercase" }}>update Data</h3></label>
                          </div>
                          <h5 style={{ textAlign: 'center', width: "100%" }} >{updateTodo}</h5>
                          <h5 style={{ textAlign: 'center', width: "100%" }} ><AiOutlineArrowDown /></h5>


                          <div style={{ width: "100%", marginLeft: '25%' }}>
                            <Field name="modified" id="updatetodo" type="text" placeholder="update Data" />
                            {errors.modified && touched.modified ? <div style={{ color: "red" }}>{errors.modified}</div> : null}
                          </div>
                        </div>
                      }
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <button type="submit" style={{ backgroundColor: "blue", padding: "0px 30px", cursor: "pointer" }}>submit</button>
                    </div>
                    {
                      mode !== "add" && <div style={{ textAlign: 'center', marginTop: '20px' }}>
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