import { initializeWeb3 } from "./web3";
import Campaign from "./build/Campaign.json";

const getCampaign = async campaignAddress => {
	try {
		const web3 = await initializeWeb3();
		const contract = new web3.eth.Contract(Campaign.abi, campaignAddress);
		return contract;
	} catch (err) {
		return err;
	}
};

export { getCampaign };
