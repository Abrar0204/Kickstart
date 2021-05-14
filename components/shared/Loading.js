import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles({
	loading: {
		width: "100%",
		height: "50vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
const Loading = () => {
	const classes = useStyles();
	return (
		<div className={classes.loading}>
			<CircularProgress size="100px" color="primary" />
		</div>
	);
};

export default Loading;
