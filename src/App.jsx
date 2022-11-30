import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import React from 'react';
import AdminPage from './page/admin/AdminPage';
import LoginPage from './page/LoginPage';
import UserPage from './page/employee/UserPage';
import  UpdateUserPage from './page/employee/UpdateUserPage';
// import EmployeePage from './page/employee/UpdateUserPage';

const App = () => {
  return (
    <div className='h-full bg-gradient-to-r from-purple-800 via-purple-500 to-pink-400 sm:h-screen overflow-y-visible '>
      <Router>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />

          <Route exact path='/admin' element={<AdminPage />} />
          
          <Route exact path='/user' element={<UserPage />} />
          <Route exact path='/user/update' element={<UpdateUserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
