import { createContext, useState } from "react";
import { FeedbackData } from "../data/Feedback";

import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);

  const [feedbackEdit,setFeedBackEdit] = useState({
    item:{},
    edit:false,
  });

  // Add feedback
  const handleAdd = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
    // console.log(newFeedback);
  };


  //Set Item to be updated
  const handleEdit = (item)=>{
    setFeedBackEdit({
        item,
        edit:true
    });
  }

  // Update feedback
  const handleUpdate = (id,updItem) =>{
    setFeedback(feedback.map((item)=>(
        item.id === id ? {...item,...updItem} : item
    )));
  }

  // Delete feedback
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(
        feedback.filter((item) => {
          return item.id !== id;
        })
      );
    }
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        handleDelete,
        handleAdd,
        handleEdit,
        feedbackEdit, //the state that holds the feedback item
        handleUpdate,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
