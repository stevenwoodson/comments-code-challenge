const express = require('express');
const router = express.Router();
const connection = require("../db");

/* GET comments listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM comments', (error, results, fields) => {
    if (error) throw error
    res.json(results);
  })
});


/* POST comment upvote. */
router.post('/:commentId/upvote', function(req, res, next) {
  connection.query({
    sql: 'SELECT * FROM comments WHERE id = ?',
    timeout: 40000, // 40s
  },
  [req.params.commentId],
  function (error, results, fields) {
    if (error) throw error;
    comment = results[0];

    let upvotes = comment.upvotes + 1;
    connection.query({
      sql: 'UPDATE comments SET `upvotes` = ? WHERE id = ?',
      timeout: 40000, // 40s
    },
    [upvotes, req.params.commentId],
    function (error, results, fields) {
      if (error) throw error;
      res.json(upvotes);
    });
  });
});

module.exports = router;
