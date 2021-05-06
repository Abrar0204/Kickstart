const ganache = require("ganache-cli");
const provider = ganache.provider();
const Web3 = require("web3");
const assert = require("assert");

const web3 = new Web3(provider);

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let campaign, campaignAddress, factory, accounts;

beforeEach(async () => {
	try {
		accounts = await web3.eth.getAccounts();

		factory = await new web3.eth.Contract(compiledFactory.abi)
			.deploy({
				data: compiledFactory.evm.bytecode.object,
			})
			.send({ from: accounts[0], gasLimit: "2000000" });

		await factory.methods
			.createCampaign("100")
			.send({ from: accounts[1], gasLimit: "2000000" });

		[campaignAddress] = await factory.methods.getDeployedCampaigns().call();

		campaign = await new web3.eth.Contract(
			compiledCampaign.abi,
			campaignAddress
		);
	} catch (err) {
		console.log(err.message);
	}
});

describe("Campaign", () => {
	it("deploys factory and campaign", () => {
		assert(campaign.options.address);
		assert(factory.options.address);
	});

	it("marks caller as campaign manager", async () => {
		const manager = await campaign.methods.manager().call();
		assert.strictEqual(accounts[1], manager);
	});

	it("allows people to contribute and sets them as contributor", async () => {
		await campaign.methods
			.contribute()
			.send({ from: accounts[2], value: web3.utils.toWei("1", "ether") });

		const isContributor = await campaign.methods
			.approvers(accounts[2])
			.call();

		assert(isContributor);
	});

	it("checks for minimum contribution", async () => {
		try {
			await campaign.methods
				.contribute()
				.send({ from: accounts[2], value: "5" });
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it("allows manager to create requests", async () => {
		await campaign.methods
			.createRequest(
				"Buy batteries",
				web3.utils.toWei("0.5", "ether"),
				accounts[3]
			)
			.send({ from: accounts[1], gas: "2000000" });
		const request = await campaign.methods.requests(0).call();

		assert.strictEqual("Buy batteries", request.description);
	});

	it("processes requests", async () => {
		//Contribute
		await campaign.methods.contribute().send({
			from: accounts[2],
			value: web3.utils.toWei("10", "ether"),
		});

		//Create Request
		await campaign.methods
			.createRequest(
				"Buy Batteries",
				web3.utils.toWei("5", "ether"),
				accounts[3]
			)
			.send({ from: accounts[1], gas: "2000000" });

		//Approve Request
		await campaign.methods
			.approveRequest(0)
			.send({ from: accounts[2], gas: "2000000" });

		//Check vendor money before finalizing
		let intialBalance = await web3.eth.getBalance(accounts[3]);
		intialBalance = web3.utils.fromWei(intialBalance, "ether");
		intialBalance = parseFloat(intialBalance);

		//Finalize Request
		await campaign.methods
			.finalizeRequest(0)
			.send({ from: accounts[1], gas: "2000000" });

		//Check if vendor recieved ethers
		let currentBalance = await web3.eth.getBalance(accounts[3]);
		currentBalance = web3.utils.fromWei(currentBalance, "ether");
		currentBalance = parseFloat(currentBalance);

		const diff = currentBalance - intialBalance;
		assert(diff > 4.8);

		const request = await campaign.methods.requests(0).call();

		assert(request.complete);
	});
});
