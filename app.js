const express = require ('express');
const exphbs = require ('express-handlebars')
const methodOverride = require('method-override')
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
 const shoes = require ('./models/shoes');
 const multer = require ('multer');
 const uuid = require ('uuid');
 const path = require ('path');
const app = express()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/product-pictures');
    },
    filename: function(req, file, cb) {
      let profileID = uuid() + '.jpg';
      cb(null, profileID);
    }
  })
  
  var upload = multer({storage: storage});


//map global promise - GET RID OF THE WARNING
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect('mongodb://localhost:27017/personalpractice',{
    // useMongoClient:true,
    useNewUrlParser: true 

})
.then(()=> console.log('MongoDB connected...'))
.catch(err => console.log(err))

//load shoes

// require('./models/shoes');
// const shoe = mongoose.model('shoes');






//handle bars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Method overide middleware
app.use(methodOverride('_method'));

//to let the app know to use ..........
app.use(express.static(path.join(__dirname, 'public')));

// //how to use middleware
// app.use(function(req,res, next){
//     req.name ='femiiiii';
//     next();
// })

//index route
app.get('/' ,(req, res)=>{
    const title = 'Welcome Femi'
    res.render('index',{
        title: title
    })
})

app.get('/about',(req, res) =>{
res.render('About')
})

//shoe index page
app.get('/shoes',(req, res)=>{
    shoes.find({})
    .then(shoes =>{
        res.render('shoes/index',{
shoes:shoes
    
        });
    });
    
});

//add shoes form
app.get('/shoes/add', (req, res) => {
    res.render('shoes/add');
});

//edit shoe form
app.get('/shoes/edit/:id', (req, res)=>{


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
app.post('/shoes', upload.single('img'), (req, res)=>{
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
            price:req.body.price
        }
        new shoes (newShoes)
        .save()
        .then(idea => {
            res.redirect('/shoes')
        })
    } 
});


//Edit shoe form process
app.put('/shoes/:id',(req, res) => {

    shoes.findOne({

      _id:req.params.id
    })
    .then(shoe => {
        shoe.img= req.body.img
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
  app.delete('/shoes/:id',(req, res)=> {

      shoe.remove({
          _id: req.params.id
        })
      .then(() => {
          res.redirect('/shoes')
      })
  });

const port = 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);

})
