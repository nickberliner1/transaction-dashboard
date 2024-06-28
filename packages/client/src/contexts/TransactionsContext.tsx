import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
	Transaction,
	TransactionsContextType,
} from "../../../lib-common/types";
import { useAuth } from "./AuthContext";

const TransactionsContext = createContext<TransactionsContextType | undefined>(
	undefined
);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [transactionDataError, setTransactionDataError] = useState<
		string | null
	>(null);

	const { isAuthenticated } = useAuth();

	useEffect(() => {
		const fetchTransactions = async () => {
			if (!isAuthenticated) return;
			const token = localStorage.getItem("authToken");
			try {
				setTransactionDataError(null);
				const response = await axios.get(
					`http://localhost:3000/transactions`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setTransactions(response.data.data);
			} catch (error) {
				console.error("Failed to fetch transactions", error);
				setTransactionDataError("Failed to get transactions");
			}
		};
		fetchTransactions();
	}, [isAuthenticated]);

	return (
		<TransactionsContext.Provider
			value={{ transactions, setTransactions, transactionDataError }}
		>
			{children}
		</TransactionsContext.Provider>
	);
};

export const useTransactions = (): TransactionsContextType => {
	const context = useContext(TransactionsContext);
	if (!context) {
		throw new Error(
			"useTransactions must be used within a TransactionsProvider"
		);
	}
	return context;
};
