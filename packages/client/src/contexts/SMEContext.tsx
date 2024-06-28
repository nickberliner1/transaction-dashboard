import React, { createContext, useContext, useState, useCallback } from "react";
import { SME, SMEContextType } from "../../../lib-common/types";
import { useAuth } from "./AuthContext";
import axios from "axios";

const SMEContext = createContext<SMEContextType | undefined>(undefined);

export const SMEProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [smeData, setSmeData] = useState<SME | null>(null);
	const [smeDataError, setSmeDataError] = useState<string | null>(null);

	const { isAuthenticated } = useAuth();

	const fetchSMEData = useCallback(async (smeId: string) => {
		if (!isAuthenticated) return;

		try {
			setSmeDataError(null);
			const token = localStorage.getItem("authToken");
			if (!token) throw new Error("No auth token found");

			const response = await axios.get(`http://localhost:3000/sme-data`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status !== 200) {
				throw new Error("Failed to fetch SME data");
			}
			setSmeData(response.data);
		} catch (error) {
			console.error(error);
			setSmeDataError("Failed to get SME data");
		}
	}, []);

	return (
		<SMEContext.Provider value={{ smeData, fetchSMEData, smeDataError }}>
			{children}
		</SMEContext.Provider>
	);
};

export const useSME = (): SMEContextType => {
	const context = useContext(SMEContext);
	if (!context) {
		throw new Error("useSME must be used within a SMEProvider");
	}
	return context;
};
