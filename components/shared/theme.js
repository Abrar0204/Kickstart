import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
	typography: {
		fontFamily: "'Inter',sans-serif",
	},
	palette: {
		type: "dark",
		primary: {
			light: "#779ef7",
			dark: "#3c5dab",
			main: "#5686F5",
		},
		secondary: {
			dark: "#101113",
			main: "#17191C",
			light: "#454749",
		},
		text: {
			secondary: "#aaaaaa",
			primary: "#f5f5f5",
			disabled: "#ababab",
		},
		background: {
			default: "#17191c",
			paper: "#111215",
		},
	},
	cssOutlinedInput: {
		"&$cssFocused $notchedOutline": {
			borderColor: `#3c5dab !important`,
		},
	},
});

export default theme;
