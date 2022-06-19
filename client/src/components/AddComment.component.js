import React, { useState } from 'react';
import { CommentsContext } from "../state/CommentsContext";

function AddComment() {
  const { state, socket } = React.useContext(CommentsContext);
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

    socket.emit('comment:post', formData, (response) => {
      socket.emit('comments:get');
      setFormData({
        ...formData,
        'text': '',
      });
    });
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