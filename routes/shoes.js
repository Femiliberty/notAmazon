const express = require ('express');
const router = express.Router();
const multer = require ('multer');
const shoes = require ('../models/shoes');
const uuid = require ('uuid');
const {ensureAuthenticated} = require('../helpers/auth')





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/product-pictures');
  },
  filename: function(req, file, cb) {
    let profileID = uuid() + '.jpg';
    cb(null, profileID);
  }
});

var upload = multer({storage: storage});

//shoe index page
router.get('/',ensureAuthenticated,(req, res)=>{
  shoes.find({})
  .then(shoes =>{
      res.render('shoes/index',{
shoes:shoes
  
      });
  });
  
});

//add shoes form
router.get('/add',ensureAuthenticated, (req, res) => {
  res.render('shoes/add');
});

//edit shoe form
router.get('/edit/:id',ensureAuthenticated, (req, res)=>{


  shoes.findOne({
      _id: req.params.id
  })
  .then(shoe => {   
  res.render('shoes/edit', {
       shoe:shoe
      });
  })
});

//process shoe
router.post('/', upload.single('img'),ensureAuthenticated, (req, res)=>{
  let img
  if (req.file) {
    img = req.file.filename;
  } else {
    img = 'noimage.jpg';
  }
  req.body.img = img;




  let errors=[];
  

  if(!req.body.img){
      errors.push({text:'please enter shoe name'});
  }
  if(!req.body.name){
      errors.push({text:'please enter shoe name'});
  }
  if(!req.body.description){
      errors.push({text:'please enter shoe description'})
  }
  if(!req.body.size){
      errors.push({text:'please enter  shoe size'})
  }
  if(!req.body.price){
      errors.push({text:'please enter select shoe price'})
  }
  if(errors.length > 0){
      res.render('shoes/add',{
          errors: errors,
      img:req.body.img,   
      name:req.body.name,
      description:req.body.description,
     sizes:req.body.sizes,
    price:req.body.price
  });
  }else{
      const newShoes ={

          img:req.body.img,
          name:req.body.name,
          description:req.body.description,
          sizes:req.body.sizes,
          price:req.body.price,
          user: req.user.id
      }
      new shoes (newShoes)
      .save()
      .then(idea => {
          res.redirect('/shoes')
      })
  } 
});


//Edit shoe form process
router.put('/:id',upload.single('img'),ensureAuthenticated,(req, res) => {

  let img
  if (req.file) {
    img = req.file.filename;
  } else {
    img = 'noimage.jpg';
  }

  req.body.img = img;

  shoes.findOne({

    _id:req.params.id
  })
  .then(shoe => {
      shoe.img= req.body.img;
      shoe.name =req.body.name;
      shoe.description =req.body.description;
      shoe.size =req.body.size;
      shoe.price =req.body.price;

      shoe.save()
      .then(shoe => {
          res.redirect('/shoes');
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
router.delete('/:id',ensureAuthenticated,(req, res)=> {

    shoes.remove({
        _id: req.params.id
      })
    .then(() => {
        req.flash('success_msg', 'item deleted');
        res.redirect('/shoes')
    })
});


module.exports = router;
