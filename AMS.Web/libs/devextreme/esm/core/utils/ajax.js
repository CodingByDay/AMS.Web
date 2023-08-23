/**
 * DevExtreme (esm/core/utils/ajax.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    Deferred
} from "./deferred";
import domAdapter from "../../core/dom_adapter";
import httpRequest from "../../core/http_request";
import {
    getWindow,
    hasWindow
} from "../../core/utils/window";
var window = getWindow();
import {
    extendFromObject
} from "./extend";
import {
    isDefined
} from "./type";
import injector from "./dependency_injector";
var SUCCESS = "success";
var ERROR = "error";
var TIMEOUT = "timeout";
var NO_CONTENT = "nocontent";
var PARSER_ERROR = "parsererror";
var isStatusSuccess = function(status) {
    return 200 <= status && status < 300
};
var hasContent = function(status) {
    return 204 !== status
};
var paramsConvert = function(params) {
    var result = [];
    for (var name in params) {
        var value = params[name];
        if (void 0 === value) {
            continue
        }
        if (null === value) {
            value = ""
        }
        if ("function" === typeof value) {
            value = value()
        }
        result.push(encodeURIComponent(name) + "=" + encodeURIComponent(value))
    }
    return result.join("&")
};
var createScript = function(options) {
    var script = domAdapter.createElement("script");
    for (var name in options) {
        script[name] = options[name]
    }
    return script
};
var removeScript = function(scriptNode) {
    scriptNode.parentNode.removeChild(scriptNode)
};
var appendToHead = function(element) {
    return domAdapter.getHead().appendChild(element)
};
var evalScript = function(code) {
    var script = createScript({
        text: code
    });
    appendToHead(script);
    removeScript(script)
};
var evalCrossDomainScript = function(url) {
    var script = createScript({
        src: url
    });
    return new Promise((function(resolve, reject) {
        var events = {
            load: resolve,
            error: reject
        };
        var loadHandler = function(e) {
            events[e.type]();
            removeScript(script)
        };
        for (var event in events) {
            domAdapter.listen(script, event, loadHandler)
        }
        appendToHead(script)
    }))
};
var getAcceptHeader = function(options) {
    var dataType = options.dataType || "*";
    var scriptAccept = "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";
    var accepts = {
        "*": "*/*",
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
        jsonp: scriptAccept,
        script: scriptAccept
    };
    extendFromObject(accepts, options.accepts, true);
    return accepts[dataType] ? accepts[dataType] + ("*" !== dataType ? ", */*; q=0.01" : "") : accepts["*"]
};
var getContentTypeHeader = function(options) {
    var defaultContentType;
    if (options.data && !options.upload && "GET" !== getMethod(options)) {
        defaultContentType = "application/x-www-form-urlencoded;charset=utf-8"
    }
    return options.contentType || defaultContentType
};
var getDataFromResponse = function(xhr) {
    return xhr.responseType && "text" !== xhr.responseType || "string" !== typeof xhr.responseText ? xhr.response : xhr.responseText
};
var postProcess = function(deferred, xhr, dataType) {
    var data = getDataFromResponse(xhr);
    switch (dataType) {
        case "jsonp":
            evalScript(data);
            break;
        case "script":
            evalScript(data);
            deferred.resolve(data, SUCCESS, xhr);
            break;
        case "json":
            try {
                deferred.resolve(JSON.parse(data), SUCCESS, xhr)
            } catch (e) {
                deferred.reject(xhr, PARSER_ERROR, e)
            }
            break;
        default:
            deferred.resolve(data, SUCCESS, xhr)
    }
};
var isCrossDomain = function(url) {
    if (!hasWindow()) {
        return true
    }
    var crossDomain = false;
    var originAnchor = domAdapter.createElement("a");
    var urlAnchor = domAdapter.createElement("a");
    originAnchor.href = window.location.href;
    try {
        urlAnchor.href = url;
        urlAnchor.href = urlAnchor.href;
        crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host
    } catch (e) {
        crossDomain = true
    }
    return crossDomain
};
var setHttpTimeout = function(timeout, xhr) {
    return timeout && setTimeout((function() {
        xhr.customStatus = TIMEOUT;
        xhr.abort()
    }), timeout)
};
var getJsonpOptions = function(options) {
    if ("jsonp" === options.dataType) {
        var random = Math.random().toString().replace(/\D/g, "");
        var callbackName = options.jsonpCallback || "dxCallback" + Date.now() + "_" + random;
        var callbackParameter = options.jsonp || "callback";
        options.data = options.data || {};
        options.data[callbackParameter] = callbackName;
        return callbackName
    }
};
var getRequestOptions = function(options, headers) {
    var params = options.data;
    var paramsAlreadyString = "string" === typeof params;
    var url = options.url || window.location.href;
    if (!paramsAlreadyString && !options.cache) {
        params = params || {};
        params._ = Date.now()
    }
    if (params && !options.upload) {
        if (!paramsAlreadyString) {
            params = paramsConvert(params)
        }
        if ("GET" === getMethod(options)) {
            if ("" !== params) {
                url += (url.indexOf("?") > -1 ? "&" : "?") + params
            }
            params = null
        } else if (headers["Content-Type"] && headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
            params = params.replace(/%20/g, "+")
        }
    }
    return {
        url: url,
        parameters: params
    }
};

function getMethod(options) {
    return (options.method || "GET").toUpperCase()
}
var getRequestHeaders = function(options) {
    var headers = options.headers || {};
    headers["Content-Type"] = headers["Content-Type"] || getContentTypeHeader(options);
    headers.Accept = headers.Accept || getAcceptHeader(options);
    if (!options.crossDomain && !headers["X-Requested-With"]) {
        headers["X-Requested-With"] = "XMLHttpRequest"
    }
    return headers
};
var sendRequest = function(options) {
    var xhr = httpRequest.getXhr();
    var d = new Deferred;
    var result = d.promise();
    var async = isDefined(options.async) ? options.async : true;
    var dataType = options.dataType;
    var timeout = options.timeout || 0;
    var timeoutId;
    options.crossDomain = isCrossDomain(options.url);
    var needScriptEvaluation = "jsonp" === dataType || "script" === dataType;
    if (void 0 === options.cache) {
        options.cache = !needScriptEvaluation
    }
    var callbackName = getJsonpOptions(options);
    var headers = getRequestHeaders(options);
    var requestOptions = getRequestOptions(options, headers);
    var url = requestOptions.url;
    var parameters = requestOptions.parameters;
    if (callbackName) {
        window[callbackName] = function(data) {
            d.resolve(data, SUCCESS, xhr)
        }
    }
    if (options.crossDomain && needScriptEvaluation) {
        evalCrossDomainScript(url).then((function() {
            if ("jsonp" === dataType) {
                return
            }
            d.resolve(null, SUCCESS, xhr)
        }), (function() {
            d.reject(xhr, ERROR)
        }));
        return result
    }
    if (options.crossDomain && !("withCredentials" in xhr)) {
        d.reject(xhr, ERROR);
        return result
    }
    xhr.open(getMethod(options), url, async, options.username, options.password);
    if (async) {
        xhr.timeout = timeout;
        timeoutId = setHttpTimeout(timeout, xhr)
    }
    xhr.onreadystatechange = function(e) {
        if (4 === xhr.readyState) {
            clearTimeout(timeoutId);
            if (isStatusSuccess(xhr.status)) {
                if (hasContent(xhr.status)) {
                    postProcess(d, xhr, dataType)
                } else {
                    d.resolve(null, NO_CONTENT, xhr)
                }
            } else {
                d.reject(xhr, xhr.customStatus || ERROR)
            }
        }
    };
    if (options.upload) {
        xhr.upload.onprogress = options.upload.onprogress;
        xhr.upload.onloadstart = options.upload.onloadstart;
        xhr.upload.onabort = options.upload.onabort
    }
    if (options.xhrFields) {
        for (var field in options.xhrFields) {
            xhr[field] = options.xhrFields[field]
        }
    }
    if ("arraybuffer" === options.responseType) {
        xhr.responseType = options.responseType
    }
    for (var name in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, name) && isDefined(headers[name])) {
            xhr.setRequestHeader(name, headers[name])
        }
    }
    if (options.beforeSend) {
        options.beforeSend(xhr)
    }
    xhr.send(parameters);
    result.abort = function() {
        xhr.abort()
    };
    return result
};
export default injector({
    sendRequest: sendRequest
});
