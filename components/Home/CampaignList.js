import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const CampaignList = ({ campaigns }) => {
	return (
		<List>
			{campaigns.map(campaign => (
				<ListItem key={campaign}>{campaign}</ListItem>
			))}
		</List>
	);
};

export default CampaignList;
