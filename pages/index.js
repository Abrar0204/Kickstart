// import from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { useWeb3 } from "../context/Web3";

const useStyles = makeStyles({
	center: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		color: "#fff",
		width: "100%",
		height: "70vh",
	},
	text: {
		color: "#f5f5f5",
		margin: "8px",
	},
	button: {
		margin: "20px",
	},
});

export default function Home() {
	const { web3 } = useWeb3();
	const classes = useStyles();

	return web3["version"] ? (
		<>
			<Container className={classes.center}>
				<Typography className={classes.text} variant="h2">
					Welcome To KickStart,
				</Typography>
				<Typography className={classes.text} variant="h4">
					a Crowdfunding Platform powered by Blockchain
				</Typography>

				<Link href="/campaigns" passHref>
					<Button
						className={classes.button}
						color="primary"
						variant="contained"
						size="large"
					>
						Support a Campaign
					</Button>
				</Link>
			</Container>
		</>
	) : (
		<>
			<CircularProgress />
		</>
	);
}
