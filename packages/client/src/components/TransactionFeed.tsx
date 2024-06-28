import React, { useState } from "react";
import { useTransactions } from "../contexts/TransactionsContext";
import {
	Alert,
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Snackbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UsersProvider } from "../contexts";
import SelectedTransactionSidebar from "./SelectedTransactionSidebar";
import { Transaction } from "../../../lib-common/types";

const TransactionFeed: React.FC = () => {
	const { transactions, transactionDataError } = useTransactions();
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);
	const [filter, setFilter] = useState<string>("");

	const filteredTransactions = Array.isArray(transactions)
		? transactions.filter((tx) => !filter || tx.status === filter)
		: [];

	const theme = useTheme();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return `${date.getDate().toString().padStart(2, "0")}.${(
			date.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}.${date.getFullYear()}`;
	};

	const formatValue = (value: string, currency: string) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
		}).format(parseFloat(value));
	};

	const handleTransactionClick = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
	};

	const handleCloseModal = () => {
		setSelectedTransaction(null);
	};

	return (
		<div className="flex flex-col md:flex-row">
			<div className="flex-1 md:w-1/2">
				<FormControl variant="outlined" sx={{ minWidth: "10rem" }}>
					<InputLabel id="status-filter-label">Status</InputLabel>
					<Select
						labelId="status-filter-label"
						className="mb-5"
						id="status-filter"
						value={filter}
						onChange={(e) => setFilter(e.target.value as string)}
						label="Status"
					>
						<MenuItem value="">All</MenuItem>
						<MenuItem value="PENDING">Pending</MenuItem>
						<MenuItem value="COMPLETED">Completed</MenuItem>
						<MenuItem value="REJECTED">Rejected</MenuItem>
					</Select>
				</FormControl>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{transactionDataError ? (
						<Snackbar
							open={!!transactionDataError}
							anchorOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
						>
							<Alert severity="error">
								{transactionDataError}
							</Alert>
						</Snackbar>
					) : (
						filteredTransactions?.map((tx) => (
							<Card
								key={tx.id}
								onClick={() => handleTransactionClick(tx)}
								className={`mb-4 ${
									!selectedTransaction && "cursor-pointer"
								} transition-shadow duration-200`}
								sx={{
									borderRadius: "1rem",
									border: `1px solid ${theme.palette.borderColor}`,
									":hover": {
										boxShadow: theme.palette.hoverShadow,
									},
								}}
							>
								<CardHeader
									avatar={
										<Avatar
											src={tx.merchantIconUrl}
											alt={tx.merchantName}
										/>
									}
									title={tx.merchantName}
									subheader={tx.status}
								/>
								<CardContent>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										{formatDate(tx.transactionTime)}
									</Typography>
									<Typography variant="h6">
										{formatValue(tx.amount, tx.currency)}
									</Typography>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</div>

			{selectedTransaction && (
				<UsersProvider>
					<SelectedTransactionSidebar
						transaction={selectedTransaction}
						onClose={handleCloseModal}
					/>
				</UsersProvider>
			)}
		</div>
	);
};

export default TransactionFeed;
