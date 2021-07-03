import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../components/db";
const note = require("../../components/models/notes");
import redisClient from "../../components/redisClient";

connect();

const create = async (req: NextApiRequest, res: NextApiResponse) => {
	await redisClient.flushall();
	const { title, body, status } = req.body;
	const newNote = await note.create({ title, body, status });
	return res.json(newNote);
};

export default create;
