import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { useWeb3 } from "../../context/Web3";

import Link from "next/link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	campaignCard: {
		"&:hover": {
			cursor: "pointer",
		},
		height: "240px",
	},
});
const CampaignGrid = () => {
	const { campaigns, getCampaigns } = useWeb3();
	const classes = useStyles();

	useEffect(() => {
		console.log("rendering");
		(async () => await getCampaigns())();
	}, []);

	return (
		<Grid container spacing={3} justify="center">
			{campaigns.map(campaign => (
				<Grid item key={campaign} xs={5}>
					<Link href={`/campaigns/${campaign}`} passHref>
						<Card className={classes.campaignCard}>
							<CardContent>
								<Typography>{campaign}</Typography>
							</CardContent>
						</Card>
					</Link>
				</Grid>
			))}
		</Grid>
	);
};

export default CampaignGrid;
