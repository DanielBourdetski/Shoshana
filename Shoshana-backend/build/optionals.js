"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resErrNon = exports.resErr = exports.resOk = void 0;
function resOk(result) {
    return { ok: true, result };
}
exports.resOk = resOk;
function resErr(error) {
    return { ok: false, error };
}
exports.resErr = resErr;
function resErrNon() {
    return { ok: false, error: undefined };
}
exports.resErrNon = resErrNon;
