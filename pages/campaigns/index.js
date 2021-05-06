// import from '@material-ui/core'
import { makeStyles } from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import CampaignGrid from "../../components/Home/CampaignGrid";
import { useWeb3 } from "../../context/Web3";

const useStyles = makeStyles({
	container: {
		paddingTop: "30px",
	},
	pageTitle: {
		marginBottom: "30px",
		color: "#fff",
	},
});

export default function Home() {
	const { web3 } = useWeb3();
	const classes = useStyles();

	return web3["version"] ? (
		<>
			<Container className={classes.container}>
				<Typography
					variant="h4"
					components="h1"
					className={classes.pageTitle}
				>
					Campaigns
				</Typography>
				<CampaignGrid />
			</Container>
		</>
	) : (
		<>
			<CircularProgress />
		</>
	);
}
