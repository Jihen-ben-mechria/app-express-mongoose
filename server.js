const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const UserRoutes = require('./routes/user.routes') 
const AuthRoutes = require('./routes/auth.routes')
const app = express();

app.use(express.json())

app.use('/users',UserRoutes)

app.use('/auth',AuthRoutes)

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.error('Error connecting to Database:', err.message);
  });

app.listen(5000,()=>{
    console.log('listening on port 5000')
})