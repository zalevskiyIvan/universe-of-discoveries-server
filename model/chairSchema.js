const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  subject: String,
  url: String,
});
const ChairSchema = new Schema({
  title: String,
  subjects: [subjectSchema],
  teachers: [String],
});

module.exports = mongoose.model("chairs", ChairSchema);
