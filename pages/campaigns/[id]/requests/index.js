import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});
const CampaignRequests = () => {
	const classes = useStyles();
	return (
		<Container>
			<TableContainer>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Dessert (100g serving)</TableCell>
							<TableCell align="right">Calories</TableCell>
							<TableCell align="right">Fat&nbsp;(g)</TableCell>
							<TableCell align="right">Carbs&nbsp;(g)</TableCell>
							<TableCell align="right">
								Protein&nbsp;(g)
							</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default CampaignRequests;
