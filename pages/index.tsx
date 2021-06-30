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
			<Create />
			<div className="container-l ">
				<div className="row">
					<Link href="/Notes/1">
						<div className="col m-2 border border-primary p-5 shadow-lg">
							<h4 className="text-danger">Urgent and Important</h4>
							<a href="#" className="pe-auto text-decoration-none text-info">
								<h5>{UI} tasks pending</h5>
							</a>
						</div>
					</Link>
					<Link href="/Notes/2">
						<div className="col m-2 border border-primary p-5 shadow-lg">
							<h4 className="text-warning">Urgent but NOT Important</h4>
							<a href="#" className="pe-auto text-decoration-none text-info">
								<h5>{UNI} tasks pending</h5>
							</a>
						</div>
					</Link>
				</div>
				<div className="row">
					<Link href="/Notes/3">
						<div className="col m-2 border border-primary p-5 shadow-lg">
							<h4 className="text-primary">Important but NOT Urgent</h4>
							<a href="#" className="pe-auto text-decoration-none text-info">
								<h5>{NUI} tasks pending</h5>
							</a>
						</div>
					</Link>
					<Link href="/Notes/4">
						<div className="col m-2 border border-primary p-5 shadow-lg">
							<h4 className="text-success">Neither Important Nor Urgent</h4>
							<a href="#" className="pe-auto text-decoration-none text-info">
								<h5>{NUNI} tasks pending</h5>
							</a>
						</div>
					</Link>
				</div>
			</div>
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
