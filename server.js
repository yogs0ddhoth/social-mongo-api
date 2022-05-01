const express = require('express');
// mongoose.connect to either MONGODB_URI or 'mongodb://localhost:27017/socialMongoDB'
const db = require('./config/connection');
// ** TODO: build models and routes,
//          then connect,
// const routes = ;

const PORT = process.env.PORT || 3001;

const app = express();

app.use.express(express.urlencoded({ extended:true }));
app.use(express.json());
// app.use(routes)

db.once('open', () =>{
  app.listen(PORT, () => console.log(`API server running on port ${PORT}!`))
})