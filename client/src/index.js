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
const commenterOptions = ['Hannah', 'Kevin', 'Matt', 'Naz'];
const commenter = commenterOptions[Math.floor(Math.random()*commenterOptions.length)];

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
 * Using the provided comment data, generate comment HTML to be added to the comment container
 *
 * @param {object} comment
 * @returns
 */
const getFormattedCommentHTML = (comment) => (`
  <li>
    <span class="avatar-container">
      <img class="avatar" src="/images/${( commenterOptions.indexOf(comment.name) > -1 ? `${comment.name}.jpg` : 'anonymous.png')}" alt="">
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


const fetchComments = () => {
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
};

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
 * Set up comment form, randomize who is commenting every pageload
 */
const commentForm = document.querySelector('main form.add-comment');
commentForm.setAttribute("action", process.env.REACT_APP_API_URL + "comments/");
const commenterInput = document.createElement("input");
commenterInput.setAttribute("name", "name");
commenterInput.setAttribute("type", "hidden");
commenterInput.setAttribute("value", commenter);
commentForm.appendChild(commenterInput);
const commentAvatar = commentForm.querySelector('.avatar');
commentAvatar.setAttribute("src", `/images/${commenter}.jpg`);

// Submit the comment form and trigger a refresh when successful
commentForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(commentForm)
  let formDataJSON = {};
  formData.forEach((value, key) => formDataJSON[key] = value);

  fetch(process.env.REACT_APP_API_URL + "comments",{
    method: "POST",
    body: JSON.stringify(formDataJSON),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then(
    (result) => {
      const commentText = commentForm.querySelector('input[name=text]');
      commentText.value = '';
      fetchComments();
    },
    (error) => {
      console.error(error);
    }
  )
}, true);


/**
 * Temporarily fetching and displaying comments with Vanilla JS
 */

fetchComments();
