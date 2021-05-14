import { createContext, useContext, useState, useEffect } from "react";
import { initializeWeb3 } from "../ethereum/web3";
import { getFactory } from "../ethereum/factory";
const Web3Context = createContext();

const Web3Provider = ({ children }) => {
	const [web3, setWeb3] = useState({});
	const [factory, setFactory] = useState({});
	const [campaigns, setCampaigns] = useState([]);
	const [curAccount, setCurAccount] = useState("");
	const [noMetamask, setNoMetaMask] = useState(false);
	useEffect(() => {
		(async () => {
			const web3Instance = await initializeWeb3();
			if (web3Instance === "No Metamask") {
				console.log("Shit");
				setNoMetaMask(true);
				return;
			}
			setWeb3(web3Instance);
			setCurAccount(web3Instance.eth.defaultAccount);

			const factoryContract = await getFactory();
			setFactory(factoryContract);
			setCampaigns(
				formatCampaigns(
					await factoryContract.methods.getDeployedCampaigns().call()
				)
			);
		})();
		window?.ethereum?.on("disconnect", err =>
			console.log("disconnected", err)
		);
		window?.ethereum?.on(
			"accountsChanged",
			arr => arr.length != 0 && setCurAccount(arr[0])
		);
	}, []);

	const formatCampaigns = campaignsData => {
		let newCamapaignsData = {};

		campaignsData.map(campaign => {
			newCamapaignsData[campaign[4]] = {
				title: campaign[0],
				description: campaign[1],
				minimumContribution: campaign[2],
				manager: campaign[3],
				contractAddress: campaign[4],
			};
		});
		return newCamapaignsData;
	};

	const getCampaigns = async () => {
		if (factory.methods) {
			const campaignsData = await factory?.methods
				?.getDeployedCampaigns()
				.call();

			setCampaigns(formatCampaigns(campaignsData));
		}
	};

	return (
		<Web3Context.Provider
			value={{
				web3,
				factory,
				campaigns,
				curAccount,
				getCampaigns,
				noMetamask,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

const useWeb3 = () => useContext(Web3Context);

export { useWeb3, Web3Provider };
