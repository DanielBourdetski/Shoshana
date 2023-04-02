export {};

function resOk<TRes, TErr>(result : TRes) : Optional<TRes, TErr> {
    return {ok : true, result};
}

function resErr<TRes, TErr>(error : TErr) : Optional<TRes, TErr> {
    return {ok : false, error};
}

declare global {
    type Optional<TRes, TErr> = {
        ok : true,
        result : TRes
    } | {
        ok : false,
        error : TErr
    };

    function resOk<TRes, TErr>(result : TRes) : Optional<TRes, TErr>
    function resErr<TRes, TErr>(error : TErr) : Optional<TRes, TErr>
}