export {};

export interface OptionalType {
    ok :boolean
}

export type Opt<TResult, TError> = {
    ok : true,
    result : TResult
} | {
    ok : false,
    error : TError
};

export type OptNoErr<TResult> = Opt<TResult, undefined>;

export function optOk<TResult, TError>(result : TResult) : Opt<TResult, TError> {
    return {ok : true, result};
}

export function optErr<TResult, TError>(error : TError) : Opt<TResult, TError> {
    return {ok : false, error};
}

export function optErrNon<TResult>() : OptNoErr<TResult>{
    return {ok: false, error: undefined};
}