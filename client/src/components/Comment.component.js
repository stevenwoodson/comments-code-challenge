import React, {useState} from 'react';
import { DateTime } from "luxon";
import { CommentsContext } from "../state/CommentsContext";
import AddComment from './AddComment.component';

function Comment(props) {
  const { state, socket } = React.useContext(CommentsContext);
  const [showReply, setShowReply] = useState(false);


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
    socket.emit('comment:upvote', {'commentId': id}, (response) => {
      socket.emit('comments:get');
    });
  }

  return (
    <li className={`comment ${props.commentData.replies ? "comment--replies" : ""}`}>
      <div className="comment__contents">
        <span className="avatar-container">
          <img className="avatar" src={( state.commenterOptions.indexOf(props.commentData.name) > -1 ? `/images/${props.commentData.name}.jpg` : '/images/anonymous.png' )} alt="" />
        </span>
        <div className="comment-container">
          <div className="meta">
            <strong>{props.commentData.name}</strong>
            <span className="sr-only">commented</span>
            <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
            <span className="posted">{getFormattedDate(props.commentData.posted)}</span>
          </div>
          <p>{props.commentData.text}</p>
          <div className="options">
            <button className="link link--upvote" onClick={(e) => onUpvote(props.commentData.id)}>Upvote ({props.commentData.upvotes})</button>
            { props.canReply && <button className="link link--reply" onClick={(e) => setShowReply(!showReply)}>Reply</button> }
          </div>
          {showReply && <AddComment commentId={props.commentData.id}></AddComment>}
        </div>
      </div>
      {
        props.commentData.replies &&
          <ul className="comments comments--nested">
            {props.commentData.replies.map((comment, index) => (
              <Comment key={comment.id} commentData={comment} canReply={false}></Comment>
            ))
            }
        </ul>
      }
    </li>
  );
}

export default Comment;