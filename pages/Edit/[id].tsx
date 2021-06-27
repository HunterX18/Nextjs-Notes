import React, { useState } from "react";
import { useRouter } from "next/router";
import connect from "../../components/db";
const note = require("../../components/models/notes");
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface IPageProps {
	Otitle: string;
	Obody: string;
}

const Edit = ({ Otitle, Obody }: IPageProps) => {
	const [title, setTitle] = useState(Otitle);
	const [body, setBody] = useState(Obody);
	const router = useRouter();
	const { id } = router.query;
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch(`/api/edit/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				body,
			}),
		})
			.then((res) => {
				router.push("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<h1>Edit This Note</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="title"
				/>
				<input
					type="text"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder="description"
				/>
				<input type="submit" value="submit" />
			</form>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	connect();
	const id = ctx.params?.id;
	const Note = await note.findById(id);
	console.log(Note);
	return {
		props: {
			Otitle: Note.title,
			Obody: Note.body,
		},
	};
};

export default Edit;
