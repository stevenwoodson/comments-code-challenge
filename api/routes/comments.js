const express = require('express');
const router = express.Router();

const tempComments = [
  {
    'id': 1,
    'name': 'Kevin',
    'text': 'Jeepers now that\'s a huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.',
    'upvotes': 0,
    'replies': {},
    'posted': '2022-06-17 10:25:03'
  },
  {
    'id': 2,
    'name': 'Hannah',
    'text': 'Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious. :)',
    'upvotes': 0,
    'replies': {},
    'posted': '2022-06-16 07:19:53'
  },
  {
    'id': 3,
    'name': 'Naz',
    'text': 'Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I\'ll be recommending then...',
    'upvotes': 0,
    'replies': {},
    'posted': '2022-05-26 23:42:17'
  }
];

/* GET comments listing. */
router.get('/', function(req, res, next) {
  res.json(tempComments);
});

module.exports = router;
