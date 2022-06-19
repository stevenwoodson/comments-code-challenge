import React from 'react';
import {CommentsContext, initialState, reducer, socket} from './state/CommentsContext'
import AddComment from './components/AddComment.component';
import Comments from './components/Comments.component';
import './styles/app.scss';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CommentsContext.Provider
      value={{
        state,
        dispatch,
        socket
      }}
    >
      <AddComment commenterOptions></AddComment>
      <hr />
      <Comments></Comments>
    </CommentsContext.Provider>
  );
}

export default App;
