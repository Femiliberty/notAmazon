const express = require('express');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shoes = require('./models/shoes');
const multer = require('multer');
const flash = require('connect-flash');
const session = require('express-session');
const uuid = require('uuid');
const path = require('path');
const passport = require('passport')
const app = express()


var indexRouter = require('./routes/index');
var shoesRouter = require('./routes/shoes');
const users = require('./routes/users');


//passport config
require('./config/passport')(passport)

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

//middleware for express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

//global variables for messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.success_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
})


//to let the app know to use ..........
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/shoes', shoesRouter);
app.use('/users', users)

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
