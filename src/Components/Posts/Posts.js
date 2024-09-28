import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { PostContext } from '../../Store/PostContext';
import { collection, getDocs ,getFirestore} from "firebase/firestore";
import Heart from '../../assets/Heart';
import './Post.css';

function Posts() {
 
  const [products,setProducts] = useState([])
  const { firebase } = useContext(FirebaseContext)
  const { setPostDetails } = useContext(PostContext)
  const navigate = useNavigate()
  const db = getFirestore(firebase)
  
  useEffect(() => {

    getDocs(collection(db, "products"))
      .then(snapshot => {
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      })
      .catch(error => {
        console.error("Error fetching products:", error); 
      });
    

},[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         
          {products.map((product) => {
            return  <div
              className="card"
              onClick={() => { 

                setPostDetails(product)
                navigate('/view')

              }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
                <p className="rate">&#x20B9; { product.price}</p>
                <span className="kilometer">{ product.category}</span>
                <p className="name"> { product.name}</p>
            </div>
            <div className="date">
                <span>{ product.createdAt}</span>
            </div>
          </div>
          })}
          

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.slice(0,6).map((product) => {
            return <div className="card" onClick={() => {
              setPostDetails(product)
              navigate('/view')
            }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; { product.price}</p>
                <span className="kilometer">{product.category }</span>
                <p className="name"> { product.name}</p>
              </div>
              <div className="date">
                <span>{ product.createdAt}</span>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
