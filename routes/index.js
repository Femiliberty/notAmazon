var express = require('express');
var router = express.Router();
const shoes = require('../models/shoes');
const Cart = require('../models/Cart');

const cartController = require('../controllers/cartController');

//shoe index page
router.get('/', (req, res) => {
  shoes.find({})
    .then(shoes => {
      res.render('shoes/index', {
        shoes: shoes
      });
    });
});

router.get('/add-to-cart/:id', (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart.items : {});

  shoes.findById(productId, function (err, product) {
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart)
    res.redirect('/cart');
  });

  
});
router.get('/remove-item/:id', (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart.items : {});

  shoes.findById(productId, function(err, product) {
    cart.removeOne(product, product.id);
    req.session.cart = cart;
    console.log(cart);
    res.redirect('/cart')
  })

});

router.get('/checkout', (req, res) => {
  res.render('checkout')
})

module.exports = router;