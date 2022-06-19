import React from 'react';

export const CommentsContext = React.createContext();

export const initialState = {
  comments: [],
  commenterOptions: ['Hannah', 'Kevin', 'Matt', 'Naz'],
  isFetching: false,
  hasError: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS_REQUEST":
      return {
        ...state,
        hasError: false,
        isFetching: true
      };
    case "FETCH_COMMENTS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        comments: action.payload
      };
    case "FETCH_COMMENTS_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case "UPDATE_COMMENT_UPVOTES":
      const commentsUpdate = state.comments.map((comment) => {
        if (comment.id === action.payload.id) {
          comment.upvotes = action.payload.upvotes;
        }
        return comment;
      });

      return {
        ...state,
        comments: commentsUpdate
      };

    default:
      return state;
  }
};