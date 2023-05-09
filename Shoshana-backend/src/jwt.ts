import { Option, none, some } from "topkek-utils";
import { createHmac } from "node:crypto";

export type TokenPayload<T> = {
	data: T;
	issueDate: string;
};

/**
 * @param token bearer token, not parsed.
 * @return if parsed successfully returns the token playload, else returns error string.
 * @example varifyJWTToken<{username: string}>("1asd123.1231dasd.12312edasd");
 */
export function verifyJWTToken<T>(
	token: string
): Option<TokenPayload<T>, string> {
	let [headerBase64, payloadBase64, signature] = token.split(".");

	if (!(headerBase64 && payloadBase64 && signature))
		none("bad token segments");

	const trueSignature = createHmac("sha256", secret)
		.update(headerBase64 + "." + payloadBase64)
		.digest("hex");

	if (trueSignature !== signature) return none("bad signature");

	let header: any = JSON.parse(
		Buffer.from(headerBase64, "base64").toString("ascii")
	);
	// console.log(header);
	// if (header.alg !== "HS256" || header.typ !== "JWT") return optErr("algorythm not supported segment");

	let payload: TokenPayload<T> = JSON.parse(
		Buffer.from(payloadBase64, "base64").toString("ascii")
	) as TokenPayload<T>;
	// console.log(payload);
	// if (!payload.data || !payload.issueDate) return optErr("bad token data");

	return some(payload);
}

const jwtHeaderBase64 = Buffer.from(
	JSON.stringify({
		alg: "HS256",
		typ: "JWT",
	})
).toString("base64");

// @TODO check how to generate better secret
const secret = "this is bad secret";

/**
 * @param data additional playload data for the token.
 * @returns jwt bearer token.
 */
export function generateJWTToken<T>(data: T): string {
	let payload = Buffer.from(
		JSON.stringify({
			data,
			issueDate: "some date",
		})
	).toString("base64");

	let token = jwtHeaderBase64 + "." + payload;

	const tokenSecret = createHmac("sha256", secret)
		.update(token)
		.digest("hex");

	token += "." + tokenSecret;

	return token;
}
