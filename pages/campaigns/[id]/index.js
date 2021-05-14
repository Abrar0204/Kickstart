import React, { useEffect, useState } from "react";
import { getCampaign } from "../../../ethereum/campagin";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";
import InfoCard from "../../../components/shared/InfoCard";
import Loading from "../../../components/shared/Loading";

const useStyles = makeStyles({
	title: {
		margin: "15px 0px",
	},
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		margin: "40px 0px",
	},
});

const Campaign = ({ id }) => {
	const [contract, setContract] = useState({});
	const [campaignData, setCampaignData] = useState({});
	const classes = useStyles();
	useEffect(() => {
		const getCampaignData = async () => {
			const contractIns = await getCampaign(id);

			const campaign = await contractIns.methods
				.getCamapaignData()
				.call();

			setCampaignData({
				title: campaign[0],
				description: campaign[1],
				minimumContribution: campaign[3],
				manager: campaign[2],
				balance: campaign[4],
				requestLength: campaign[5],
				approverLength: campaign[6],
			});
			//console.log(campaign);
			setContract(contractIns);
		};
		getCampaignData();
	}, []);

	const renderCampaignDetails = () => {
		const data = [
			{
				title: campaignData.manager,
				meta: "Manager Address",
				description:
					"The manager created this campaign and can create requests.",
				xs: 7,
			},
			{
				title: `${campaignData.minimumContribution} wei(s)`,
				meta: "Minimum Contribution",
				description: "Minimum wei(s) required to become contributor.",
				xs: 5,
			},
			{
				title: campaignData.requestLength,
				meta: "No of Requests",
				description: "Requests to withdraw money from contract.",
				xs: 4,
			},
			{
				title: campaignData.approverLength,
				meta: "No of Approvers/Contributors",
				description: "No of people who donated to campaigns.",
				xs: 4,
			},
			{
				title: campaignData.balance,
				meta: "Campaign Balance (wei)",
				description: "How much money this campaign has gathered.",
				xs: 4,
			},
		];

		return (
			<Grid container spacing={2}>
				{data.map(info => (
					<Grid item key={info.meta} xs={info.xs}>
						<InfoCard info={info} />
					</Grid>
				))}
			</Grid>
		);
	};

	return campaignData.title !== undefined ? (
		<Container>
			<div className={classes.header}>
				<div>
					<Typography
						variant="h4"
						component="h1"
						color="textPrimary"
						className={classes.title}
					>
						{campaignData.title}
					</Typography>
					<Typography
						variant="h5"
						component="h2"
						color="textPrimary"
						className={classes.title}
					>
						{campaignData.description}
					</Typography>
				</div>
				<Link href={`/campaigns/${id}/contribute`} passHref>
					<Button color="primary" variant="contained">
						Contribute
					</Button>
				</Link>
			</div>
			{renderCampaignDetails()}

			<Link href={`/campaigns/${id}/requests`} passHref>
				<Button
					color="primary"
					variant="text"
					className={classes.title}
				>
					View Requests
				</Button>
			</Link>
		</Container>
	) : (
		<Loading />
	);
};

export async function getServerSideProps({ params }) {
	return {
		props: {
			id: params.id,
		}, // will be passed to the page component as props
	};
}

export default Campaign;
