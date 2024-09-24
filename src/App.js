import React, { useContext, useEffect } from 'react';
import './App.css';
import { AuthContext, FirebaseContext } from './Store/FirebaseContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'

function App() {

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  
  const auth = getAuth(firebase);

  useEffect(() => {
     onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
  })
     })

  return (
    <div>
      <Router>
        <Routes>
         <Route exact path="/home" element={<Home />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create/>} />
        </Routes>
    </Router>
    
    </div>
  );
}

export default App;
