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
	pageTitle: {
		margin: "20px 0px",
		color: "#fff",
	},
});

export default function Home() {
	const { web3 } = useWeb3();
	const classes = useStyles();
	return web3["version"] ? (
		<>
			<Container>
				<Grid container spacing={1}>
					<Grid item xs={12} className={classes.pageTitle}>
						<Typography variant="h4" components="h1">
							Campaigns
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<CampaignGrid />
					</Grid>
				</Grid>
			</Container>
		</>
	) : (
		<>
			<CircularProgress />
		</>
	);
}
