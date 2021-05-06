import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core";

import React, { useState } from "react";
import { useWeb3 } from "../../../context/Web3";

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

const CreateCamapaign = () => {
	const classes = useStyles();
	const { web3, factory, curAccount } = useWeb3();

	const [campaignData, setCampaignData] = useState({
		minimumContribution: 0,
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setCampaignData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		await factory.methods
			.createCamapaign()
			.send({ from: curAccount, gas: "2000000" });
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
								name="minimumContribution"
								label="Minimum Contribution"
								type="number"
								defaultValue={0}
								value={campaignData.minimumContribution}
								onChange={handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											ether
										</InputAdornment>
									),
								}}
							/>
							<Button variant="contained" color="primary">
								Submit
							</Button>
						</form>
					</CardContent>
				</Card>
			</Container>
		</>
	);
};

export default CreateCamapaign;
