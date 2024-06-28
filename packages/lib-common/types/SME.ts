export interface SME {
	id: string;
	legalName: string;
}

export interface SMEContextType {
	smeData: SME | null;
	fetchSMEData: (smeId: string) => Promise<void>;
	smeDataError?: string | null;
}
