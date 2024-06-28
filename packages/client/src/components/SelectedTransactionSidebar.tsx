import React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Button,
	Avatar,
	Alert,
	Snackbar,
} from "@mui/material";
import { SelectedTransaction } from "../../../lib-common/types";
import { useTheme } from "@mui/material/styles";
import { useUsers } from "../contexts/UsersContext";

const SelectedTransactionSidebar: React.FC<SelectedTransaction> = ({
	transaction,
	onClose,
}) => {
	const theme = useTheme();
	const { getUserById, userDataError } = useUsers();

	const responsibleUser = getUserById(transaction.userId);

	const formatDate = (dateTimeString: string) => {
		const dateTime = new Date(dateTimeString);
		const formattedDate = `${dateTime
			.getDate()
			.toString()
			.padStart(2, "0")}.${(dateTime.getMonth() + 1)
			.toString()
			.padStart(2, "0")}.${dateTime.getFullYear()}`;

		const formattedTime = `${dateTime
			.getHours()
			.toString()
			.padStart(2, "0")}:${dateTime
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;

		return `${formattedDate} ${formattedTime}`;
	};

	const formatValue = (value: string, currency: string) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
		}).format(parseFloat(value));
	};

	return (
		<div className="fixed inset-0 flex justify-end z-50">
			<div
				className="absolute inset-0 bg-[rgba(0,0,0,0.7)]"
				onClick={onClose}
			/>

			<Card
				className="relative w-full md:w-1/3 lg:w-1/4 h-full bg-white dark:bg-gray-800 p-4 shadow-lg rounded-l-xl"
				sx={{
					border: `1px solid ${theme.palette.borderColor}`,
				}}
			>
				<div className="flex flex-col items-center">
					<Avatar
						src={transaction.merchantIconUrl}
						alt={transaction.merchantName}
						className="w-20 h-20 mb-4"
					/>

					<CardHeader
						title="Transaction Details"
						className="p-0 mb-4"
					/>
				</div>

				<CardContent>
					<div className="mb-4">
						<Typography variant="body1">
							<strong>Merchant Name:</strong>{" "}
							{transaction.merchantName}
						</Typography>
					</div>
					<div className="mb-4">
						<Typography variant="body1">
							<strong>Responsible User:</strong>{" "}
							{responsibleUser ? (
								responsibleUser.name
							) : (
								<Snackbar
									open={!!userDataError}
									anchorOrigin={{
										vertical: "top",
										horizontal: "center",
									}}
								>
									<Alert severity="error">
										{userDataError}
									</Alert>
								</Snackbar>
							)}
						</Typography>
					</div>
					<div className="mb-4">
						<Typography variant="body1">
							<strong>Status:</strong> {transaction.status}
						</Typography>
					</div>
					<div className="mb-4">
						<Typography variant="body1">
							<strong>Date:</strong>{" "}
							{formatDate(transaction.transactionTime)}
						</Typography>
					</div>
					<div className="mb-4">
						<Typography variant="body1">
							<strong>Value:</strong>{" "}
							{formatValue(
								transaction.amount,
								transaction.currency
							)}
						</Typography>
					</div>
				</CardContent>

				<Button
					variant="contained"
					onClick={onClose}
					className="mt-4 mb-2"
				>
					Close
				</Button>
			</Card>
		</div>
	);
};

export default SelectedTransactionSidebar;
