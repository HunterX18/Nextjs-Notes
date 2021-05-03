import connect from "../../../components/db";
import note from "../../../components/models";

connect();

const edit = async (req, res) => {
	const { title, body } = req.body;
	const id = req.query.id;
	let newNote;
	if (req.method == "PUT") {
		newNote = await note.findByIdAndUpdate(
			{ _id: id },
			{ title, body },
			{ new: true }
		);
	} else {
		newNote = await note.findByIdAndDelete(id);
	}
	res.json(newNote);
};

export default edit;
