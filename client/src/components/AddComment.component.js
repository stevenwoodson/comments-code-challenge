import React, { useState } from 'react';
import { CommentsContext } from "../state/CommentsContext";

function AddComment() {
  const { state, dispatch } = React.useContext(CommentsContext);
  const [ formData, setFormData ] = useState({
    'name': (state.commenterOptions[Math.floor(Math.random() * state.commenterOptions.length)]),
    'text': ''
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Submit the comment form and trigger a refresh when successful
  function handleSubmit(e){
    e.preventDefault() // stops default reloading behaviour

    fetch(process.env.REACT_APP_API_URL + "comments",{
      method: "POST",
      body: JSON.stringify(formData),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then(
      (result) => {
        setFormData({
          ...formData,
          'text': '',
        });

        dispatch({
          type: "FETCH_COMMENTS_REQUEST"
        });
      },
      (error) => {
        console.error(error);
      }
    )
  }

  return (
    <form className="add-comment" method="post" onSubmit={handleSubmit}>
      <span>
        <img className="avatar" src={`./images/${formData.name}.jpg`} alt="" />
      </span>
      <label htmlFor="text-input" className="sr-only">What are your thoughts?</label>
      <input type="text" name="text" id="text-input" placeholder="What are your thoughts?" value={formData.text} onChange={handleChange} />
      <button className="btn" type="submit">Comment</button>
    </form>
  );
}

export default AddComment;