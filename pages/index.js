// import from '@material-ui/core'
import CircularProgress from "@material-ui/core/CircularProgress";
import CampaignList from "../components/Home/CampaignList";

import { useWeb3 } from "../context/Web3";

export default function Home() {
	const { web3, factory, campaigns, curAccount } = useWeb3();

	return web3["version"] ? (
		<>
			<CampaignList />
		</>
	) : (
		<>
			<CircularProgress />
		</>
	);
}
