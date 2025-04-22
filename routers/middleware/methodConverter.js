function methodConverter(req,res,next) {
    if (!(req.body && req.body._method)) {
        next();
        return;
    }
    req.method = req.body._method;
    next();
}

module.exports = methodConverter;