const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("email already used");
  }
  //encrypt password or hasing
  const salt=await bcrypt.genSalt(10);
  const hash=await bcrypt.hash(password,salt)

  //create on user

  const user=await this.create({email,password:hash})

  return user

};


module.exports = mongoose.model("User", userSchema);
