function buildUrl(baseUrl, path, params = {}) {
    var relativePath = path;
    
    // auto-append forward slash to beginning if not provided
    if (relativePath.length > 0 && relativePath.charAt(0) != "/") {    
        relativePath = "/" + relativePath;
    }

    const paramQuery = urlEncodedQueryParameters(params);

    let url = `${baseUrl}${relativePath}`;

    if (paramQuery) {
        url += `?${paramQuery}`;
    } 

    return url;
}

function urlEncodedQueryParameters(params) {
    let query = false;

    Object.getOwnPropertyNames(params).forEach((key, index) => {
        const value = encodeURIComponent(params[key]);

        if (index == 0) {
            query = `${key}=${value}`;
        } else {
            query += `&${key}=${value}`;
        }
    });

    return query;
}

export {buildUrl, urlEncodedQueryParameters};