import logo from './logo.svg';
import './App.css';
import Register from './pages/regisrer/Register';
import OtherInfo from './pages/otherInfo/OtherInfo';
import Feed from './pages/feed/Feed'
 
import { Route, Routes, Navigate} from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import Login from './pages/login/Login';

function App() {

 
  
  return (
      <>
  
      <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/getinfo/:id' element={<OtherInfo />} />
      <Route path='/feed' element={<Feed/> } />
      </Routes>

    </>
  
  );
}

export default App;
