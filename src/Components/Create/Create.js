import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../Store/FirebaseContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, setDoc, doc } from 'firebase/firestore';


const Create = () => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const storage = getStorage(firebase);
  const db = getFirestore(firebase);
; const date = new Date()

  const handleSubmit = () => {
 
    const storageRef = ref(storage, `/images/${image.name}`);

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        
        setDoc(doc(db, 'products', user.uid), {
          name,
          category,
          price,
          url:downloadURL,
          userId: user.uid,
          createdAt:date.toDateString()
          }).then(() => {
            navigate('/login')
        })
      
      })
    }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={name}
              onChange={(e) => setName(e.target.value)
              }
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={category}
              onChange={(e) => setCategory(e.target.value)
              }
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"  value={price}
            onChange={(e) => setPrice(e.target.value)
            } />
            <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image):''}></img>

            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
