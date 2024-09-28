import React ,{useState,useContext, useEffect} from 'react';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { getFirestore, collection, query, where, getDocs,limit } from "firebase/firestore";
import './View.css';


function View() {
  
  const { postDetails } = useContext(PostContext)
  const [userDetails, setUserDetails] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const db = getFirestore(firebase);
   
  useEffect(() => {

    const value = postDetails.userId

    const colRef = collection(db, 'users');

    const q = query(colRef, where("id", "==",value ), limit(1)); 
    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setUserDetails(doc.data());
        } else {
          console.log("No matching document found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
      });
   },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="img"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{ postDetails.name}</span>
          <p>{ postDetails.category}</p>
          <span>{ postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{ userDetails.name}</p>
          <p>{ userDetails.phoneNumber }</p>
        </div>
        }
        
      </div>
    </div>
  );
}
export default View;
