/*!
 * modified Echo.js, simple JavaScript image lazy loading
 * added option to specify data attribute and img class
 * @see {@link https://toddmotto.com/echo-js-simple-javascript-image-lazy-loading/}
 * @see {@link https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection}
 * forced passive event listener if supported
 * passes jshint
 */
(function (root, document) {
	"use strict";
	var echo = function (imgClass, dataAttributeName, throttleRate) {
		var _imgClass = imgClass || "data-src-img";
		var _dataAttributeName = dataAttributeName || "src";
		var _throttleRate = throttleRate || 100;
		var _addEventListener = "addEventListener";
		var classList = "classList";
		var dataset = "dataset";
		var defineProperty = "defineProperty";
		var documentElement = "documentElement";
		var getAttribute = "getAttribute";
		var getBoundingClientRect = "getBoundingClientRect";
		var getElementsByClassName = "getElementsByClassName";
		var _length = "length";
		var Echo = function (elem) {
			var _this = this;
			_this.elem = elem;
			_this.render();
			_this.listen();
		};
		var isBindedEchoClass = "is-binded-echo";
		var isBindedEcho = (function () {
			return document[documentElement][classList].contains(isBindedEchoClass) || "";
		})();
		var echoStore = [];
		var scrolledIntoView = function (element) {
			var coords = element[getBoundingClientRect]();
			return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (root.innerHeight || document[documentElement].clientHeight));
		};
		var echoSrc = function (img, callback) {
			img.src = img[dataset][_dataAttributeName] || img[getAttribute]("data-" + _dataAttributeName);
			if (callback) {
				callback();
			}
		};
		var removeEcho = function (element, index) {
			if (echoStore.indexOf(element) !== -1) {
				echoStore.splice(index, 1);
			}
		};
		var echoImageAll = function () {
			for (var i = 0; i < echoStore[_length]; i++) {
				var self = echoStore[i];
				if (scrolledIntoView(self)) {
					echoSrc(self, removeEcho(self, i));
				}
			}
		};
		var throttle = function (func, wait) {
			var ctx;
			var args;
			var rtn;
			var timeoutID;
			var last = 0;
			function call() {
				timeoutID = 0;
				last = +new Date();
				rtn = func.apply(ctx, args);
				ctx = null;
				args = null;
			}
			return function throttled() {
				ctx = this;
				args = arguments;
				var delta = new Date() - last;
				if (!timeoutID) {
					if (delta >= wait) {
						call();
					} else {
						timeoutID = setTimeout(call, wait - delta);
					}
				}
				return rtn;
			};
		};
		var throttleEchoImageAll = throttle(echoImageAll, _throttleRate);
		var supportsPassive = (function () {
				var support = false;
				try {
					var opts = Object[defineProperty] && Object[defineProperty]({}, "passive", {
							get: function () {
								support = true;
							}
						});
					root[_addEventListener]("test", function () {}, opts);
				} catch (err) {}
				return support;
			})();
		Echo.prototype = {
			init: function () {
				echoStore.push(this.elem);
			},
			render: function () {
				echoImageAll();
			},
			listen: function () {
				if (!isBindedEcho) {
					root[_addEventListener]("scroll", throttleEchoImageAll, supportsPassive ? {passive: true} : false);
					document[documentElement][classList].add(isBindedEchoClass);
				}
			}
		};
		var lazyImgs = document[getElementsByClassName](_imgClass) || "";
		var walkLazyImageAll = function () {
			for (var i = 0; i < lazyImgs[_length]; i++) {
				new Echo(lazyImgs[i]).init();
			}
		};
		if (lazyImgs) {
			walkLazyImageAll();
		}
	};
	root.echo = echo;
})("undefined" !== typeof window ? window : this, document);
