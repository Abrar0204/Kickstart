import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	campaignCard: {
		"&:hover": {
			cursor: "pointer",
		},
		padding: "20px",
		"& > *": {
			margin: "20px 0px",
		},
	},
}));

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
		<Grid item xs={12} sm={12} md={6} zeroMinWidth>
			<Link href={`/campaigns/${contractAddress}`} passHref>
				<Paper className={classes.campaignCard}>
					<div>
						<Typography variant="h5" component="h1">
							{title}
						</Typography>
						<Typography variant="h6" component="h2" noWrap>
							{description}
						</Typography>
					</div>
					<div>
						<Typography color="textSecondary" variant="body1">
							Created By
						</Typography>
						<Typography
							color="textSecondary"
							variant="body1"
							noWrap
						>
							{manager}
						</Typography>
					</div>
				</Paper>
			</Link>
		</Grid>
	);
};

export default CampaignCard;
