import { useEffect } from "react";
import { Web3Provider } from "../context/Web3";
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
// import { ThemeProvider } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
import "../styles/globals.css";
import Layout from "../components/shared/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import theme from "../components/shared/theme";

export default function MyApp(props) {
	const { Component, pageProps } = props;

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>KickStart</title>
			</Head>
			<ThemeProvider theme={theme}>
				<Web3Provider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Web3Provider>
			</ThemeProvider>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
