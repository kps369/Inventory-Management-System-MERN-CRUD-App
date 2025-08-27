require('dotenv').config();
const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const cors = require('cors')
const router = require('./Routes/router')

app.use(cors());
app.use(express.json());

// Define Routes
app.use(router);
app.use('/api/auth', require('./Routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


