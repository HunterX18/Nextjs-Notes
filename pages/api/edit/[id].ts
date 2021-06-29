import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../components/db";
const note = require("../../../components/models/notes");


connect();

const edit = async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, body } = req.body;
	const id = req.query.id;
	let newNote;
	if (req.method == "PUT") {
		newNote = await note.findByIdAndUpdate(
			{ _id: id },
			{ title, body, status },
			{ new: true }
		);
	} else {
		newNote = await note.findByIdAndDelete(id);
	}
	return res.json(newNote);
};

export default edit;
