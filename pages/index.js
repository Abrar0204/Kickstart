// import from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { useWeb3 } from "../context/Web3";
import Loading from "../components/shared/Loading";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles(theme => ({
	center: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		color: "#fff",
		width: "100%",
		height: "70vh",

		"& > *": {
			margin: "8px",
			[theme.breakpoints.down("md")]: {
				textAlign: "center",
			},
		},
		[theme.breakpoints.down("xs")]: {
			height: "auto",
		},
	},
	largeFont: {
		fontSize: "60px",
		[theme.breakpoints.down("xs")]: {
			fontSize: "45px",
		},
	},
	mediumFont: {
		fontSize: "45px",
		[theme.breakpoints.down("xs")]: {
			fontSize: "30px",
		},
	},
	button: {
		margin: "20px",
	},
}));

export default function Home() {
	const { web3, noMetamask } = useWeb3();
	const classes = useStyles();

	return noMetamask ? (
		<Container className={classes.center}>
			<Typography
				variant="h2"
				component="h1"
				color="textPrimary"
				className={classes.largeFont}
			>
				Welcome To KickStart
			</Typography>
			<Typography
				variant="h4"
				component="h2"
				color="textPrimary"
				className={classes.mediumFont}
			>
				A Crowdfunding Platform powered by Blockchain
			</Typography>
			<Alert severity="error">
				You need to install{" "}
				<Link href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
					Metamask
				</Link>{" "}
				to use this Application.
			</Alert>
		</Container>
	) : web3["version"] ? (
		<>
			<Container className={classes.center}>
				<Typography
					variant="h2"
					component="h1"
					color="textPrimary"
					className={classes.largeFont}
				>
					Welcome To KickStart
				</Typography>
				<Typography
					variant="h4"
					component="h2"
					color="textPrimary"
					className={classes.mediumFont}
				>
					A Crowdfunding Platform powered by Blockchain
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
			<Loading />
		</>
	);
}
