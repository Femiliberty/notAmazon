var express = require('express');
var router = express.Router();
const shoes = require('../models/shoes');

//shoe index page
router.get('/', (req, res) => {
  shoes.find({})
    .then(shoes => {
      res.render('shoes/index', {
        shoes: shoes
      });
    });
});

module.exports = router;