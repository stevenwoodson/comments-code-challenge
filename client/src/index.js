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


/* ==========================================================================
   Ghost Code Challenge V1 - all native JavaScript
   ========================================================================== */

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

  return commentPosted;
}

/**
 * Using the provided comment data, generate comment HTML to be added to the comment container
 *
 * @param {object} comment
 * @returns
 */
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
        <button class="link link--upvote" data-id="${comment.id}">Upvote (${comment.upvotes})</button>
        <button class="link link--reply">Reply</button>
    </div>
  </li>`);

/**
 * On Upvote click, trigger an API call
 *
 * @param {int} commentId
 */

 function onUpvote(e) {
  fetch(process.env.REACT_APP_API_URL + "comments/" + this.dataset.id + '/upvote', {method: 'POST'})
  .then(res => res.json())
  .then(
    (result) => {
      this.innerHTML = `Upvote (${result})`
    },
    (error) => {
      console.error(error);
    }
  )
}


/**
 * Temporarily fetching and displaying comments with Vanilla JS
 */
const commentsContainer = document.querySelector('main .comments');
fetch(process.env.REACT_APP_API_URL + "comments")
  .then(res => res.json())
  .then(
    (result) => {
      // Clear the comments container first
      commentsContainer.innerHTML = "";

      // Gather the formatted HTML for each comment that was returned
      result.forEach(comment => {
        commentsContainer.insertAdjacentHTML('beforeend', getFormattedCommentHTML(comment));
      });

      // Add the upvote button click handlers
      const upvoteLinks = commentsContainer.getElementsByClassName('link--upvote');
      Array.from(upvoteLinks).forEach(link => {
        link.addEventListener("click", onUpvote, false);
      });
    },
    (error) => {
      console.error(error);
    }
  )


