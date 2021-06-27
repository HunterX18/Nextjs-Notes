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
	__v: Number;
}

interface IPageProps {
	notes: Inotes[];
}

export default function Home({ notes }: IPageProps) {
	const router = useRouter();
	const handleDelete = (id: string) => {
		fetch(`/api/edit/${id}`, {
			method: "DELETE",
		})
			.then((res) => router.push("/"))
			.catch((err) => console.log(err));
	};
	return (
		<>
			<h1>What-To-Do</h1>
			<Create />
			{notes.map((note, ind) => (
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
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	connect();
	const notes = await note.find();
	return {
		props: {
			notes: JSON.parse(JSON.stringify(notes)),
		},
	};
};
