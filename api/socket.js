const connection = require("./db");
const { DateTime } = require("luxon");

module.exports = (io, socket) => {
  const commentsGet = function () {
    connection.query('SELECT * FROM comments ORDER BY id DESC', (error, results, fields) => {
      if (error) throw error

      const comments = results.filter(comment => comment.reply_to_id === null);

      comments.map((comment, index) => {
        const replies = results.filter(reply => reply.reply_to_id === comment.id);
        if (replies.length > 0) {
          comment['replies'] = replies;
        }
      });
      // Send comments on the socket
      io.emit('comments', comments);
    });
  };

  const commentPost = function (payload, callback) {
    connection.query(
      {
        sql: 'INSERT INTO comments (`name`, `text`, `reply_to_id`, `posted`) VALUES (?, ?, ?, ?)',
      },
      [payload.name ? payload.name : 'anonymous', payload.text, payload.reply_to_id, DateTime.now().toISO()],
      function (error, results, fields) {
        if (error) throw error;
        callback({
          status: "ok"
        });
      }
    );
  };

  const commentUpvote = function (payload, callback) {
    connection.query({
      sql: 'SELECT * FROM comments WHERE id = ?',
    },
    [payload.commentId],
    function (error, results, fields) {
      if (error) throw error;
      comment = results[0];

      let upvotes = comment.upvotes + 1;
      connection.query({
        sql: 'UPDATE comments SET `upvotes` = ? WHERE id = ?',
      },
      [upvotes, payload.commentId],
      function (error, results, fields) {
        if (error) throw error;
        callback({
          status: "ok"
        });
      });
    });
  };

  socket.on("comments:get", commentsGet);
  socket.on("comment:post", commentPost);
  socket.on("comment:upvote", commentUpvote);
}
