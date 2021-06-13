import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Add, ListAlt } from "@material-ui/icons";
import Link from "next/link";
import Drawer from "@material-ui/core/Drawer";
import {
	List,
	ListItemText,
	ListItem,
	ListItemIcon,
	Divider,
} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
	navbar: {
		display: "flex",
		flexDirection: "row",

		alignItems: "center",
		height: "10vh",
		padding: "10px 30px",
		[theme.breakpoints.down("xs")]: {
			padding: "10px",
		},
	},
	drawer: {
		padding: "20px 5px",
	},
	page: {
		marginTop: "10vh",
	},
	logo: {
		textTransform: "none",
	},
	drawerLogo: {
		textTransform: "none",
		margin: "10px 0px",
	},
}));
const Layout = ({ children }) => {
	const classes = useStyles();
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleDrawer = () => {
		setMenuOpen(prev => !prev);
	};
	return (
		<div>
			<AppBar className={classes.navbar} elevation={0} color="secondary">
				<Grid container direction="row" alignItems="center">
					<IconButton onClick={toggleDrawer}>
						<MenuIcon />
					</IconButton>
					<Link href="/" passHref>
						<Button variant="text" className={classes.logo}>
							<Typography variant="h5" component="h1">
								KickStart
							</Typography>
						</Button>
					</Link>
				</Grid>
			</AppBar>
			<Drawer
				variant="temporary"
				anchor="left"
				open={!menuOpen}
				onClose={toggleDrawer}
			>
				<List className={classes.drawer}>
					<Link href="/" passHref>
						<Button variant="text" className={classes.drawerLogo}>
							<Typography variant="h5" component="h1">
								KickStart
							</Typography>
						</Button>
					</Link>
					<Divider />
					<Link href="/campaigns" passHref>
						<ListItem button>
							<ListItemIcon>
								<Add />
							</ListItemIcon>
							<ListItemText>Campaigns</ListItemText>
						</ListItem>
					</Link>
					<Link href="/campaigns/new" passHref>
						<ListItem button>
							<ListItemIcon>
								<ListAlt />
							</ListItemIcon>
							<ListItemText>Create a Campaign</ListItemText>
						</ListItem>
					</Link>
				</List>
			</Drawer>
			<div className={classes.page}>{children}</div>
		</div>
	);
};

export default Layout;
