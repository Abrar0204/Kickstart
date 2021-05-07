import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCampaign } from "../../../ethereum/campagin";
import { useWeb3 } from "../../../context/Web3";
import { CircularProgress, Typography } from "@material-ui/core";
const Campaign = () => {
	const router = useRouter();
	const [contract, setContract] = useState({});
	const [campaignData, setCampaignData] = useState({});

	useEffect(() => {
		const getCampaignData = async () => {
			const contractIns = await getCampaign(router.query.id);

			const campaign = await contractIns.methods
				.getCamapaignData()
				.call();

			setCampaignData({
				title: campaign[0],
				description: campaign[1],
				minimumContribution: campaign[2],
				manager: campaign[3],
				contractAddress: campaign[4],
			});
			setContract(contractIns);
		};
		getCampaignData();
	}, []);

	return campaignData.title !== undefined ? (
		<Typography>{campaignData.title}</Typography>
	) : (
		<CircularProgress size="40" />
	);
};

export async function getServerSideProps(context) {
	return {
		props: {}, // will be passed to the page component as props
	};
}

export default Campaign;
