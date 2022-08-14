// libraries
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session=require('express-session');
// middlewares/
const errorHandling = require('./middlewares/errorHandling');
//const auth = require('./middlewares/auth').auth;

// router
const router = require('./router/indexRouter');
// app creation
const app = express();
// using libraries
// app.use(fileUpload({ createParentPath : true }));
app.use(session({secret:"secret"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('tiny'));

// setting ejs to be view engine
app.set('view engine', 'ejs');

// allow public directory
app.use(express.static('public'))

//app.set('strict routing', true);
// using router
//app.use('/admin', adminRouter);
//app.use(auth);
app.use('/', router);
//app.use(app.router);
//routes.initialize(app);

// using error handling middlware
app.use(errorHandling.notFound);

app.use(errorHandling.errorHandler);

module.exports = app;