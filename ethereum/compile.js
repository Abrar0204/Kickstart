const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

//Delete build folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf-8");

var input = {
	language: "Solidity",
	sources: {
		contract: {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
};

const res = JSON.parse(solc.compile(JSON.stringify(input)));

//Creates build path if it does not exist
fs.ensureDirSync(buildPath);

for (let contract in res.contracts.contract) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract + ".json"),
		res.contracts.contract[contract]
	);
}
