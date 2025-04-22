

function formatQuery(req,res,next) {
    if (!req.query || Object.entries(req.query).length == 0) {
        next();
        return;
    }
    
    // const url = req.url
    //     .replaceAll("=",'="')
    //     .replaceAll('&', '"&')+'"';
    // req.url = url;

    req.newQuery = {};

    for (const key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key)) {
            const value = req.query[key];
            req.newQuery[key] = stringify(value);
            
        }
    }

    
    
    
    
    next(); 
}


function stringify(str) {
    return '"'+str+'"';
}

module.exports = formatQuery;