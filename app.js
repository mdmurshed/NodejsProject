const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Lode config
dotenv.config({ path: './config/config.env' })

//passport config
require('./config/passport')(passport)

// mongoDB
connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// method overriding
app.use(
    methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // loog in urlencoded Post bodies and delete it
            let method = req.body._method
            delete req.body._method
            return method
        }
    })
)

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//Handlebars helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

//Handlebars 
app.engine('.hbs', exphbs({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
    }, defaultLayout: 'main',
    extname: '.hbs',
}));
app.set('view engine', '.hbs');


// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
})
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

//set global var 
app.use(function (req, res, next) {
    app.locals.ok = 12;
    res.locals.user = req.user || null
    console.log("global vriable:" + res.locals.user);
    next()
})

//Static Folder
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'));

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))
app.use('/register',require('./routes/registration'))


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`));