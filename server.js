require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
var cron = require('node-cron');
const routes = require('./routes/orders');
const app = express()
app.use('/orders', routes)
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
})

database.once('open', () => {
  console.log('Database Connected');
})
cron.schedule('*/1 * * * *', () => {
  console.log('running a task every minutes');
});
const port = 8080

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})