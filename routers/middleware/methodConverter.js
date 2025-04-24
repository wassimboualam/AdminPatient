// this is to change the method from POST to PUT or DELETE
// or other methods that are not supported by html forms
function methodConverter(req,res,next) {
    // if request does not have a body or not a 
    // _method in said body
    if (!(req.body && req.body._method)) {
        // skip
        next();
        return;
    };
    // request method becomes req.body._method
    req.method = req.body._method;
    next();
}

module.exports = methodConverter;