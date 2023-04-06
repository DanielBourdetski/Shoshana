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

export function resOk<TResult, TError>(result : TResult) : Opt<TResult, TError> {
    return {ok : true, result};
}

export function resErr<TResult, TError>(error : TError) : Opt<TResult, TError> {
    return {ok : false, error};
}

export function resErrNon<TResult>() : OptNoErr<TResult>{
    return {ok: false, error: undefined};
}