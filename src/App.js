import React, { useContext, useEffect } from 'react';
import './App.css';
import { AuthContext, FirebaseContext } from './Store/FirebaseContext';
import Post from './Store/PostContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'

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
      <Post>
        
      <Router>
        <Routes>
         <Route exact path="/home" element={<Home />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View/>} />
        </Routes>
    </Router>
    
     </Post>
    </div>
  );
}

export default App;
