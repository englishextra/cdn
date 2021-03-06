/*!
Copyright (C) 2013-2015 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

/* jshint ignore:start */
(function (window) {
	'use strict';
	function createDocumentFragment() {
		return document.createDocumentFragment();
	}
	function createElement(nodeName) {
		return document.createElement(nodeName);
	}
	function enoughArguments(length, name) {
		if (!length)
			throw new Error('Failed to construct ' +
				name + ': 1 argument required, but only 0 present.');
	}
	function mutationMacro(nodes) {
		if (nodes.length === 1) {
			return textNodeIfString(nodes[0]);
		}
		for (var
			fragment = createDocumentFragment(), list = slice.call(nodes), i = 0; i < nodes.length; i++) {
			fragment.appendChild(textNodeIfString(list[i]));
		}
		return fragment;
	}
	function textNodeIfString(node) {
		return typeof node === 'string' ? document.createTextNode(node) : node;
	}
	for (var
		head, property, TemporaryPrototype, TemporaryTokenList, wrapVerifyToken, document = window.document, hOP = Object.prototype.hasOwnProperty, defineProperty = Object.defineProperty || function (object, property, descriptor) {
		if (hOP.call(descriptor, 'value')) {
			object[property] = descriptor.value;
		} else {
			if (hOP.call(descriptor, 'get'))
				object.__defineGetter__(property, descriptor.get);
				if (hOP.call(descriptor, 'set'))
					object.__defineSetter__(property, descriptor.set);
			}
			return object;
		}, indexOf = [].indexOf || function indexOf(value) {
			var length = this.length;
			while (length--) {
				if (this[length] === value) {
					break;
				}
			}
			return length;
		}, verifyToken = function (token) {
			if (!token) {
				throw 'SyntaxError';
			} else if (spaces.test(token)) {
				throw 'InvalidCharacterError';
			}
			return token;
		}, DOMTokenList = function (node) {
			var
			noClassName = typeof node.className === 'undefined',
			className = noClassName ? (node.getAttribute('class') || '') : node.className,
			isSVG = noClassName || typeof className === 'object',
			value = (isSVG ? (noClassName ? className : className.baseVal) : className).replace(trim, '');
			if (value.length) {
				properties.push.apply(this, value.split(spaces));
			}
			this._isSVG = isSVG;
			this._ = node;
		}, classListDescriptor = {
				get: function get() {
					return new DOMTokenList(this);
				},
				set: function () {}
			}, uid = 'dom4-tmp-'.concat(Math.random() * +new Date()).replace('.', '-'), trim = /^\s+|\s+$/g, spaces = /\s+/, SPACE = '\x20', CLASS_LIST = 'classList', toggle = function toggle(token, force) {
			if (this.contains(token)) {
				if (!force) {
					this.remove(token);
				}
			} else if (force === undefined || force) {
				force = true;
				this.add(token);
			}
			return !!force;
		}, DocumentFragmentPrototype = window.DocumentFragment && DocumentFragment.prototype, Node = window.Node, NodePrototype = (Node || Element).prototype, CharacterData = window.CharacterData || Node, CharacterDataPrototype = CharacterData && CharacterData.prototype, DocumentType = window.DocumentType, DocumentTypePrototype = DocumentType && DocumentType.prototype, ElementPrototype = (window.Element || Node || window.HTMLElement).prototype, HTMLSelectElement = window.HTMLSelectElement || createElement('select').constructor, selectRemove = HTMLSelectElement.prototype.remove, ShadowRoot = window.ShadowRoot, SVGElement = window.SVGElement, idSpaceFinder = / /g, idSpaceReplacer = '\\ ', createQueryMethod = function (methodName) {
			var createArray = methodName === 'querySelectorAll';
			return function (css) {
				var a,
				i,
				id,
				query,
				nl,
				selectors,
				node = this.parentNode;
				if (node) {
					for (id = this.getAttribute('id') || uid, query = id === uid ? id : id.replace(idSpaceFinder, idSpaceReplacer), selectors = css.split(','), i = 0; i < selectors.length; i++) {
						selectors[i] = '#' + query + ' ' + selectors[i];
					}
					css = selectors.join(',');
				}
				if (id === uid)
					this.setAttribute('id', id);
				nl = (node || this)[methodName](css);
				if (id === uid)
					this.removeAttribute('id');
				if (createArray) {
					i = nl.length;
					a = new Array(i);
					while (i--)
						a[i] = nl[i];
				} else {
					a = nl;
				}
				return a;
			};
		}, addQueryAndAll = function (where) {
			if (!('query' in where)) {
				where.query = ElementPrototype.query;
			}
			if (!('queryAll' in where)) {
				where.queryAll = ElementPrototype.queryAll;
			}
		}, properties = ['matches', (ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.khtmlMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.msMatchesSelector || ElementPrototype.oMatchesSelector || function matches(selector) {
					var parentNode = this.parentNode;
					return !!parentNode && -1 < indexOf.call(parentNode.querySelectorAll(selector), this);
				}), 'closest', function closest(selector) {
					var parentNode = this,
					matches;
					while ((matches = parentNode && parentNode.matches) && !parentNode.matches(selector)) {
						parentNode = parentNode.parentNode;
					}
					return matches ? parentNode : null;
				}, 'prepend', function prepend() {
					var firstChild = this.firstChild,
					node = mutationMacro(arguments);
					if (firstChild) {
						this.insertBefore(node, firstChild);
					} else {
						this.appendChild(node);
					}
				}, 'append', function append() {
					this.appendChild(mutationMacro(arguments));
				}, 'before', function before() {
					var parentNode = this.parentNode;
					if (parentNode) {
						parentNode.insertBefore(mutationMacro(arguments), this);
					}
				}, 'after', function after() {
					var parentNode = this.parentNode,
					nextSibling = this.nextSibling,
					node = mutationMacro(arguments);
					if (parentNode) {
						if (nextSibling) {
							parentNode.insertBefore(node, nextSibling);
						} else {
							parentNode.appendChild(node);
						}
					}
				}, 'replace', function replace() {
					this.replaceWith.apply(this, arguments);
				}, 'replaceWith', function replaceWith() {
					var parentNode = this.parentNode;
					if (parentNode) {
						parentNode.replaceChild(mutationMacro(arguments), this);
					}
				}, 'remove', function remove() {
					var parentNode = this.parentNode;
					if (parentNode) {
						parentNode.removeChild(this);
					}
				}, 'query', createQueryMethod('querySelector'), 'queryAll', createQueryMethod('querySelectorAll')], slice = properties.slice, i = properties.length; i; i -= 2) {
			property = properties[i - 2];
			if (!(property in ElementPrototype)) {
				ElementPrototype[property] = properties[i - 1];
			}
			if (property === 'remove') {
				HTMLSelectElement.prototype[property] = function () {
					return 0 < arguments.length ? selectRemove.apply(this, arguments) : ElementPrototype.remove.call(this);
				};
			}
			if (/^(?:before|after|replace|replaceWith|remove)$/.test(property)) {
				if (CharacterData && !(property in CharacterDataPrototype)) {
					CharacterDataPrototype[property] = properties[i - 1];
				}
				if (DocumentType && !(property in DocumentTypePrototype)) {
					DocumentTypePrototype[property] = properties[i - 1];
				}
			}
			if (/^(?:append|prepend)$/.test(property)) {
				if (DocumentFragmentPrototype) {
					if (!(property in DocumentFragmentPrototype)) {
						DocumentFragmentPrototype[property] = properties[i - 1];
					}
				} else {
					try {
						createDocumentFragment().constructor.prototype[property] = properties[i - 1];
					} catch (o_O) {}
				}
			}
		}
	addQueryAndAll(document);
	if (DocumentFragmentPrototype) {
		addQueryAndAll(DocumentFragmentPrototype);
	} else {
		try {
			addQueryAndAll(createDocumentFragment().constructor.prototype);
		} catch (o_O) {}
	}
	if (ShadowRoot) {
		addQueryAndAll(ShadowRoot.prototype);
	}
	if (!createElement('a').matches('a')) {
		ElementPrototype[property] = function (matches) {
			return function (selector) {
				return matches.call(this.parentNode ? this : createDocumentFragment().appendChild(this), selector);
			};
		}
		(ElementPrototype[property]);
	}
	DOMTokenList.prototype = {
		length: 0,
		add: function add() {
			for (var j = 0, token; j < arguments.length; j++) {
				token = arguments[j];
				if (!this.contains(token)) {
					properties.push.call(this, property);
				}
			}
			if (this._isSVG) {
				this._.setAttribute('class', '' + this);
			} else {
				this._.className = '' + this;
			}
		},
		contains: (function (indexOf) {
			return function contains(token) {
				i = indexOf.call(this, property = verifyToken(token));
				return -1 < i;
			};
		}
			([].indexOf || function (token) {
				i = this.length;
				while (i-- && this[i] !== token) {}
				return i;
			})),
		item: function item(i) {
			return this[i] || null;
		},
		remove: function remove() {
			for (var j = 0, token; j < arguments.length; j++) {
				token = arguments[j];
				if (this.contains(token)) {
					properties.splice.call(this, i, 1);
				}
			}
			if (this._isSVG) {
				this._.setAttribute('class', '' + this);
			} else {
				this._.className = '' + this;
			}
		},
		toggle: toggle,
		toString: function toString() {
			return properties.join.call(this, SPACE);
		}
	};
	if (SVGElement && !(CLASS_LIST in SVGElement.prototype)) {
		defineProperty(SVGElement.prototype, CLASS_LIST, classListDescriptor);
	}
	if (!(CLASS_LIST in document.documentElement)) {
		defineProperty(ElementPrototype, CLASS_LIST, classListDescriptor);
	} else {
		TemporaryTokenList = createElement('div')[CLASS_LIST];
		TemporaryTokenList.add('a', 'b', 'a');
		if ('a\x20b' != TemporaryTokenList) {
			TemporaryPrototype = TemporaryTokenList.constructor.prototype;
			if (!('add' in TemporaryPrototype)) {
				TemporaryPrototype = window.TemporaryTokenList.prototype;
			}
			wrapVerifyToken = function (original) {
				return function () {
					var i = 0;
					while (i < arguments.length) {
						original.call(this, arguments[i++]);
					}
				};
			};
			TemporaryPrototype.add = wrapVerifyToken(TemporaryPrototype.add);
			TemporaryPrototype.remove = wrapVerifyToken(TemporaryPrototype.remove);
			TemporaryPrototype.toggle = toggle;
		}
	}
	if (!('contains' in NodePrototype)) {
		defineProperty(NodePrototype, 'contains', {
			value: function (el) {
				while (el && el !== this)
					el = el.parentNode;
				return this === el;
			}
		});
	}
	if (!('head' in document)) {
		defineProperty(document, 'head', {
			get: function () {
				return head || (head = document.getElementsByTagName('head')[0]);
			}
		});
	}
	(function () {
		for (var
			raf, rAF = window.requestAnimationFrame, cAF = window.cancelAnimationFrame, prefixes = ['o', 'ms', 'moz', 'webkit'], i = prefixes.length; !cAF && i--; ) {
			rAF = rAF || window[prefixes[i] + 'RequestAnimationFrame'];
			cAF = window[prefixes[i] + 'CancelAnimationFrame'] || window[prefixes[i] + 'CancelRequestAnimationFrame'];
		}
		if (!cAF) {
			if (rAF) {
				raf = rAF;
				rAF = function (callback) {
					var goOn = true;
					raf(function () {
						if (goOn)
							callback.apply(this, arguments);
					});
					return function () {
						goOn = false;
					};
				};
				cAF = function (id) {
					id();
				};
			} else {
				rAF = function (callback) {
					return setTimeout(callback, 15, 15);
				};
				cAF = function (id) {
					clearTimeout(id);
				};
			}
		}
		window.requestAnimationFrame = rAF;
		window.cancelAnimationFrame = cAF;
	})();
	try {
		new window.CustomEvent('?');
	} catch (o_O) {
		window.CustomEvent = function (eventName, defaultInitDict) {
			function CustomEvent(type, eventInitDict) {
				var event = document.createEvent(eventName);
				if (typeof type != 'string') {
					throw new Error('An event name must be provided');
				}
				if (eventName == 'Event') {
					event.initCustomEvent = initCustomEvent;
				}
				if (eventInitDict == null) {
					eventInitDict = defaultInitDict;
				}
				event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
				return event;
			}
			function initCustomEvent(type, bubbles, cancelable, detail) {
				this.initEvent(type, bubbles, cancelable);
				this.detail = detail;
			}
			return CustomEvent;
		}
		(window.CustomEvent ? 'CustomEvent' : 'Event', {
			bubbles: false,
			cancelable: false,
			detail: null
		});
	}
	try {
		new Event('_');
	} catch (o_O) {
		o_O = (function ($Event) {
			function Event(type, init) {
				enoughArguments(arguments.length, 'Event');
				var out = document.createEvent('Event');
				if (!init)
					init = {};
				out.initEvent(type, !!init.bubbles, !!init.cancelable);
				return out;
			}
			Event.prototype = $Event.prototype;
			return Event;
		}
			(window.Event || function Event() {}));
		defineProperty(window, 'Event', {
			value: o_O
		});
		if (Event !== o_O)
			Event = o_O;
	}
	try {
		new KeyboardEvent('_', {});
	} catch (o_O) {
		o_O = (function ($KeyboardEvent) {
			var
			initType = 0,
			defaults = {
				char: '',
				key: '',
				location: 0,
				ctrlKey: false,
				shiftKey: false,
				altKey: false,
				metaKey: false,
				altGraphKey: false,
				repeat: false,
				locale: navigator.language,
				detail: 0,
				bubbles: false,
				cancelable: false,
				keyCode: 0,
				charCode: 0,
				which: 0
			},
			eventType;
			try {
				var e = document.createEvent('KeyboardEvent');
				e.initKeyboardEvent('keyup', false, false, window, '+', 3, true, false, true, false, false);
				initType = ((e.keyIdentifier || e.key) == '+' && (e.keyLocation || e.location) == 3) && (e.ctrlKey ? e.altKey ? 1 : 3 : e.shiftKey ? 2 : 4) || 9;
			} catch (o_O) {}
			eventType = 0 < initType ? 'KeyboardEvent' : 'Event';
			function getModifier(init) {
				for (var
					out = [], keys = ['ctrlKey', 'Control', 'shiftKey', 'Shift', 'altKey', 'Alt', 'metaKey', 'Meta', 'altGraphKey', 'AltGraph'], i = 0; i < keys.length; i += 2) {
					if (init[keys[i]])
						out.push(keys[i + 1]);
				}
				return out.join(' ');
			}
			function withDefaults(target, source) {
				for (var key in source) {
					if (source.hasOwnProperty(key) && !source.hasOwnProperty.call(target, key))
						target[key] = source[key];
				}
				return target;
			}
			function withInitValues(key, out, init) {
				try {
					out[key] = init[key];
				} catch (o_O) {}
			}
			function KeyboardEvent(type, init) {
				enoughArguments(arguments.length, 'KeyboardEvent');
				init = withDefaults(init || {}, defaults);
				var
				out = document.createEvent(eventType),
				ctrlKey = init.ctrlKey,
				shiftKey = init.shiftKey,
				altKey = init.altKey,
				metaKey = init.metaKey,
				altGraphKey = init.altGraphKey,
				modifiers = initType > 3 ? getModifier(init) : null,
				key = String(init.key),
				chr = String(init.char),
				location = init.location,
				keyCode = init.keyCode || ((init.keyCode = key) && key.charCodeAt(0)) || 0,
				charCode = init.charCode || ((init.charCode = chr) && chr.charCodeAt(0)) || 0,
				bubbles = init.bubbles,
				cancelable = init.cancelable,
				repeat = init.repeat,
				locale = init.locale,
				view = init.view || window,
				args;
				if (!init.which)
					init.which = init.keyCode;
				if ('initKeyEvent' in out) {
					out.initKeyEvent(type, bubbles, cancelable, view, ctrlKey, altKey, shiftKey, metaKey, keyCode, charCode);
				} else if (0 < initType && 'initKeyboardEvent' in out) {
					args = [type, bubbles, cancelable, view];
					switch (initType) {
					case 1:
						args.push(key, location, ctrlKey, shiftKey, altKey, metaKey, altGraphKey);
						break;
					case 2:
						args.push(ctrlKey, altKey, shiftKey, metaKey, keyCode, charCode);
						break;
					case 3:
						args.push(key, location, ctrlKey, altKey, shiftKey, metaKey, altGraphKey);
						break;
					case 4:
						args.push(key, location, modifiers, repeat, locale);
						break;
					default:
						args.push(char, key, location, modifiers, repeat, locale);
					}
					out.initKeyboardEvent.apply(out, args);
				} else {
					out.initEvent(type, bubbles, cancelable);
				}
				for (key in out) {
					if (defaults.hasOwnProperty(key) && out[key] !== init[key]) {
						withInitValues(key, out, init);
					}
				}
				return out;
			}
			KeyboardEvent.prototype = $KeyboardEvent.prototype;
			return KeyboardEvent;
		}
			(window.KeyboardEvent || function KeyboardEvent() {}));
		defineProperty(window, 'KeyboardEvent', {
			value: o_O
		});
		if (KeyboardEvent !== o_O)
			KeyboardEvent = o_O;
	}
	try {
		new MouseEvent('_', {});
	} catch (o_O) {
		o_O = (function ($MouseEvent) {
			function MouseEvent(type, init) {
				enoughArguments(arguments.length, 'MouseEvent');
				var out = document.createEvent('MouseEvent');
				if (!init)
					init = {};
				out.initMouseEvent(type, !!init.bubbles, !!init.cancelable, init.view || window, init.detail || 1, init.screenX || 0, init.screenY || 0, init.clientX || 0, init.clientY || 0, !!init.ctrlKey, !!init.altKey, !!init.shiftKey, !!init.metaKey, init.button || 0, init.relatedTarget || null);
				return out;
			}
			MouseEvent.prototype = $MouseEvent.prototype;
			return MouseEvent;
		}
			(window.MouseEvent || function MouseEvent() {}));
		defineProperty(window, 'MouseEvent', {
			value: o_O
		});
		if (MouseEvent !== o_O)
			MouseEvent = o_O;
	}
}
	(window));
(function (global) {
	'use strict';
	var DOMMap = global.WeakMap || (function () {
			var
			counter = 0,
			dispatched = false,
			drop = false,
			value;
			function dispatch(key, ce, shouldDrop) {
				drop = shouldDrop;
				dispatched = false;
				value = undefined;
				key.dispatchEvent(ce);
			}
			function Handler(value) {
				this.value = value;
			}
			Handler.prototype.handleEvent = function handleEvent(e) {
				dispatched = true;
				if (drop) {
					e.currentTarget.removeEventListener(e.type, this, false);
				} else {
					value = this.value;
				}
			};
			function DOMMap() {
				counter++;
				this.__ce__ = new Event(('@DOMMap:' + counter) + Math.random());
			}
			DOMMap.prototype = {
				'constructor': DOMMap,
				'delete': function del(key) {
					return dispatch(key, this.__ce__, true),
					dispatched;
				},
				'get': function get(key) {
					dispatch(key, this.__ce__, false);
					var v = value;
					value = undefined;
					return v;
				},
				'has': function has(key) {
					return dispatch(key, this.__ce__, false),
					dispatched;
				},
				'set': function set(key, value) {
					dispatch(key, this.__ce__, true);
					key.addEventListener(this.__ce__.type, new Handler(value), false);
					return this;
				},
			};
			return DOMMap;
		}
			());
	function Dict() {}
	Dict.prototype = (Object.create || Object)(null);
	function createEventListener(type, callback, options) {
		function eventListener(e) {
			if (eventListener.once) {
				e.currentTarget.removeEventListener(e.type, callback, eventListener);
				eventListener.removed = true;
			}
			if (eventListener.passive) {
				e.preventDefault = createEventListener.preventDefault;
			}
			if (typeof eventListener.callback === 'function') {
				eventListener.callback.call(this, e);
			} else if (eventListener.callback) {
				eventListener.callback.handleEvent(e);
			}
			if (eventListener.passive) {
				delete e.preventDefault;
			}
		}
		eventListener.type = type;
		eventListener.callback = callback;
		eventListener.capture = !!options.capture;
		eventListener.passive = !!options.passive;
		eventListener.once = !!options.once;
		eventListener.removed = false;
		return eventListener;
	}
	createEventListener.preventDefault = function preventDefault() {};
	var
	Event = global.CustomEvent,
	hOP = Object.prototype.hasOwnProperty,
	dE = global.dispatchEvent,
	aEL = global.addEventListener,
	rEL = global.removeEventListener,
	counter = 0,
	increment = function () {
		counter++;
	},
	indexOf = [].indexOf || function indexOf(value) {
		var length = this.length;
		while (length--) {
			if (this[length] === value) {
				break;
			}
		}
		return length;
	},
	getListenerKey = function (options) {
		return ''.concat(options.capture ? '1' : '0', options.passive ? '1' : '0', options.once ? '1' : '0');
	},
	augment,
	proto;
	try {
		aEL('_', increment, {
			once: true
		});
		dE(new Event('_'));
		dE(new Event('_'));
		rEL('_', increment, {
			once: true
		});
	} catch (o_O) {}
	if (counter !== 1) {
		(function () {
			var dm = new DOMMap();
			function createAEL(aEL) {
				return function addEventListener(type, handler, options) {
					if (options && typeof options !== 'boolean') {
						var
						info = dm.get(this),
						key = getListenerKey(options),
						i,
						tmp,
						wrap;
						if (!info)
							dm.set(this, (info = new Dict()));
						if (!(type in info))
							info[type] = {
								handler: [],
								wrap: []
							};
						tmp = info[type];
						i = indexOf.call(tmp.handler, handler);
						if (i < 0) {
							i = tmp.handler.push(handler) - 1;
							tmp.wrap[i] = (wrap = new Dict());
						} else {
							wrap = tmp.wrap[i];
						}
						if (!(key in wrap)) {
							wrap[key] = createEventListener(type, handler, options);
							aEL.call(this, type, wrap[key], wrap[key].capture);
						}
					} else {
						aEL.call(this, type, handler, options);
					}
				};
			}
			function createREL(rEL) {
				return function removeEventListener(type, handler, options) {
					if (options && typeof options !== 'boolean') {
						var
						info = dm.get(this),
						key,
						i,
						tmp,
						wrap;
						if (info && (type in info)) {
							tmp = info[type];
							i = indexOf.call(tmp.handler, handler);
							if (-1 < i) {
								key = getListenerKey(options);
								wrap = tmp.wrap[i];
								if (key in wrap) {
									rEL.call(this, type, wrap[key], wrap[key].capture);
									delete wrap[key];
									for (key in wrap)
										return;
									tmp.handler.splice(i, 1);
									tmp.wrap.splice(i, 1);
									if (tmp.handler.length === 0)
										delete info[type];
								}
							}
						}
					} else {
						rEL.call(this, type, handler, options);
					}
				};
			}
			augment = function (Constructor) {
				if (!Constructor)
					return;
				var proto = Constructor.prototype;
				proto.addEventListener = createAEL(proto.addEventListener);
				proto.removeEventListener = createREL(proto.removeEventListener);
			};
			if (global.EventTarget) {
				augment(EventTarget);
			} else {
				augment(global.Text);
				augment(global.Element || global.HTMLElement);
				augment(global.HTMLDocument);
				augment(global.Window || {
					prototype: global
				});
				augment(global.XMLHttpRequest);
			}
		}
			());
	}
}
	(self));
/* jshint ignore:end */
