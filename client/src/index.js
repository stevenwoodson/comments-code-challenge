import React from 'react';
import ReactDOM from 'react-dom/client';
import { DateTime } from "luxon";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


/**
 * Returns a relative calendar string based on the provided timestamp
 *
 * @param {string} timestamp - SQL Timestamp
 * @returns
 */
function getFormattedDate(timestamp) {
  let commentPosted = DateTime.fromSQL(timestamp).toRelativeCalendar();
  if (commentPosted === 'today') {
    commentPosted = DateTime.fromSQL(timestamp).toRelativeCalendar({ unit: "hours" });
  }
  if (commentPosted === '1 hour ago') {
    commentPosted = DateTime.fromSQL(timestamp).toRelativeCalendar({ unit: "minutes" });
  }

  return commentPosted;
}

const getFormattedCommentHTML = (comment) => (`
  <li>
    <span class="avatar-container">
      <img class="avatar" src="/images/${comment.name}.jpg" alt="">
    </span>
    <div class="comment">
      <div class="meta">
        <strong>${comment.name}</strong>
        <span aria-label="commented">&nbsp;&middot;&nbsp;</span>
        <span class="posted">${getFormattedDate(comment.posted)}</span>
      </div>
      <p>${comment.text}</p>
      <div class="options">
        <button class="link link--upvote">Upvote</button>
        <button class="link link--reply">Reply</button>
    </div>
  </li>`)


/**
 * Temporarily fetching and displaying comments with Vanilla JS
 */
const commentsContainer = document.querySelector('main .comments');
fetch(process.env.REACT_APP_API_URL + "comments")
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result);
      // Clear the comments container first
      commentsContainer.innerHTML = "";

      // Gather the formatted HTML for each comment that was returned
      result.forEach(comment => {
        commentsContainer.insertAdjacentHTML('beforeend', getFormattedCommentHTML(comment));
      });
    },
    (error) => {
      console.error(error);
    }
  )
