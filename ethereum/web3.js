import Web3 from "web3";

const initializeWeb3 = async () => {
	if (typeof window !== undefined && typeof window.ethereum !== undefined) {
		//On Browser and have metamask
		try {
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
			web3.eth.defaultAccount = accounts[0];
			return web3;
		} catch (err) {
			return "No Metamask";
		}
	} else {
		const networkURL =
			"https://rinkeby.infura.io/v3/e48ca24665644191aa7e2f0fc13a45b0";
		const provider = new Web3.providers.HttpProvider(networkURL);
		const web3 = new Web3(provider);
		return web3;
	}
};
export { initializeWeb3 };
