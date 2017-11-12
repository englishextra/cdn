/*jslint browser: true */
/*jslint node: true */
/*global global, ActiveXObject, define, escape, module, pnotify, Proxy, jQuery, require, self, setImmediate, window */
/*!
 * modified Evento - v1.0.0
 * by Erik Royall <erikroyalL@hotmail.com> (http://erikroyall.github.io)
 * Dual licensed under MIT and GPL
 * identifier needs binding if its function has arguments
 * var fn=function(a){a=a||"";if(a){return a;}};
 * evento.add(window,"load",fn.bind(null,some_value));
 * removed Array.prototype.indexOf shim
 * removed Helio stuff which seems to be added
 * for some other library, and works without Helio
 * @see {@link https://jsbin.com/jilevi/edit?html,js,output}
 * @see {@link https://jsfiddle.net/englishextra/hLxyvmcm/}
 * exposed as window property
 * @see {@link https://gist.github.com/erikroyall/6618740}
 * @see {@link https://gist.github.com/englishextra/3a959e4da0fcc268b140}
 * passes jshint
 */
(function (root) {
	"use strict";
	var evento = (function () {
		var win = window,
		doc = win.document,
		_handlers = {},
		addEvent,
		removeEvent,
		triggerEvent;
		addEvent = (function () {
			if (typeof doc.addEventListener === "function") {
				return function (el, evt, fn) {
					el.addEventListener(evt, fn, false);
					_handlers[el] = _handlers[el] || {};
					_handlers[el][evt] = _handlers[el][evt] || [];
					_handlers[el][evt].push(fn);
				};
			} else if (typeof doc.attachEvent === "function") {
				return function (el, evt, fn) {
					el.attachEvent(evt, fn);
					_handlers[el] = _handlers[el] || {};
					_handlers[el][evt] = _handlers[el][evt] || [];
					_handlers[el][evt].push(fn);
				};
			} else {
				return function (el, evt, fn) {
					el["on" + evt] = fn;
					_handlers[el] = _handlers[el] || {};
					_handlers[el][evt] = _handlers[el][evt] || [];
					_handlers[el][evt].push(fn);
				};
			}
		}
			());
		removeEvent = (function () {
			if (typeof doc.removeEventListener === "function") {
				return function (el, evt, fn) {
					el.removeEventListener(evt, fn, false);
				};
			} else if (typeof doc.detachEvent === "function") {
				return function (el, evt, fn) {
					el.detachEvent(evt, fn);
				};
			} else {
				return function (el, evt, fn) {
					el["on" + evt] = undefined;
				};
			}
		}
			());
		triggerEvent = function (el, evt) {
			_handlers[el] = _handlers[el] || {};
			_handlers[el][evt] = _handlers[el][evt] || [];
			for (var _i = 0, _l = _handlers[el][evt].length; _i < _l; _i += 1) {
				_handlers[el][evt][_i]();
			}
		};
		return {
			add: addEvent,
			remove: removeEvent,
			trigger: triggerEvent,
			_handlers: _handlers
		};
	}
		());
	root.evento = evento;
})("undefined" !== typeof window ? window : this);
