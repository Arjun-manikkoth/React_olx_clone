import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../Store/FirebaseContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const storage = getStorage(firebase);
  const db = getFirestore(firebase);
  const date = new Date();
  const navigate = useNavigate();

  const handleSubmit = () => {
    let isValid = true;

    if (name.trim() === '') {
      setNameError('Item name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (category.trim() === '') {
      setCategoryError('Category is required.');
      isValid = false;
    } else {
      setCategoryError('');
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      setPriceError('Please enter a valid price.');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (!image) {
      setImageError('Please upload an image.');
      isValid = false;
    } else {
      setImageError('');
    }

    if (isValid) {

      const storageRef = ref(storage, `/images/${image.name}`);
      uploadBytes(storageRef, image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
         
          addDoc(collection(db, 'products'), {
            name,
            category,
            price,
            url: downloadURL,
            userId: user.uid,
            createdAt: date.toDateString(),
          }).then(() => {
            navigate('/home');
          });
        })
        .catch((error) => {
          console.error("Error uploading image or saving product:", error);
        });
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="centerDiv">
          <label htmlFor="fname">Item Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <span className="error">{nameError}</span>}
          <br />

          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {categoryError && <span className="error">{categoryError}</span>}
          <br />

          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="text"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {priceError && <span className="error">{priceError}</span>}
          <br />

          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {imageError && <span className="error">{imageError}</span>}
          <br />
          {image && (
            <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(image)} />
          )}
          <br />

          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
