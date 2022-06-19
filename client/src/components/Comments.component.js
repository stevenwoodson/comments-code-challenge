import React, { useEffect } from 'react';
import { CommentsContext } from "../state/CommentsContext";
import Comment from './Comment.component';

function Comments() {
  const { state, dispatch } = React.useContext(CommentsContext);

  useEffect(() => {
    dispatch({
      type: "FETCH_COMMENTS_REQUEST"
    });
  }, [dispatch])

  useEffect(() => {
    if (state.isFetching) {
      fetch(process.env.REACT_APP_API_URL + "comments")
        .then(res => res.json())
        .then(
          (result) => {
            dispatch({
              type: "FETCH_COMMENTS_SUCCESS",
              payload: result
            });
          },
          (error) => {
            console.error(error);
            dispatch({
              type: "FETCH_COMMENTS_FAILURE"
            });
          }
        )
      }
  }, [dispatch, state.isFetching])

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