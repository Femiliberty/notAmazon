var express = require('express');
var router = express.Router();
const multer = require('multer');
const uuid = require('uuid');
const shoes = require('../models/shoes.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/product-pictures');
  },
  filename: function (req, file, cb) {
    let profileID = uuid() + '.jpg';
    cb(null, profileID);
  }
});

var upload = multer({ storage: storage });

// get product page 
router.get('/product/:id', (req, res) => {
  shoes.findOne({
    _id: req.params.id
  })
    .then(shoe => {
      res.render('shoes/product', { shoe: shoe });
    })
    .catch(err => {
      res.json({
        message: 'Error getting product',
        err
      });
      return;
    });
});

// GET add shoes form
router.get('/add', (req, res) => {
  res.render('shoes/add');
});

// GET edit shoe form
router.get('/edit/:id', (req, res) => {
  shoes.findOne({
    _id: req.params.id
  })
    .then(shoe => {
      res.render('shoes/edit', {
        shoe: shoe
      });
    })
});

// POST Add shoe
router.post('/add', upload.single('img'), (req, res) => {
  console.log(req.body)
  let img
  if (req.file) {
    img = req.file.filename;
  } else {
    img = 'noimage.jpg';
  }

  req.body.img = img;

  let errors = [];

  if (!req.body.img) {
    errors.push({ text: 'please enter shoe name' });
  }
  if (!req.body.name) {
    errors.push({ text: 'please enter shoe name' });
  }
  if (!req.body.description) {
    errors.push({ text: 'please enter shoe description' })
  }
  if (!req.body.sizes) {
    errors.push({ text: 'please enter  shoe size' })
  }
  if (!req.body.price) {
    errors.push({ text: 'please enter select shoe price' })
  }
  if (errors.length > 0) {
    res.render('shoes/add', {
      errors: errors,
      img: req.body.img,
      name: req.body.name,
      description: req.body.description,
      sizes: req.body.sizes,
      price: req.body.price
    });
  } else {
    const newShoes = {

      img: req.body.img,
      name: req.body.name,
      description: req.body.description,
      sizes: req.body.sizes,
      price: req.body.price
    }
    new shoes(newShoes)
      .save()
      .then(idea => {
        res.redirect('/')
      })
  }
});


//Edit shoe form process
router.put('/:id', upload.single('img'), (req, res) => {
  console.log(req.body);
  let img
  if (req.file) {
    img = req.file.filename;
  } else {
    img = 'noimage.jpg';
  }

  req.body.img = img;

  shoes.findOne({

    _id: req.params.id
  })
    .then(shoe => {
      if (req.body.img !== shoe.img && req.body.img !== '' && req.body.img !== 'noimage.jpg'){
        shoe.img = req.body.img;
      }

      if (req.body.name !== shoe.name && req.body.name !== '') {
        shoe.name = req.body.name;
      }

      if (req.body.description !== shoe.description && req.body.description !== '') {
        shoe.description = req.body.description;
      }

      if (req.body.sizes !== shoe.sizes && typeof req.body.sizes !== 'undefined' && req.body.sizes.length > 0) {
        shoe.sizes = req.body.sizes;
      }

      if (req.body.price !== shoe.price && req.body.price !== '') {
        shoe.price = req.body.price;
      }

      shoe.save()
        .then(shoe => {
          res.redirect('/');
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
});

//delete shoe
router.delete('/:id', (req, res) => {

  shoes.deleteOne({
    _id: req.params.id
  })
    .then(() => {
      res.redirect('/')
    })
});

module.exports = router;