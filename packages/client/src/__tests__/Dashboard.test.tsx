import React from "react";
import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../contexts/AuthContext";
import { useSME } from "../contexts/SMEContext";
import { TransactionsProvider } from "../contexts";
import { jwtDecode } from "jwt-decode";

jest.mock("../contexts/AuthContext");
jest.mock("../contexts/SMEContext");
jest.mock("jwt-decode");
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

describe("Dashboard Component", () => {
	const mockNavigate = jest.fn();
	const mockLogout = jest.fn();
	const mockFetchSMEData = jest.fn().mockResolvedValue({
		legalName: "Test SME",
	});

	beforeEach(() => {
		jest.clearAllMocks();
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
		(useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
		(useSME as jest.Mock).mockReturnValue({
			smeData: { legalName: "Test SME" },
			fetchSMEData: mockFetchSMEData,
		});
		(jwtDecode as jest.Mock).mockReturnValue({
			userData: {
				name: "Test User",
				profileImage: "/path/to/image",
				smeId: "test-sme-id",
			},
		});
		Object.defineProperty(window, "localStorage", {
			value: {
				getItem: jest.fn().mockImplementation((key) => {
					if (key === "authToken") return "valid-token";
					if (key === "theme") return "light";
					return null;
				}),
				setItem: jest.fn(),
			},
			writable: true,
		});
	});

	const renderWithProviders = (ui: React.ReactElement) => {
		return render(
			<Router>
				<TransactionsProvider>{ui}</TransactionsProvider>
			</Router>
		);
	};

	it("fetches and displays user data when token is present", async () => {
		await act(async () => {
			renderWithProviders(<Dashboard />);
		});
		await waitFor(() =>
			expect(mockFetchSMEData).toHaveBeenCalledWith("test-sme-id")
		);
		expect(screen.getByText(/Test User/i)).toBeInTheDocument();
		expect(screen.getByText(/Test SME/i)).toBeInTheDocument();
	});

	it("navigates to login if no token is found", async () => {
		(window.localStorage.getItem as jest.Mock).mockReturnValueOnce(null);
		await act(async () => {
			renderWithProviders(<Dashboard />);
		});
		await waitFor(() =>
			expect(mockNavigate).toHaveBeenCalledWith("/login")
		);
	});

	it("logs out and navigates to login", async () => {
		await act(async () => {
			renderWithProviders(<Dashboard />);
		});

		await waitFor(() => {
			const logoutButton = screen.getByTestId("logout-button");
			expect(logoutButton).toBeInTheDocument();
		});

		await act(async () => {
			fireEvent.click(screen.getByTestId("logout-button"));
		});

		await waitFor(() => {
			expect(mockLogout).toHaveBeenCalled();
			expect(mockNavigate).toHaveBeenCalledWith("/login");
		});
	});

	it("renders main content after loading", async () => {
		await act(async () => {
			renderWithProviders(<Dashboard />);
		});

		await waitFor(() => expect(mockFetchSMEData).toHaveBeenCalled());
		expect(screen.getByText(/transactions/i)).toBeInTheDocument();
	});
});
