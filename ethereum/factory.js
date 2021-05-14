import { initializeWeb3 } from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const getFactory = async () => {
	try {
		const web3 = await initializeWeb3();
		const contractAddress = "0x8f4E9BffEC3DAa3530CC4d12bb3f96e291e4E69E";
		const factory = new web3.eth.Contract(
			CampaignFactory.abi,
			contractAddress
		);
		return factory;
	} catch (err) {
		return err;
	}
};

export { getFactory };
