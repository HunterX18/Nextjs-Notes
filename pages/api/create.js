import connect from "../../components/db";
import note from "../../components/models";

connect();

const create = async (req, res) => {
	const { title, body } = req.body;
	// res.json(req.body);
	// note.create({ title, body }, (err, response) => {
	// 	if (err) res.json({ error: "Cannot create" });
	// 	else res.json({ mssg: "successfully created" });
	// });
	const newNote = await note.create({ title, body });
	res.json(newNote);
};

export default create;
