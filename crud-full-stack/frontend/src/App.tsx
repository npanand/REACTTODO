import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import './App.css';
import Login from './component/auth/login';
import AddData from './component/pages/todolist';
import { ToastContainer } from 'react-toastify';
function App() {
  const Error = () => {
    return (
      <h1> not found page</h1>
    )
  }
 

  return (
    <>
     <ToastContainer />
      {
        sessionStorage.getItem("isloggedin") === "success" ?
        
          <Routes>
            
            <Route path="/addData" element={<AddData />} />
            <Route path="*" element={<Error />} />

          </Routes>

          : <Login />
      }

    </>
  );
}

export default App;
