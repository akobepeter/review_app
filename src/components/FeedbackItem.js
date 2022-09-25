import React from "react";
import Card from "./shared/Card";
import {FaTimes,FaEdit} from 'react-icons/fa';
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import PropTypes from 'prop-types'

const FeedbackItem = ({item}) => {


  const {handleDelete,handleEdit} = useContext(FeedbackContext);
  
  // const handleClick = (id) =>{
  //   console.log(id)
  // }
   
  return(
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={()=>handleDelete(item.id)}><FaTimes color="white"/></button>
      <button className="edit" onClick={()=>handleEdit(item)}><FaEdit color="white"/></button>
      <div className="text-display">{item.text}</div>  
    </Card>
  );
};

FeedbackItem.propTypes={
 item:PropTypes.object.isRequired,

}

export default FeedbackItem;
