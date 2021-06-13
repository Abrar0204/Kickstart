import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCampaign } from "../../../../ethereum/campagin";
import { useWeb3 } from "../../../../context/Web3";
const useStyles = makeStyles(theme => ({
	formContainer: {
		width: "50%",
		padding: "0px 20px",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	form: {
		"& > *": {
			margin: "10px 0px",
		},
	},
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "60vh",
	},
	title: {
		marginTop: "10px",
		marginBottom: "30px",
	},
}));

const Contribute = ({ id }) => {
	const classes = useStyles();
	const router = useRouter();
	const { curAccount } = useWeb3();
	const [contribution, setContribution] = useState(0);
	const [contract, setContract] = useState({});
	const [errMessage, setErrMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		async function initialize() {
			const contractInstance = await getCampaign(id);
			const minimumContribution = await contractInstance.methods
				.minimumContribution()
				.call();
			setContribution(parseInt(minimumContribution) + 1);
			setContract(contractInstance);
		}
		initialize();
	}, []);

	const handleChange = e => {
		// const { name, value } = e.target;
		setContribution(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		e.preventDefault();
		setLoading(true);
		try {
			await contract.methods
				.contribute()
				.send({ from: curAccount, value: contribution });
			setLoading(false);
			setSuccess(true);
			router.push(`/campaigns/${id}`);
		} catch (err) {
			let message = err.message || "";
			setLoading(false);
			if (message.includes("User denied transaction signature")) {
				setErrMessage("The transaction was cancelled.");
			}
		}
	};

	const displayTransactionInfo = () => {
		if (loading) {
			return (
				<Alert severity="info">
					The Transaction is being processed.
				</Alert>
			);
		}
		if (errMessage) {
			return <Alert severity="error">{errMessage}</Alert>;
		}
		if (success) {
			return (
				<Alert severity="success">The Transaction was a success.</Alert>
			);
		}
	};

	return (
		<>
			<Container className={classes.container}>
				<Card className={classes.formContainer}>
					<CardContent>
						<Typography
							variant="h5"
							component="h1"
							className={classes.title}
						>
							Your Contribution
						</Typography>
						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								fullWidth
								variant="outlined"
								name="contribution"
								label="Contribution"
								type="number"
								value={contribution}
								onChange={handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											wei
										</InputAdornment>
									),
								}}
							/>
							{displayTransactionInfo()}
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								{loading ? (
									<CircularProgress
										color="secondary"
										size={25}
									/>
								) : (
									"Contribute"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>
			</Container>
		</>
	);
};

export async function getServerSideProps({ params }) {
	return {
		props: {
			id: params.id,
		}, // will be passed to the page component as props
	};
}

export default Contribute;
