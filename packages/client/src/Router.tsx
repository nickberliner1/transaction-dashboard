import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { useAuth, SMEProvider } from "./contexts";

const AppRouter: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<SMEProvider>
								<Dashboard />
							</SMEProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/"
					element={
						<Navigate
							to={isAuthenticated ? "/dashboard" : "/login"}
						/>
					}
				/>
			</Routes>
		</Router>
	);
};

export default AppRouter;
