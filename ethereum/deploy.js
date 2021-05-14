const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledFactory = require("./build/CampaignFactory.json");

const mnemonicPhrase =
	"leg segment december purse purity culture fall nest oblige sauce prevent asset";
const networkURL =
	"https://rinkeby.infura.io/v3/e48ca24665644191aa7e2f0fc13a45b0";

const provider = new HDWalletProvider({
	mnemonic: mnemonicPhrase,
	providerOrUrl: networkURL,
});

const web3 = new Web3(provider);

async function deploy() {
	try {
		const accounts = await web3.eth.getAccounts();
		const deploymentAccount = accounts[0];

		const privateKey =
			provider.wallets[
				deploymentAccount.toLowerCase()
			].privateKey.toString("hex");

		//console.log("Available accounts: ", accounts);

		const contract = await new web3.eth.Contract(compiledFactory.abi)
			.deploy({ data: compiledFactory.evm.bytecode.object })
			.encodeABI();

		let transactionObject = {
			gas: 4000000,
			data: contract,
			from: deploymentAccount,
			// chainId: 3,
		};

		let signedTransactionObject = await web3.eth.accounts.signTransaction(
			transactionObject,
			"0x" + privateKey
		);

		let result = await web3.eth.sendSignedTransaction(
			signedTransactionObject.rawTransaction
		);
		//console.log(compiledFactory.abi);
		//console.log("Contract deployed to", result.contractAddress);
	} catch (err) {
		//console.log(err);
	}
}

// 0x8f4E9BffEC3DAa3530CC4d12bb3f96e291e4E69E
deploy();
