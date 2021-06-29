const note = require("../../components/models/notes");
import connect from "../../components/db";
import { GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import Link from "next/link";

interface Inotes {
	_id: string;
	title: string;
	body: string;
	status: string;
	__v: Number;
}

interface IPageProps {
	notes: Inotes[];
}

const Notes = ({ notes }: IPageProps) => {
	const handleDelete = (id: string) => {
		fetch(`/api/edit/${id}`, {
			method: "DELETE",
		})
			.then((res) => console.log("success"))
			.catch((err) => console.log(err));
	};
	if (notes && notes.length == 0) return <h1>No tasks pending!</h1>;
	return (
		<div className="container">
			{notes &&
				notes.map((note, ind) => (
					<div key={ind}>
						<h2>
							{ind + 1}. {note.title}
						</h2>
						<h3>{note.body}</h3>
						<Link href={`/Edit/${note._id}`}>
							<a>
								<h3>Edit</h3>
							</a>
						</Link>
						<button onClick={() => handleDelete(note._id)}>Delete</button>
					</div>
				))}
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	connect();
	const notes = await note.find();
	const jsonNotes = JSON.parse(JSON.stringify(notes));
	let status = "";
	if (ctx.params?.id == "1") status = "UI";
	if (ctx.params?.id == "2") status = "UNI";
	if (ctx.params?.id == "3") status = "NUI";
	if (ctx.params?.id == "4") status = "NUNI";
	const newNotes = jsonNotes.filter(
		(note: Inotes): boolean => note.status == status
	);
	return {
		props: {
			notes: newNotes,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: true,
	};
};

export default Notes;
