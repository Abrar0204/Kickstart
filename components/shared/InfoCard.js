import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
	infoCard: {
		padding: "20px",
		"& > *": {
			margin: "10px 0px",
		},
	},
});
const InfoCard = ({ info }) => {
	const { title, meta, description } = info;
	const classes = useStyles();
	return (
		<Paper className={classes.infoCard}>
			<Typography variant="h5" component="h1" color="textPrimary">
				{title}
			</Typography>
			<Typography variant="subtitle1" color="textSecondary">
				{meta}
			</Typography>
			<Typography variant="body1" color="textPrimary">
				{description}
			</Typography>
		</Paper>
	);
};

export default InfoCard;
