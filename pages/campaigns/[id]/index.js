import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Campaign = ({ params, query }) => {
	const router = useRouter();
	useEffect(() => {
		console.log(query, params, router.query);
	}, []);
	return <div>Campaign</div>;
};

export default Campaign;
