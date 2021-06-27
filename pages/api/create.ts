import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../components/db";
const note = require("../../components/models/notes");

connect();

const create = async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, body } = req.body;
	const newNote = await note.create({ title, body });
	return res.json(newNote);
};

export default create;
