import React from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

import Link from "next/link";

import RequestTable from "../../../../components/Campaign/requests/RequestTable";
const useStyles = makeStyles({
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: "20px",
	},
});
const CampaignRequests = ({ id }) => {
	const classes = useStyles();

	return (
		<Container>
			<div className={classes.header}>
				<Typography variant="h4" component="h1" color="textPrimary">
					Requests
				</Typography>
				<Link href={`/campaigns/${id}/requests/new`} passHref>
					<Button color="primary" variant="text">
						Create Request
					</Button>
				</Link>
			</div>

			<RequestTable id={id} />
		</Container>
	);
};

export function getServerSideProps({ params }) {
	return {
		props: {
			id: params.id,
		},
	};
}

export default CampaignRequests;
