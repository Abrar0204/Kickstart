import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { useWeb3 } from "../../context/Web3";
import CampaignCard from "./CampaignCard";

const CampaignGrid = () => {
	const { campaigns, getCampaigns } = useWeb3();

	useEffect(() => {
		(async () => await getCampaigns())();
	}, []);

	return (
		<Grid container spacing={3} alignItems="center">
			{Object.keys(campaigns).map(campaignKey => (
				<CampaignCard
					campaign={campaigns[campaignKey]}
					key={campaigns[campaignKey].contractAddress}
				/>
			))}
		</Grid>
	);
};

export default CampaignGrid;
