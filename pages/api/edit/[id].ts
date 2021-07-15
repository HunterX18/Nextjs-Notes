import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../components/db";
const note = require("../../../components/models/notes");
import redisClient from "../../../components/redisClient";

connect();

const edit = async (req: NextApiRequest, res: NextApiResponse) => {
	await redisClient.flushall();
	// console.log("here");
	const { title, body, status } = req.body;
	const id = req.query.id;
	let newNote;
	if (req.method == "PUT") {
		newNote = await note.findByIdAndUpdate(
			{ _id: id },
			{ title, body, status },
			{ new: true }
		);
	} else {
		await note.findByIdAndDelete(id);
		newNote = await note.find({ status: status });
	}
	return res.json(newNote);
};

export default edit;
