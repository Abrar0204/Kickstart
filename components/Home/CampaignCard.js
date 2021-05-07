import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	campaignCard: {
		"&:hover": {
			cursor: "pointer",
		},
		height: "240px",
	},
});

const CampaignCard = ({ campaign }) => {
	const classes = useStyles();
	const {
		title,
		description,
		minimumContribution,
		manager,
		contractAddress,
	} = campaign;

	return (
		<Grid item xs={6}>
			<Link href={`/campaigns/${contractAddress}`} passHref>
				<Card className={classes.campaignCard}>
					<CardContent>
						<Typography>{contractAddress}</Typography>
					</CardContent>
				</Card>
			</Link>
		</Grid>
	);
};

export default CampaignCard;
