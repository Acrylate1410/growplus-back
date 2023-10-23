require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const routes1 = require('./routes/orders');
const routes2 = require('./routes/articles');
const app = express()
app.use('/orders', routes1)
app.use('/articles', routes2)
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
})

database.once('open', () => {
  console.log('Database Connected');
})
const port = 8080

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})