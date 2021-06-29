import mongoose from "mongoose";

interface INote {
	title: String;
	body: String;
	status: String;
}

type INoteSchema = INote & mongoose.Document;

const noteSchema = new mongoose.Schema({
	title: String,
	body: String,
	status: String,
});

module.exports =
	mongoose.models.note || mongoose.model<INoteSchema>("note", noteSchema);
