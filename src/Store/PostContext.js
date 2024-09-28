import React, { createContext, useState } from "react";
const PostContext = createContext(null) 

function Post({ children }) {

  const [postDetails, setPostDetails] = useState()
  
  return (
    <PostContext.Provider value={{postDetails,setPostDetails}}>
      {children}
   </PostContext.Provider>
  )
}

export { PostContext };
export default Post;
