import React from "react";
import Router from "./Router";
import { AuthProvider } from "./contexts";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router />
		</AuthProvider>
	);
};

export default App;
