
import './App.css';
import Register from './pages/regisrer/Register';
import OtherInfo from './pages/otherInfo/OtherInfo';
import Feed from './pages/feed/Feed'
 
import { Route, Routes, Navigate} from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import Login from './pages/login/Login';
import Verify from './pages/verify/Verify';
import Profile from './pages/profile/Profile';

import Messenger from './pages/Messenger/Messenger';


function App() {

 
  
  return (
      <>
  
      <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/getinfo/:id' element={<OtherInfo />} />
      <Route path='/profile/:id' element={<Profile/>} />
      <Route path='/verify/:id' element={<Verify/>} />
      <Route path='/feed' element={<Feed/> } />
      <Route path='/messages' element={<Messenger/> } />
      </Routes>

    </>
  
  );
}

export default App;
