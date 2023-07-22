const app = require('./app')
const mongoose = require("mongoose")

const { DB_HOST, PORT } = process.env;
// mongoose.set('strickQuery', true)
mongoose.connect(DB_HOST)
  .then(()=> {
    app.listen(PORT)
    console.log("Database connection successful")
  })
  .catch(error => {
    console.log(error.message); 
    process.exit(1);
  })