import React from "react";

import FeedbackContext from "../context/FeedbackContext";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

const FeedbackForm = () => {
  const [text, setText] = React.useState("");
  const [rating, setRating] = React.useState(10);
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [message, setMessage] = React.useState("");

  const { handleAdd, feedbackEdit,handleUpdate } = React.useContext(FeedbackContext);
    // console.log({feedbackEdit});


  React.useEffect(() => {
    if(feedbackEdit.edit === true){
        setBtnDisabled(false);
        setText(feedbackEdit.item.text);
        
        setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const handleText = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Message must be at least 10 character");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = { text, rating };


      if(feedbackEdit.edit === true){
        handleUpdate(feedbackEdit.item.id,newFeedback);
      }else{
        handleAdd(newFeedback);
      }

      
      setText(" ");
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our services</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            name=""
            id=""
            placeholder="write a review"
            value={text}
            onChange={handleText}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
