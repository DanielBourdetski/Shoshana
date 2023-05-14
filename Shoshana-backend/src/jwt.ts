import jwt from "jsonwebtoken";

// TODO move to .env file, make it dynamic
const secret = "g+oRbMxbTrIDGX9k9wJwJxZvzQvWc0D8hhn2wakYBQk=";

type TokenData = { username: string; isAdmin?: boolean };

interface DecodedToken extends jwt.JwtPayload {
	username: string;
	userId: string;
}

// TODO use this as auth middleware
export function verifyJWTToken(token: string): {
	username: string;
	userId: string;
} {
	const decoded = jwt.verify(token, secret) as DecodedToken;
	return decoded;
}

export function generateJWTToken(data: TokenData): string {
	const payload: TokenData = { username: data.username };
	if (data.isAdmin) payload.isAdmin = data.isAdmin;

	// TODO choose and implement expiration
	const token = jwt.sign(payload, secret);

	return token;
}
