import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSME } from "../contexts/SMEContext";
import TransactionFeed from "./TransactionFeed";
import { TransactionsProvider } from "../contexts";
import {
	AppBar,
	Alert,
	CircularProgress,
	Toolbar,
	Typography,
	Avatar,
	Button,
	Switch,
	Snackbar,
	FormControlLabel,
} from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { UserData } from "../../../lib-common/types";
import { lightTheme, darkTheme } from "../theme";

const Dashboard: React.FC = () => {
	const [user, setUser] = useState<UserData | null>(null);
	const { logout } = useAuth();
	const navigate = useNavigate();
	const { smeDataError, smeData, fetchSMEData } = useSME();
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		const token = localStorage.getItem("authToken");
		if (token) {
			const decodedToken: any = jwtDecode(token);
			setUser(decodedToken.userData);

			fetchSMEData(decodedToken.userData.smeId)
				.then(() => setIsLoading(false))
				.catch((error) => {
					console.error("Error fetching SME data:", error);
					setIsLoading(false);
				});
			setIsLoading(false);
		} else {
			navigate("/login");
		}

		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setDarkMode(savedTheme === "dark");
		}
	}, [navigate]);

	const handleThemeChange = () => {
		const newTheme = !darkMode ? "dark" : "light";
		setDarkMode(!darkMode);
		localStorage.setItem("theme", newTheme);
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<CircularProgress />
			</div>
		);
	}

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			<div>
				<header>
					<AppBar position="static">
						<Toolbar className="flex justify-between">
							<div className="flex items-center">
								<Avatar
									src={user?.profileImage}
									alt={user?.name || "User profile image"}
									className="mr-2"
								/>
								<Typography
									variant="h6"
									aria-label="User's name"
								>
									{user?.name} -{" "}
									{smeDataError ? (
										<Snackbar
											open={!!smeDataError}
											anchorOrigin={{
												vertical: "top",
												horizontal: "center",
											}}
										>
											<Alert severity="error">
												{smeDataError}
											</Alert>
										</Snackbar>
									) : (
										smeData?.legalName
									)}
								</Typography>
							</div>
							<div className="flex items-center">
								<Button
									data-testid="logout-button"
									color="inherit"
									variant="outlined"
									onClick={() => {
										logout();
										navigate("/login");
									}}
									className="ml-4"
									aria-label="Logout button"
								>
									Logout
								</Button>
							</div>
						</Toolbar>
					</AppBar>
				</header>
				<main className="p-4">
					<h2
						className="text-2xl mb-5"
						aria-label="Transactions heading"
					>
						Transactions
					</h2>
					<FormControlLabel
						control={
							<Switch
								checked={darkMode}
								onChange={handleThemeChange}
								name="themeToggle"
								color="primary"
								inputProps={{
									"aria-label": "Dark mode toggle",
								}}
							/>
						}
						label="Dark mode"
						className="mb-2"
						aria-label="Dark mode switch"
					/>

					<TransactionsProvider>
						<TransactionFeed aria-label="Transaction feed" />
					</TransactionsProvider>
				</main>
			</div>
		</ThemeProvider>
	);
};

export default Dashboard;
