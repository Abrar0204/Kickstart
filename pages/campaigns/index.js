import React from "react";
import { useWeb3 } from "../../context/Web3";

const CampaignsPage = () => {
	const { campaigns } = useWeb3();
	return (
		<div>
			{campaigns.map(campaign => (
				<p key={campaign}>{campaign}</p>
			))}
		</div>
	);
};

export default CampaignsPage;
