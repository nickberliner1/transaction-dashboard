import { Request, Response, NextFunction } from "express";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { unauthorized } from "@hapi/boom";
import { SECRET_KEY } from "src/constants";
import users from "src/data/users.json";

const login = async (req: Request, res: Response, next: NextFunction) => {
	const email = req.body.email;
	const password = req.body.password;
	const INCORRECT_LOGIN = "Incorrect login or password";

	try {
		const user = users.find((user) => user.email === email);

		if (!user || !compareSync(password, user.password)) {
			throw unauthorized(INCORRECT_LOGIN);
		}

		const { password: userPassword, ...userData } = user;
		const token = jwt.sign({ userData }, SECRET_KEY, {
			expiresIn: "1d",
		});

		res.status(200).json({ token });
		console.log("Login successful", token);
	} catch (error) {
		next(error);
	}
};

export const AuthController = {
	login,
};
