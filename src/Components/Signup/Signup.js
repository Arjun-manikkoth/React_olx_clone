import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from '../../Store/FirebaseContext';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {


  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate()
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const db = getFirestore(firebase);

 
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleSignUp = async function(e) {

    e.preventDefault()

    let isValid = true;

    if (name.trim() === '') {
      setNameError('Username is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (phoneNumber.trim().length !== 10) {
      setPhoneError('Phone number must be 10 digits.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }
  
    if (isValid) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {

        updateProfile(result.user, {
          displayName: name,
        }).then(() => {
          
          setDoc(doc(db, 'users', result.user.uid), {
            id:result.user.uid,
            name: name,
            phoneNumber: phoneNumber
            }).then(() => {
              navigate('/login')
          })
          
        }).catch((error) => {
          console.error('Error updating profile:', error);
        });

      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
    
    }
 
  }


  return (
    <div>
      <div className="signupParentDiv">
        <div className="logo">
        <img width="160px" height="160px" src={Logo} alt='banner'></img>
        </div>
        <form >
          <div className="inputDiv">
          <label htmlFor="fname">Username</label>    
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={name}
            onChange={(e) => setName(e.target.value)
            }
            />
             {nameError && <div className="error">{nameError}</div>}
          </div>
      
          <div className="inputDiv">
          <label htmlFor="fname">Email</label>
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e) => setEmail(e.target.value)
            }
            />
             {emailError && <div className="error">{emailError}</div>}
          </div>
          
          <div className="inputDiv">
            <label htmlFor="lname">Phone</label> 
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)
            }
            />
             {phoneError && <div className="error">{phoneError}</div>}
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
            onChange={(e) => setPassword(e.target.value)
            }
            />
             {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <div className="buttonDiv">
             <button onClick={handleSignUp}>Signup</button>
          </div>
        </form>
        <br />
        <div className='login' onClick={(e)=>navigate('/login')}>Login</div>
      </div>
    </div>
  );
}
