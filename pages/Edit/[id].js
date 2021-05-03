import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import connect from "../../components/db";
import note from "../../components/models";

const Edit = ({ Otitle, Obody }) => {
	const [title, setTitle] = useState(Otitle);
	const [body, setBody] = useState(Obody);
	const router = useRouter();
	const { id } = router.query;
	const handleSubmit = (e) => {
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
	const handleDelete = () => {
		fetch(`/api/edit/${id}`, {
			method: "DELETE",
		})
			.then((res) => router.push("/"))
			.catch((err) => console.log(err));
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
			<button onClick={handleDelete}>DELETE</button>
		</>
	);
};

export const getServerSideProps = async (req, res) => {
	connect();
	const { id } = req.params;
	const Note = await note.findById(id);
	return {
		props: {
			Otitle: Note.title,
			Obody: Note.body,
		},
	};
};

export default Edit;
