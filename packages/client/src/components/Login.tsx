import React, { useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Container,
	Box,
	Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await login(email, password);
			navigate("/dashboard");
		} catch (error) {
			console.error("Login failed", error);
			setError(
				"Login failed. Please check your credentials and try again."
			);
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				component="form"
				onSubmit={handleSubmit}
				className="flex flex-col items-center mt-8"
			>
				<Typography component="h1" variant="h5" className="mb-4">
					Login
				</Typography>
				<TextField
					label="Email"
					type="email"
					fullWidth
					margin="normal"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="mb-4"
				/>
				<TextField
					label="Password"
					type="password"
					fullWidth
					margin="normal"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="mb-4"
				/>
				{error && (
					<Alert severity="error" className="w-full mb-4">
						{error}
					</Alert>
				)}
				<Button
					type="submit"
					fullWidth
					variant="contained"
					className="mt-3 mb-2 bg-blue-600 text-white"
				>
					Login
				</Button>
			</Box>
		</Container>
	);
};

export default Login;
