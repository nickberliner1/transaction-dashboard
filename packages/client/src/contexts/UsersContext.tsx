import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User, UsersContextType } from "../../../lib-common/types";
import { useAuth } from "./AuthContext";

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [users, setUsers] = useState<User[]>([]);
	const [userDataError, setUserDataError] = useState<string | null>(null);

	const { isAuthenticated } = useAuth();

	useEffect(() => {
		const fetchUsers = async () => {
			if (!isAuthenticated) return;

			const token = localStorage.getItem("authToken");

			try {
				setUserDataError(null);
				const response = await axios.get(
					`http://localhost:3000/users`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setUsers(response.data);
			} catch (error) {
				console.error("Failed to fetch users", error);
				setUserDataError("Failed to get user data");
			}
		};

		fetchUsers();
	}, [isAuthenticated]);

	const getUserById = (id: string): User | undefined => {
		return users.find((user) => user.id === id);
	};

	return (
		<UsersContext.Provider value={{ users, getUserById, userDataError }}>
			{children}
		</UsersContext.Provider>
	);
};

export const useUsers = (): UsersContextType => {
	const context = useContext(UsersContext);
	if (!context) {
		throw new Error("useUsers must be used within a UsersProvider");
	}
	return context;
};
