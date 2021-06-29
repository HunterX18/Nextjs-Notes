import connect from "../components/db";
const note = require("../components/models/notes");
import Link from "next/link";
import { GetStaticProps } from "next";
import Create from "../components/Create";
import { useRouter } from "next/router";

interface Inotes {
	_id: string;
	title: string;
	body: string;
	status: string;
	__v: Number;
}

interface IPageProps {
	notes: Inotes[];
	UI: Number;
	NUI: Number;
	UNI: Number;
	NUNI: Number;
}

export default function Home({ notes, UI, NUI, UNI, NUNI }: IPageProps) {
	const router = useRouter();
	const handleDelete = (id: string) => {
		fetch(`/api/edit/${id}`, {
			method: "DELETE",
		})
			.then((res) => router.push("/"))
			.catch((err) => console.log(err));
	};
	return (
		<div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center">
			<h1>What-To-Do</h1>
			<Create />
			<div className="container-xl ">
				<div className="row">
					<Link href="/Notes/1">
						<div className="col m-2 border border-primary p-5 shadow-lg">
							<h1>Urgent and Important</h1>
							<h4>{UI} tasks pending</h4>
						</div>
					</Link>
					<Link href="/Notes/2">
						<div className="col m-2 border border-primary p-5 shadow-lg">
							<h1>Urgent but NOT Important</h1>
							<h4>{UNI} tasks pending</h4>
						</div>
					</Link>
				</div>
				<div className="row">
					<Link href="/Notes/2">
						<div className="col m-2 border border-primary p-5 shadow-lg">
							<h1>Important but NOT Urgent</h1>
							<h4>{NUI} tasks pending</h4>
						</div>
					</Link>
					<Link href="/Notes/2">
						<div className="col m-2 border border-primary p-5 shadow-lg">
							<h1>Neither Important Nor Urgent</h1>
							<h4>{NUNI} tasks pending</h4>
						</div>
					</Link>
				</div>
			</div>
			{/* {notes.map((note, ind) => (
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
			))} */}
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	connect();
	const notes = await note.find();
	const jsonNotes = JSON.parse(JSON.stringify(notes));
	// console.log(jsonNotes);
	let UI = 0,
		UNI = 0,
		NUI = 0,
		NUNI = 0;
	jsonNotes.forEach((x: Inotes): void => {
		UI += x.status == "UI" ? 1 : 0;
		UNI += x.status == "UNI" ? 1 : 0;
		NUI += x.status == "NUI" ? 1 : 0;
		NUNI += x.status == "NUNI" ? 1 : 0;
	});
	return {
		props: {
			notes: JSON.parse(JSON.stringify(notes)),
			UI,
			UNI,
			NUI,
			NUNI,
		},
	};
};
