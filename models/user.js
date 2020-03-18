const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Same as: const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

mongoose.model("users", userSchema);
//Two arguments in model() means loading a model into mongoose
