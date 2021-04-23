"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCorsHeaders = void 0;
const defaults = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
    allowedHeaders: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
};
function isString(s) {
    return typeof s === 'string' || s instanceof String;
}
const isOriginAllowed = (origin, allowedOrigin) => {
    if (Array.isArray(allowedOrigin)) {
        for (var i = 0; i < allowedOrigin.length; ++i) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
            }
        }
        return false;
    }
    else if (isString(allowedOrigin)) {
        return origin === allowedOrigin;
    }
    else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
    }
    else {
        return !!allowedOrigin;
    }
};
const configureOrigin = (options, event) => {
    const { origin } = options;
    const headers = [];
    if (origin === true || origin === '*') {
        headers.push({
            key: 'Access-Control-Allow-Origin',
            value: '*'
        });
    }
    else if (isString(origin)) {
        headers.push({
            key: 'Access-Control-Allow-Origin',
            value: origin
        }, {
            key: 'Vary',
            value: 'Origin'
        });
    }
    else if (typeof origin === 'function') {
        headers.push({
            key: 'Access-Control-Allow-Origin',
            value: origin(event)
        }, {
            key: 'Vary',
            value: 'Origin'
        });
    }
    else {
        const requestOrigin = event.headers.origin;
        const isAllowed = isOriginAllowed(requestOrigin, origin);
        headers.push({
            key: 'Access-Control-Allow-Origin',
            value: isAllowed ? requestOrigin : false
        }, {
            key: 'Vary',
            value: 'Origin'
        });
    }
    return headers;
};
const configureMethods = (options) => {
    const { methods } = options;
    return [{
            key: 'Access-Control-Allow-Methods',
            value: Array.isArray(methods) ? methods.join(',') : methods
        }];
};
const configureAllowedHeaders = (options, event) => {
    let { allowedHeaders } = options;
    const headers = [];
    if (!allowedHeaders) {
        allowedHeaders = event.headers['Access-Control-Request-Headers'];
        headers.push({
            key: 'Vary',
            value: 'Access-Control-Request-Headers'
        });
    }
    else if (Array.isArray(allowedHeaders)) {
        allowedHeaders = allowedHeaders.join(',');
    }
    if (allowedHeaders && allowedHeaders.length) {
        headers.push({
            key: 'Access-Control-Allow-Headers',
            value: allowedHeaders
        });
    }
    return headers;
};
const configureExposedHeaders = (options) => {
    let { exposedHeaders } = options;
    if (!exposedHeaders) {
        return [];
    }
    else if (Array.isArray(exposedHeaders)) {
        exposedHeaders = exposedHeaders.join(',');
    }
    if (exposedHeaders) {
        return [{
                key: 'Access-Control-Expose-Headers',
                value: exposedHeaders
            }];
    }
    return [];
};
const configureAllowMaxAge = (options) => {
    const { maxAge } = options;
    return !maxAge ? [] : [
        {
            key: 'Access-Control-Max-Age',
            value: `${maxAge}`
        }
    ];
};
const configureCredentials = (options) => {
    const { credentials } = options;
    return credentials === true
        ? [{
                key: 'Access-Control-Allow-Credentials',
                value: 'true'
            }] : [];
};
const generateHeaders = (headersArray) => {
    const vary = [];
    const headers = {};
    headersArray.forEach((header) => {
        header.forEach((h) => {
            if (h.key === 'Vary' && h.value) {
                vary.push(h.value);
            }
            else {
                headers[h.key] = h.value;
            }
        });
    });
    return Object.assign(Object.assign({}, headers), (vary.length && { 'Vary': vary.join(',') }));
};
const addCorsHeaders = (options, event) => {
    if (options === false) {
        return {};
    }
    const corsOptions = Object.assign({}, defaults, typeof options === 'object' ? options : {});
    return generateHeaders([
        configureOrigin(corsOptions, event),
        configureExposedHeaders(corsOptions),
        configureCredentials(corsOptions),
        configureMethods(corsOptions),
        configureAllowedHeaders(corsOptions, event),
        configureAllowMaxAge(corsOptions)
    ]);
};
exports.addCorsHeaders = addCorsHeaders;
