import React from 'react';
import { DateTime } from "luxon";
import { CommentsContext } from "../state/CommentsContext";

function Comment(props) {
  const { state, dispatch } = React.useContext(CommentsContext);

  /**
   * Returns a relative calendar string based on the provided timestamp
   *
   * @param {string} timestamp - SQL Timestamp
   * @returns
   */
  const getFormattedDate = (timestamp) => {
    let commentPosted = DateTime.fromISO(timestamp).toRelativeCalendar();
    if (commentPosted === 'today') {
      commentPosted = DateTime.fromISO(timestamp).toRelativeCalendar({ unit: "hours" });
    }
    if (commentPosted === '1 hour ago') {
      commentPosted = DateTime.fromISO(timestamp).toRelativeCalendar({ unit: "minutes" });
    }
    if (commentPosted === 'in 0 hours') {
      commentPosted = 'just now';
    }

    return commentPosted;
  }

  /**
   * On Upvote click, trigger an API call
   *
   * @param {int} commentId
   */
  function onUpvote(id) {
    fetch(process.env.REACT_APP_API_URL + "comments/" + id + '/upvote', {method: 'POST'})
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({
            type: "UPDATE_COMMENT_UPVOTES",
            payload: {'id': id, 'upvotes': result}
          });

        },
        (error) => {
          console.error(error);
        }
      )
  }

  return (
    <li>
      <span className="avatar-container">
        <img className="avatar" src={( state.commenterOptions.indexOf(props.commentData.name) > -1 ? `/images/${props.commentData.name}.jpg` : '/images/anonymous.png' )} alt="" />
      </span>
      <div className="comment">
        <div className="meta">
          <strong>{props.commentData.name}</strong>
          <span className="sr-only">commented</span>
          <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
          <span className="posted">{getFormattedDate(props.commentData.posted)}</span>
        </div>
        <p>{props.commentData.text}</p>
        <div className="options">
          <button className="link link--upvote" onClick={(e) => onUpvote(props.commentData.id)}>Upvote ({props.commentData.upvotes})</button>
          <button className="link link--reply">Reply</button>
        </div>
      </div>
    </li>
  );
}

export default Comment;