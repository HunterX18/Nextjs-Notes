const note = require("../../components/models/notes");
import connect from "../../components/db";
import { GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Inotes {
	_id: string;
	title: string;
	body: string;
	status: string;
	__v: Number;
}

interface IPageProps {
	notes: Inotes[];
	status: string;
}

const Notes = ({ notes, status }: IPageProps) => {
	const [Notes, setNotes] = useState(notes);
	const handleDelete = (id: string) => {
		fetch(`/api/edit/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ status }),
		})
			.then((res) => res.json())
			.then((result) => setNotes(result))
			.catch((err) => console.log(err));
	};
	if (Notes && Notes.length == 0) return <h1>No tasks pending!</h1>;
	return (
		<div className="container">
			{Notes &&
				Notes.map((note, ind) => (
					<div className="card-fluid border border-2 m-5" key={ind}>
						<h2 className="card-title m-2">
							<i
								className="bi bi-journal-bookmark me-2"
								style={{ fontSize: "20px" }}
							/>
							{note.title}
						</h2>
						<h3 className="card-subtitle m-2">
							<i
								className="bi bi-info-circle me-2"
								style={{ fontSize: "20px" }}
							/>
							{note.body}
						</h3>
						<Link href={`/Edit/${note._id}`}>
							<button className="button btn-primary rounded-pill m-2">
								<i className="bi bi-chat-right-text me-1" />
								Edit
							</button>
						</Link>
						<button
							className="button btn-danger m-2 rounded-pill"
							onClick={() => handleDelete(note._id)}
						>
							<i className="bi bi-trash me-1" />
							Delete
						</button>
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
			status,
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
