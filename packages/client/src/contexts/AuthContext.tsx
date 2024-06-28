import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import axios from "axios";
import { AuthContextType } from "../../../lib-common/types";

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	loading: true,
	login: async () => {},
	logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
		const token = localStorage.getItem("authToken");
		return !!token;
	});
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			setIsAuthenticated(true);
		}
		setLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post(`http://localhost:3000/login`, {
				email,
				password,
			});
			const { token } = response.data;
			localStorage.setItem("authToken", token);
			setIsAuthenticated(true);
		} catch (error) {
			throw new Error("Failed to login");
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, loading, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
