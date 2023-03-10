require("dotenv").config();
const express = require("express");
const cors=require('cors')
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes=require('./routes/userRoutes')

const app = express();

//port
const port = process.env.PORT || 4000;

//midlewares

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

//routes
app.use("/api/projects", projectRoutes);
app.use("/api/user",userRoutes)
//mongodb
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for server
    app.listen(port, () => {
      console.log(`connect to mongo listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
