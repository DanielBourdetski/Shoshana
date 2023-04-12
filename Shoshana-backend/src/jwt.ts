import { Opt, OptNoErr, optErr, optErrNon, optOk } from "./optionals";
import { createHmac } from 'node:crypto';

export type Token<T> = {
    data: T,
    issueDate: string,
}

export function varifyJWTToken<T>(token: string): Opt<Token<T>, string> {

    let [headerBase64, payloadBase64, signature] = token.split('.');

    if (!(headerBase64 && payloadBase64 && signature)) optErr("bad token segments");

    const trueSignature = createHmac('sha256', secret)
        .update(headerBase64 + "." + payloadBase64)
        .digest('hex');

    if (trueSignature !== signature) return optErr("bad signature");

    let header: any = JSON.parse(Buffer.from(headerBase64, "base64").toString("ascii"));
    // console.log(header);
    // if (header.alg !== "HS256" || header.typ !== "JWT") return optErr("algorythm not supported segment");

    let payload: Token<T> = JSON.parse(Buffer.from(payloadBase64, "base64").toString("ascii")) as Token<T>;
    // console.log(payload);
    // if (!payload.data || !payload.issueDate) return optErr("bad token data");

    return optOk(payload);
}

const jwtHeaderBase64 = Buffer.from(JSON.stringify({
    alg: "HS256",
    typ: "JWT"
})).toString("base64");

const secret = 'this is bad secret';

export function generateJWTToken<T>(data: T): string {

    let payload = Buffer.from(JSON.stringify({
        data,
        issueDate: "some date"
    })).toString("base64");

    let token = jwtHeaderBase64 + "." + payload;

    const tokenSecret = createHmac('sha256', secret)
        .update(token)
        .digest('hex');

    token += "." + tokenSecret;

    return token;
}