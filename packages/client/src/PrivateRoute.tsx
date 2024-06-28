import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { CircularProgress } from "@mui/material";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<CircularProgress />
			</div>
		);
	}

	return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
