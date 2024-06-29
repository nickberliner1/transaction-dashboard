import { UserData } from "./User";

export interface AuthContextType {
	isAuthenticated: boolean;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export interface DecodedToken {
	exp: number;
	userData: UserData;
}
