/*global window */
/*!
 * ajax - v3.0.4
 * Ajax module in Vanilla JS
 * https://github.com/fdaciuk/ajax
 * Thu Oct 25 2018 15:30:50 GMT-0300 (-03)
 * MIT (c) Fernando Daciuk
 * @see {@link https://github.com/fdaciuk/ajax}
 * passes jshint
 */
(function (root) {
	"use strict";
	var hasContentType = function (headers) {
		return Object.keys(headers).some(function (name) {
			return (name.toLowerCase() === "content-type");
		});
	};
	var isObject = function (data) {
		return Object.prototype.toString.call(data) === "[object Object]";
	};
	var encode = function (value) {
		return encodeURIComponent(value);
	};
	var getQueryString = function (obj, prefix) {
		return Object.keys(obj).map(function (key) {
			if (obj.hasOwnProperty(key) && undefined !== obj[key]) {
				var val = obj[key];
				key = prefix ? prefix + "[" + key + "]" : key;
				return val !== null && typeof val === "object" ? getQueryString(val, key) : encode(key) + "=" + encode(val);
			}
		})
		.filter(Boolean)
		.join("&");
	};
	var objectToQueryString = function (data) {
		return isObject(data) ? getQueryString(data) : data;
	};
	var setHeaders = function (xhr, headers, data) {
		headers = headers || {};
		if (!hasContentType(headers)) {
			headers["Content-Type"] = isObject(data) ? "application/json" : "application/x-www-form-urlencoded";
		}
		Object.keys(headers).forEach(function (name) {
			if (headers[name]) {
				xhr.setRequestHeader(name, headers[name]);
			}
		});
	};
	var getUrlWithData = function (url, data, type) {
		if (type.toLowerCase() !== "get" || !data) {
			return url;
		}
		var dataAsQueryString = objectToQueryString(data);
		var queryStringSeparator = url.indexOf("?") > -1 ? "&" : "?";
		return url + queryStringSeparator + dataAsQueryString;
	};
	var parseResponse = function (xhr) {
		var result;
		try {
			result = JSON.parse(xhr.responseText);
		} catch (e) {
			result = xhr.responseText;
		}
		return [result, xhr];
	};
	var ready = function (promiseMethods, xhr) {
		return function handleReady() {
			if (xhr.readyState === xhr.DONE) {
				xhr.removeEventListener("readystatechange", handleReady, false);
				promiseMethods.always.apply(promiseMethods, parseResponse(xhr));
				if (xhr.status >= 200 && xhr.status < 300) {
					promiseMethods.then.apply(promiseMethods, parseResponse(xhr));
				} else {
					promiseMethods.catch .apply(promiseMethods, parseResponse(xhr));
				}
			}
		};
	};
	var xhrConnection = function (type, url, data, options) {
		var returnMethods = ["then", "catch", "always"];
		var promiseMethods = returnMethods.reduce(function (promise, method) {
				promise[method] = function (callback) {
					promise[method] = callback;
					return promise;
				};
				return promise;
			}, {});
		var xhr = new XMLHttpRequest();
		var featuredUrl = getUrlWithData(url, data, type);
		if(options.hasOwnProperty("overrideMimeType")) {
			xhr.overrideMimeType = options.overrideMimeType;
		}
		xhr.open(type, featuredUrl, true);
		xhr.withCredentials = options.hasOwnProperty("withCredentials");
		setHeaders(xhr, options.headers, data);
		xhr.addEventListener("readystatechange", ready(promiseMethods, xhr), false);
		xhr.send(isObject(data) ? JSON.stringify(data) : data);
		promiseMethods.abort = function () {
			return xhr.abort();
		};
		return promiseMethods;
	};
	var maybeData = function (data) {
		return data || null;
	};
	var ajax = function (settings) {
		var methods = ["get", "post", "put", "delete"];
		var options = settings || {};
		options.baseUrl = options.baseUrl || "";
		if (options.method && options.url) {
			return xhrConnection(
				options.method,
				options.baseUrl + options.url,
				maybeData(options.data),
				options);
		}
		return methods.reduce(function (acc, method) {
			acc[method] = function (url, data) {
				return xhrConnection(
					method,
					options.baseUrl + url,
					maybeData(data),
					options);
			};
			return acc;
		}, {});
	}
	root.ajax = ajax;
})("undefined" !== typeof window ? window : this);
/* 		ajax().get("./json/test.json").then(function (responseObject, xhr) {
			var responseText = JSON.stringify(responseObject);
			console.log(responseText);
		}); */
