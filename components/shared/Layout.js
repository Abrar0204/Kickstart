import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles({
	navbar: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "10vh",
		padding: "0px 30px",
		// color: "#DADBDC",
	},
	page: {
		marginTop: "10vh",
	},
	logo: {
		textTransform: "none",
	},
});
const Layout = ({ children }) => {
	const classes = useStyles();
	return (
		<div>
			<AppBar className={classes.navbar} elevation={0} color="secondary">
				<Link href="/" passHref>
					<Button variant="text" className={classes.logo}>
						<Typography variant="h5" component="h1">
							KickStart
						</Typography>
					</Button>
				</Link>
				<Grid
					container
					direction="row"
					alignItems="center"
					justify="flex-end"
					spacing={2}
				>
					<Grid item>
						<Link href="/campaigns" passHref>
							<Button
								color="primary"
								variant="text"
								disableElevation
							>
								campaigns
							</Button>
						</Link>
					</Grid>
					<Grid item>
						<Link href="/campaigns/new" passHref>
							<Button
								color="primary"
								variant="text"
								disableElevation
							>
								create a new campaign
							</Button>
						</Link>
					</Grid>
				</Grid>
			</AppBar>
			<div className={classes.page}>{children}</div>
		</div>
	);
};

export default Layout;
