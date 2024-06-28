export interface AuthContextType {
	isAuthenticated: boolean;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}
