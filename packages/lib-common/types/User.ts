export interface User {
	id: string;
	name: string;
	email: string;
	profileImage: string;
	smeId: string;
}

export interface UsersContextType {
	users: User[];
	getUserById: (id: string) => User | undefined;
	userDataError?: string | null;
}

export interface UserData {
	id: string;
	smeId: string;
	name: string;
	email: string;
	profileImage: string;
}
