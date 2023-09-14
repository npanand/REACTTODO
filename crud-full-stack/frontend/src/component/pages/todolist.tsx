import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import Listout from './fragment/listout';
import listout from './fragment/listout';
import axios from 'axios';
import { toast } from 'react-toastify';

const todoschema = Yup.object().shape({
  tododata: Yup.string().required("required"),
})

const config = {
  headers: {
    'Content-Type': 'application/json;',
    'Access-Control-Allow-Origin': '*',
    "Authorization": "Bearer "+sessionStorage.getItem("jwt")
  }
};
function AddData() {

  const [todolist, settodolist] = useState([]);
  const getData = async () => {
    
    try {
      await axios.get("http://localhost:4000/api/todo",config).then((res: any) => {
        if(res&&res.status===200){
          settodolist(res.data);
       
        }
        else{
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

  },[])
  
  const postData=async(val:any)=>{
    var data={
      title:val,
      completed:true
    }
    console.log(data);
    try {
      await axios.post("http://localhost:4000/api/todo",data,{
        headers: {
          
          'Access-Control-Allow-Origin': '*',
          "Authorization": "Bearer "+sessionStorage.getItem("jwt")
        }
      }).then((res: any) => {
        getData();
        toast.success('successfully data added', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000, // Close after 3 seconds
        });
        
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

 
  return (
    <div className='container-body'>
      <div className='container-todo'>
        <div>
          <Formik
            initialValues={{
              tododata: ""
            }}
            validationSchema={todoschema}
            onSubmit={(values,{resetForm}) => {
              resetForm();
              console.log(values);
              postData(values.tododata);
            }}
          >
            {({ errors, touched }) => (
              <div >

                <h1 style={{ textAlign: "center" }}>todo data</h1>
                <div className="">


                  <Form>
                    <div>
                      <div >
                        <div style={{ textAlign: 'center', width: "100%" }}>
                          <label htmlFor="tododata"><h4 >todo data</h4></label>
                        </div>
                        <div style={{ width: "100%", marginLeft: '25%' }}>
                          <Field name="tododata" id="tododata" type="text" placeholder="tododata" />
                          {errors.tododata && touched.tododata ? <div style={{ color: "red" }}>{errors.tododata}</div> : null}
                        </div>
                      
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <button type="submit">submit</button>
                    </div>
                    {todolist.length===0&&<div className='div-list-data'>
                      <h1 style={{textAlign:"center"}}> no data found</h1>
                    </div>}
               
                    {todolist&&todolist.length > 0 && <div className='div-list-data'>
                      <Listout todolist={todolist} />
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