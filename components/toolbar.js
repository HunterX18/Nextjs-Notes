import { useRouter } from "next/router";
export const Toolbar = () => {
	const router = useRouter();
	return (
		<>
			<h3 onClick={() => router.push("/")}>Home</h3>
			<h3 onClick={() => router.push("/Create")}>Create</h3>
		</>
	);
};


