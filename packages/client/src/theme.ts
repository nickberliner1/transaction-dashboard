import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		hoverShadow?: string;
		borderColor?: string;
	}

	interface PaletteOptions {
		hoverShadow?: string;
		borderColor?: string;
	}
}

const borderAndHoverDark = "0px 10px 15px rgba(255, 255, 255, 0.2)";
const borderAndHoverLight = "0px 10px 15px rgba(0, 0, 0, 0.1)";

const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#605af8",
		},
		hoverShadow: borderAndHoverLight,
		borderColor: borderAndHoverLight,
	},
});

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#605af8",
		},
		hoverShadow: borderAndHoverDark,
		borderColor: borderAndHoverDark,
	},
});

export { lightTheme, darkTheme };
