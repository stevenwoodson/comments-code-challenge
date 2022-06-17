const express = require('express');
const { DateTime } = require("luxon");
const router = express.Router();
const connection = require("../db");

/* GET comments listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM comments ORDER BY id DESC', (error, results, fields) => {
    if (error) throw error
    res.json(results);
  })
});


/* POST new comment. */
router.post('/', function(req, res, next) {
  connection.query({
    sql: 'INSERT INTO comments (`name`, `text`, `posted`) VALUES (?, ?, ?)',
    timeout: 5000, // 5s
  },
  [req.body.name ? req.body.name : 'anonymous', req.body.text, DateTime.now().toISO()],
  function (error, results, fields) {
    if (error) throw error;
    res.json(results.insertId);
  });
});


/* POST comment upvote. */
router.post('/:commentId/upvote', function(req, res, next) {
  connection.query({
    sql: 'SELECT * FROM comments WHERE id = ?',
    timeout: 5000, // 5s
  },
  [req.params.commentId],
  function (error, results, fields) {
    if (error) throw error;
    comment = results[0];

    let upvotes = comment.upvotes + 1;
    connection.query({
      sql: 'UPDATE comments SET `upvotes` = ? WHERE id = ?',
      timeout: 5000, // 5s
    },
    [upvotes, req.params.commentId],
    function (error, results, fields) {
      if (error) throw error;
      res.json(upvotes);
    });
  });
});

module.exports = router;
