import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Toolbar } from "../components/toolbar";
import connect from "../components/db";
import note from "../components/models";
import Link from "next/link";
export default function Home({ notes }) {
	notes = JSON.parse(notes);
	return (
		<>
			<Toolbar />
			<h1>Notes App</h1>
			{notes.map((note, ind) => (
				<div key={ind}>
					<Link href={`/Edit/${note._id}`}>
						<a>
							<h2>{ind+1}. {note.title}</h2>
						</a>
					</Link>
					<h3>{note.body}</h3>
				</div>
			))}
		</>
	);
}

export const getStaticProps = async () => {
	connect();
	let notes = await note.find();
	return {
		props: {
			notes: JSON.stringify(notes),
		},
	};
};
