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
  const navigate = useNavigate()
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const db = getFirestore(firebase);

  const handleSignUp = async function(e) {

    e.preventDefault()
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {

        updateProfile(result.user, {
          displayName: name,
        }).then(() => {
          
            setDoc(doc(db, 'users', result.user.uid), {
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


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='banner'></img>
        <form >
          <label htmlFor="fname">Username</label>
          <br />
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
          <br />
          <label htmlFor="fname">Email</label>
          <br />
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
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
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
          <br />
          <label htmlFor="lname">Password</label>
          <br />
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
          <br />
          <br />
          <button onClick={handleSignUp}>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
