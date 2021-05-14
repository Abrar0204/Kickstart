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
import { useWeb3 } from "../../../../../context/Web3";
import { useRouter } from "next/router";
import { getCampaign } from "../../../../../ethereum/campagin";
const useStyles = makeStyles({
	formContainer: {
		width: "50%",
		padding: "0px 20px",
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
});

const NewRequest = ({ id }) => {
	const classes = useStyles();
	const router = useRouter();

	const { curAccount } = useWeb3();

	const [requestData, setRequestData] = useState({
		cost: 0,
		vendor: "",
		description: "",
	});
	const [contract, setContract] = useState({});
	const [errMessage, setErrMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		async function initialize() {
			const contractInstance = await getCampaign(id);
			setContract(contractInstance);
		}
		initialize();
	}, []);

	const handleChange = e => {
		const { name, value } = e.target;
		setRequestData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		//console.log("What");
		setLoading(true);
		try {
			const { description, vendor, cost } = requestData;
			await contract.methods
				.createRequest(description, cost, vendor)
				.send({ from: curAccount });
			setLoading(false);
			setSuccess(true);
			router.push(`/campaigns/${id}/requests`);
		} catch (err) {
			let message = err.message || "";
			setLoading(false);
			//console.log(err);
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
							Create Request
						</Typography>
						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								fullWidth
								variant="outlined"
								name="description"
								label="Request Description"
								value={requestData.description}
								onChange={handleChange}
							/>
							<TextField
								fullWidth
								variant="outlined"
								name="vendor"
								label="Vendor Address"
								value={requestData.vendor}
								onChange={handleChange}
							/>
							<TextField
								fullWidth
								variant="outlined"
								name="cost"
								label="Cost"
								type="number"
								value={requestData.cost}
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
									"Create Request"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>
			</Container>
		</>
	);
};

export function getServerSideProps({ params }) {
	return {
		props: {
			id: params.id,
		},
	};
}

export default NewRequest;
