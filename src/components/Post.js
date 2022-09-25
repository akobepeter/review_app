import React from 'react';
import {useParams} from "react-router-dom";

const Post = () => {
    const params = useParams();

  return (
    <div>
        <>Post {params.id}</>
        <h1>Post {params.name}</h1>
        <p>{params.text}</p>
    </div>
  )
}

export default Post