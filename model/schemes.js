const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  klass: String,
  header: String,
  body: String,
  img: String,
  subject: String,
  date: String,
});

const usefulLinkSchema = new Schema({
  link: String,
  description: String,
});

const projectSchema = new Schema({
  header: String,
  purpose: String,
  tasks: [String],
  relevance: String,
  conclusions: String,
  results: String,
  subject: String,
  date: String,
  // img: [{imgURL: String, id: Number}],
  // presentationHtml: String,
  shortDescription: String,
  members: [String],
  allowed: { type: Boolean, required: true },
});
exports.EventsSchema = mongoose.model("events", postSchema);
exports.TasksSchema = mongoose.model("tasks", postSchema);
exports.ProjectSchema = mongoose.model("projects", projectSchema);
//
exports.UsefulLinkSchema = mongoose.model("usefulLink", usefulLinkSchema);
