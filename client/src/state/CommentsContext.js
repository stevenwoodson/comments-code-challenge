import React from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_SOCKET_URL);
export const CommentsContext = React.createContext();

const commenterOptions = ['Hannah', 'Kevin', 'Matt', 'Naz'];

export const initialState = {
  comments: [],
  commenterOptions: commenterOptions,
  commenter: (commenterOptions[Math.floor(Math.random() * commenterOptions.length)]),
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

    default:
      return state;
  }
};