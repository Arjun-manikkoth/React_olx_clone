import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountError,setAccountError] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(firebase);
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()


    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }


    if (isValid) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          navigate('/home');
        })
        .catch((error) => {
              setAccountError(error.message);
        });
    }
}

  return (
    <div>
      <div className="loginParentDiv">
        <div className="logo">
        <img width="160px"  height="160px" src={Logo} alt='icon-img'></img>
        </div>
        {accountError && <div className="error-msg">{accountError}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className='inputDiv'>
          <label htmlFor="fname">Email</label>
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e) => {
              return setEmail(e.target.value)
            }}
            />
            {emailError && <div className="error">{emailError}</div>}
          </div>
          <div className="inputDiv">
          <label htmlFor="lname">Password</label>
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e) => {
              return setPassword(e.target.value)
            }}
            />
            {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <div className='buttonDiv'></div>
          <button>Login</button>
        </form>
        <br />
        <div className='signUp' onClick={(e)=>navigate('/signup')}>Create Your Free Account?</div>
      </div>
    </div>
  );
}

export default Login;
