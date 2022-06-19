import React, { useEffect } from 'react';
import { CommentsContext } from "../state/CommentsContext";
import Comment from './Comment.component';

function Comments() {
  const { state, dispatch, socket } = React.useContext(CommentsContext);

  useEffect(() => {
    dispatch({
      type: "FETCH_COMMENTS_REQUEST"
    });
  }, [dispatch])

  useEffect(() => {
    if (state.isFetching) {
      socket.emit('comments:get');
      socket.on('comments', function (data) {
        dispatch({
          type: "FETCH_COMMENTS_SUCCESS",
          payload: data
        });
      });
    }
  }, [dispatch, socket, state.isFetching])

  if (state.hasError) {
    return <div className="comments">We're sorry, there was an error loading comments.</div>;
  } else if (state.isFetching) {
    return <div className="comments">Loading Comments&hellip;</div>;
  } else {
    return (
      <ul className="comments">
        {state.comments.map((comment, index) => (
          <Comment key={comment.id} commentData={comment}></Comment>
        ))
        }
     </ul>
    );
  }
}

export default Comments;