import { createContext, useState, useEffect } from "react";
// import { FeedbackData } from "../data/Feedback";



const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading,setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  console.log(feedback);

  const [feedbackEdit, setFeedBackEdit] = useState({
    item: {},
    edit: false,
  });

  const fetchData = async () => {
    const response = await fetch("/data");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log("feedback");
    fetchData();
  }, []);

  // Add feedback
  const handleAdd = async(newFeedback) => {
    const response = await fetch('/data',{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newFeedback)
    })

    const data = await response.json()
    // newFeedback.id = uuidv4();
    setFeedback([data, ...feedback]);
    // console.log(newFeedback);
  };

  //Set Item to be updated
  const handleEdit = (item) => {
    setFeedBackEdit({
      item,
      edit: true,
    });
  };

  // Update feedback
  const handleUpdate = async(id, updItem) => {
    const response = await fetch(`/data/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(updItem)
    })
    const data = await response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // Delete feedback
  const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/data/${id}`,{
        method:"DELETE"
      })
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
        isLoading,
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
