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

import React, { useState } from "react";
import { useWeb3 } from "../../../context/Web3";
import { useRouter } from "next/router";
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

const CreateCampaign = () => {
	const classes = useStyles();
	const router = useRouter();

	const { web3, factory, curAccount, getCampaigns } = useWeb3();

	const [campaignData, setCampaignData] = useState({
		minimumContribution: 0,
		title: "",
		description: "",
	});
	const [errMessage, setErrMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setCampaignData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const { title, description, minimumContribution } = campaignData;
			await factory.methods
				.createCampaign(title, description, minimumContribution)
				.send({ from: curAccount });
			setLoading(false);
			setSuccess(true);
			router.push("/campaigns");
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
							Create Campaign
						</Typography>
						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								fullWidth
								variant="outlined"
								name="title"
								label="Campaign Title"
								value={campaignData.title}
								onChange={handleChange}
							/>
							<TextField
								fullWidth
								variant="outlined"
								name="description"
								label="Campaign Description"
								value={campaignData.description}
								onChange={handleChange}
							/>
							<TextField
								fullWidth
								variant="outlined"
								name="minimumContribution"
								label="Minimum Contribution"
								type="number"
								value={campaignData.minimumContribution}
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
									"Submit"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>
			</Container>
		</>
	);
};

export default CreateCampaign;
