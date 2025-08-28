require('dotenv').config();
const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const cors = require('cors')
const session = require('express-session')
const passport = require('passport');
const router = require('./Routes/router')

// Passport config
require('./config/passport')(passport);

app.use(cors());
app.use(express.json());

// Express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use(router);
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/auth', require('./Routes/authGoogle'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


