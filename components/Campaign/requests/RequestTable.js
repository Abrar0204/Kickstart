import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import { getCampaign } from "../../../ethereum/campagin";
import { useWeb3 } from "../../../context/Web3";
import Loading from "../../shared/Loading";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	tableContainer: {
		margin: "10px",
		padding: "10px",
		overflowX: "auto",
	},
}));

const RequestTable = ({ id }) => {
	const { curAccount } = useWeb3();

	const [requests, setRequests] = useState([]);
	const [totalApprovers, setTotalApprovers] = useState(0);
	const [contract, setContract] = useState({});

	const [dataLoading, setDataLoading] = useState(true);
	const [approveloading, setApproveLoading] = useState(false);
	const [finalizeLoading, setFinalizeLoading] = useState(false);
	const classes = useStyles();
	useEffect(() => {
		async function initialize() {
			setDataLoading(true);
			const contractIns = await getCampaign(id);
			const reqCount = await contractIns.methods
				.getRequestLength()
				.call();
			const requestsData = [];
			//Get Request data one by one
			for (let i = 0; i < reqCount; i++) {
				const reqData = await contractIns.methods.requests(i).call();
				setTotalApprovers(
					await contractIns.methods.numApprovers().call()
				);
				requestsData.push({
					description: reqData[0],
					value: reqData[1],
					vendor: reqData[2],
					complete: reqData[3],
					approvalCount: reqData[4],
				});
			}

			setContract(contractIns);
			setRequests(requestsData);
			setDataLoading(false);
		}
		initialize();
	}, []);

	const approveRequest = async index => {
		setApproveLoading(true);
		try {
			await contract.methods
				.approveRequest(index)
				.send({ from: curAccount });
			const newRequests = requests.map((req, ind) => {
				if (ind !== index) return req;
				return {
					...req,
					approvalCount: parseInt(req.approvalCount) + 1,
				};
			});

			setRequests(newRequests);
		} catch (err) {
			//console.log(err);
		}
		setApproveLoading(false);
	};

	const finalizeRequest = async index => {
		setFinalizeLoading(true);
		try {
			await contract.methods
				.finalizeRequest(index)
				.send({ from: curAccount });
			const newRequests = requests.map((req, ind) => {
				if (ind !== index) return req;
				return {
					...req,
					complete: true,
				};
			});

			setRequests(newRequests);
		} catch (err) {
			//console.log(err);
		}
		setFinalizeLoading(false);
	};

	return dataLoading ? (
		<Loading />
	) : (
		<Paper className={classes.tableContainer}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell width="65">ID</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Value</TableCell>
						<TableCell>Recepient</TableCell>
						<TableCell>Approval Count</TableCell>
						<TableCell>Approve</TableCell>
						<TableCell>Finalize</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{requests.map((req, index) => (
						<TableRow key={req.description}>
							<TableCell>{index + 1}</TableCell>
							<TableCell component="th" scope="row">
								{req.description}
							</TableCell>

							<TableCell>{req.value}</TableCell>
							<TableCell>{req.vendor}</TableCell>
							<TableCell>
								{req.approvalCount}/{totalApprovers}
							</TableCell>
							<TableCell>
								<Button
									variant="text"
									color="primary"
									onClick={() => approveRequest(index)}
								>
									{approveloading ? (
										<CircularProgress size="16px" />
									) : (
										"Approve"
									)}
								</Button>
							</TableCell>
							<TableCell>
								<Button
									variant="contained"
									color="primary"
									disabled={req.complete}
									onClick={() => finalizeRequest(index)}
								>
									{finalizeLoading ? (
										<CircularProgress
											size="16px"
											color="secondary"
										/>
									) : req.complete ? (
										"Finalized"
									) : (
										"Finalize"
									)}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};

export default RequestTable;
