import { createContext, useContext, useState, useEffect } from "react";
import { initializeWeb3 } from "../ethereum/web3";
import { getFactory } from "../ethereum/factory";
const Web3Context = createContext();

const Web3Provider = ({ children }) => {
	const [web3, setWeb3] = useState({});
	const [factory, setFactory] = useState({});
	const [campaigns, setCampaigns] = useState([]);
	const [curAccount, setCurAccount] = useState("");
	useEffect(() => {
		(async () => {
			const web3Instance = await initializeWeb3();
			setWeb3(web3Instance);
			setCurAccount(web3Instance.eth.defaultAccount);

			const factoryContract = await getFactory();
			setFactory(factoryContract);
			setCampaigns(
				await factoryContract.methods.getDeployedCampaigns().call()
			);
		})();
		window.ethereum.on("disconnect", err =>
			console.log("disconnected", err)
		);
		window.ethereum.on(
			"accountsChanged",
			arr => arr.length != 0 && setCurAccount(arr[0])
		);
	}, []);

	return (
		<Web3Context.Provider value={{ web3, factory, campaigns, curAccount }}>
			{children}
		</Web3Context.Provider>
	);
};

const useWeb3 = () => useContext(Web3Context);

export { useWeb3, Web3Provider };
