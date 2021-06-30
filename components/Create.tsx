import React, { useState } from "react";
import { useRouter } from "next/router";

const Create = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [status, setStatus] = useState("UI");
	const router = useRouter();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		fetch("/api/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				body,
				status,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				setTitle("");
				setBody("");
				setStatus("UI");
				router.push("/");
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="card border border-0 bg-light w-50">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="form-control my-1"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="title"
				/>
				<input
					className="form-control my-1"
					type="text-area"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder="description"
				/>
				<input
					className="form-control my-1"
					type="text"
					value={status}
					readOnly
					placeholder="status"
				/>
				<button
					className="button btn-secondary"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Status
				</button>
				<ul className="dropdown-menu">
					<li>
						<a
							className="dropdown-item"
							href="#"
							onClick={() => setStatus("UI")}
						>
							Urgent and Important
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="#"
							onClick={() => setStatus("UNI")}
						>
							Urgent but not Important
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="#"
							onClick={() => setStatus("NUI")}
						>
							not Urgent but Important
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="#"
							onClick={() => setStatus("NUNI")}
						>
							neither Urgent nor Important
						</a>
					</li>
				</ul>
				<button type="submit" className="button btn-primary float-end">
					<i className="bi bi-card-checklist me-2" />
					Add Task
				</button>
			</form>
		</div>
	);
};

export default Create;
