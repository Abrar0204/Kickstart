import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { useWeb3 } from "../../context/Web3";

import { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({});
const CampaignGrid = () => {
	// const { campaigns } = useWeb3();

	const [campaigns, setCampaigns] = useState([
		{
			name: "Campaign #1",
			id: "#1",
			description: "Some goddamn description",
		},
		{
			name: "Campaign #2",
			id: "#2",
			description: "Some goddamn description",
		},
		{
			name: "Campaign #3",
			id: "#3",
			description: "Some goddamn description",
		},
	]);
	return (
		<Grid container spacing={1}>
			{campaigns.map(({ name, id, description }) => (
				<Grid item key={id} xs={4}>
					<Card>
						<CardContent>
							<Typography variant="h5" component="h2">
								Campaign {id}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default CampaignGrid;
