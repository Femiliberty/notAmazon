const express = require ('express');
const exphbs = require ('express-handlebars')
const methodOverride = require('method-override')
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

const path = require ('path');
const app = express();

var indexRouter = require('./routes/index');
var shoesRouter = require('./routes/shoes');

//map global promise - GET RID OF THE WARNING
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect('mongodb://localhost:27017/personalpractice',{
    // useMongoClient:true,
    useNewUrlParser: true 
})
.then(()=> console.log('MongoDB connected...'))
.catch(err => console.log(err));

//handle bars middleware
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Method overide middleware
app.use(methodOverride('_method'));

//to let the app know to use ..........
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/shoes', shoesRouter);

// //how to use middleware
// app.use(function(req,res, next){
//     req.name ='femiiiii';
//     next();
// })

app.get('/about',(req, res) =>{
    res.render('About');
})

// get cart page 
app.get('/cart', (req, res) => {
    res.render('cart');
});

const port = 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});
