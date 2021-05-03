// const mongoose = require("mongoose");
import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
	title: String,
	body: String,
});
module.exports = mongoose.models.note || mongoose.model("note", noteSchema);
