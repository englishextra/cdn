/*!
 * modified for babel Draggabilly PACKAGED v2.1.1
 * Make that shiz draggable
 * draggabilly.desandro.com
 * MIT license
 * removed jQuery support
 * removed AMD, CommonJS support
 * exposed as window property
 * passes jshint
 */
;(function (window, factory) {
	if (typeof define == 'function' && define.amd) {
		define('jquery-bridget/jquery-bridget', ['jquery'], function (jQuery) {
			factory(window, jQuery);
		});
	} else if (typeof module == 'object' && module.exports) {
		module.exports = factory(window, require('jquery'));
	} else {
		window.jQueryBridget = factory(window, window.jQuery);
	}
}
	(window, function factory(window, jQuery) {
		var arraySlice = Array.prototype.slice;
		var console = window.console;
		var logError = typeof console == 'undefined' ? function () {}
		 : function (message) {
			console.error(message);
		};
		function jQueryBridget(namespace, PluginClass, $) {
			$ = $ || jQuery || window.jQuery;
			if (!$) {
				return;
			}
			if (!PluginClass.prototype.option) {
				PluginClass.prototype.option = function (opts) {
					if (!$.isPlainObject(opts)) {
						return;
					}
					this.options = $.extend(true, this.options, opts);
				};
			}
			$.fn[namespace] = function (arg0) {
				if (typeof arg0 == 'string') {
					var args = arraySlice.call(arguments, 1);
					return methodCall(this, arg0, args);
				}
				plainCall(this, arg0);
				return this;
			};
			function methodCall($elems, methodName, args) {
				var returnValue;
				var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';
				$elems.each(function (i, elem) {
					var instance = $.data(elem, namespace);
					if (!instance) {
						logError(namespace + ' not initialized. Cannot call methods, i.e. ' + pluginMethodStr);
						return;
					}
					var method = instance[methodName];
					if (!method || methodName.charAt(0) == '_') {
						logError(pluginMethodStr + ' is not a valid method');
						return;
					}
					var value = method.apply(instance, args);
					returnValue = returnValue === undefined ? value : returnValue;
				});
				return returnValue !== undefined ? returnValue : $elems;
			}
			function plainCall($elems, options) {
				$elems.each(function (i, elem) {
					var instance = $.data(elem, namespace);
					if (instance) {
						instance.option(options);
						instance._init();
					} else {
						instance = new PluginClass(elem, options);
						$.data(elem, namespace, instance);
					}
				});
			}
			updateJQuery($);
		}
		function updateJQuery($) {
			if (!$ || ($ && $.bridget)) {
				return;
			}
			$.bridget = jQueryBridget;
		}
		updateJQuery(jQuery || window.jQuery);
		return jQueryBridget;
	}));
(function (window, factory) {
	if (typeof define == 'function' && define.amd) {
		define('get-size/get-size', [], function () {
			return factory();
		});
	} else if (typeof module == 'object' && module.exports) {
		module.exports = factory();
	} else {
		window.getSize = factory();
	}
})(window, function factory() {
	function getStyleSize(value) {
		var num = parseFloat(value);
		var isValid = value.indexOf('%') == -1 && !isNaN(num);
		return isValid && num;
	}
	function noop() {}
	var logError = typeof console == 'undefined' ? noop : function (message) {
		console.error(message);
	};
	var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];
	var measurementsLength = measurements.length;
	function getZeroSize() {
		var size = {
			width: 0,
			height: 0,
			innerWidth: 0,
			innerHeight: 0,
			outerWidth: 0,
			outerHeight: 0
		};
		for (var i = 0; i < measurementsLength; i++) {
			var measurement = measurements[i];
			size[measurement] = 0;
		}
		return size;
	}
	function getStyle(elem) {
		var style = getComputedStyle(elem);
		if (!style) {
			logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See http://bit.ly/getsizebug1');
		}
		return style;
	}
	var isSetup = false;
	var isBoxSizeOuter;
	function setup() {
		if (isSetup) {
			return;
		}
		isSetup = true;
		var div = document.createElement('div');
		div.style.width = '200px';
		div.style.padding = '1px 2px 3px 4px';
		div.style.borderStyle = 'solid';
		div.style.borderWidth = '1px 2px 3px 4px';
		div.style.boxSizing = 'border-box';
		var body = document.body || document.documentElement;
		body.appendChild(div);
		var style = getStyle(div);
		getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200;
		body.removeChild(div);
	}
	function getSize(elem) {
		setup();
		if (typeof elem == 'string') {
			elem = document.querySelector(elem);
		}
		if (!elem || typeof elem != 'object' || !elem.nodeType) {
			return;
		}
		var style = getStyle(elem);
		if (style.display == 'none') {
			return getZeroSize();
		}
		var size = {};
		size.width = elem.offsetWidth;
		size.height = elem.offsetHeight;
		var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';
		for (var i = 0; i < measurementsLength; i++) {
			var measurement = measurements[i];
			var value = style[measurement];
			var num = parseFloat(value);
			size[measurement] = !isNaN(num) ? num : 0;
		}
		var paddingWidth = size.paddingLeft + size.paddingRight;
		var paddingHeight = size.paddingTop + size.paddingBottom;
		var marginWidth = size.marginLeft + size.marginRight;
		var marginHeight = size.marginTop + size.marginBottom;
		var borderWidth = size.borderLeftWidth + size.borderRightWidth;
		var borderHeight = size.borderTopWidth + size.borderBottomWidth;
		var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
		var styleWidth = getStyleSize(style.width);
		if (styleWidth !== false) {
			size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
		}
		var styleHeight = getStyleSize(style.height);
		if (styleHeight !== false) {
			size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
		}
		size.innerWidth = size.width - (paddingWidth + borderWidth);
		size.innerHeight = size.height - (paddingHeight + borderHeight);
		size.outerWidth = size.width + marginWidth;
		size.outerHeight = size.height + marginHeight;
		return size;
	}
	return getSize;
});
(function (global, factory) {
	if (typeof define == 'function' && define.amd) {
		define('ev-emitter/ev-emitter', factory);
	} else if (typeof module == 'object' && module.exports) {
		module.exports = factory();
	} else {
		global.EvEmitter = factory();
	}
}
	(typeof window != 'undefined' ? window : this, function () {
		function EvEmitter() {}
		var proto = EvEmitter.prototype;
		proto.on = function (eventName, listener) {
			if (!eventName || !listener) {
				return;
			}
			var events = this._events = this._events || {};
			var listeners = events[eventName] = events[eventName] || [];
			if (listeners.indexOf(listener) == -1) {
				listeners.push(listener);
			}
			return this;
		};
		proto.once = function (eventName, listener) {
			if (!eventName || !listener) {
				return;
			}
			this.on(eventName, listener);
			var onceEvents = this._onceEvents = this._onceEvents || {};
			var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
			onceListeners[listener] = true;
			return this;
		};
		proto.off = function (eventName, listener) {
			var listeners = this._events && this._events[eventName];
			if (!listeners || !listeners.length) {
				return;
			}
			var index = listeners.indexOf(listener);
			if (index != -1) {
				listeners.splice(index, 1);
			}
			return this;
		};
		proto.emitEvent = function (eventName, args) {
			var listeners = this._events && this._events[eventName];
			if (!listeners || !listeners.length) {
				return;
			}
			var i = 0;
			var listener = listeners[i];
			args = args || [];
			var onceListeners = this._onceEvents && this._onceEvents[eventName];
			while (listener) {
				var isOnce = onceListeners && onceListeners[listener];
				if (isOnce) {
					this.off(eventName, listener);
					delete onceListeners[listener];
				}
				listener.apply(this, args);
				i += isOnce ? 0 : 1;
				listener = listeners[i];
			}
			return this;
		};
		return EvEmitter;
	}));
(function (window, factory) {
	if (typeof define == 'function' && define.amd) {
		define('unipointer/unipointer', ['ev-emitter/ev-emitter'], function (EvEmitter) {
			return factory(window, EvEmitter);
		});
	} else if (typeof module == 'object' && module.exports) {
		module.exports = factory(window, require('ev-emitter'));
	} else {
		window.Unipointer = factory(window, window.EvEmitter);
	}
}
	(window, function factory(window, EvEmitter) {
		function noop() {}
		function Unipointer() {}
		var proto = Unipointer.prototype = Object.create(EvEmitter.prototype);
		proto.bindStartEvent = function (elem) {
			this._bindStartEvent(elem, true);
		};
		proto.unbindStartEvent = function (elem) {
			this._bindStartEvent(elem, false);
		};
		proto._bindStartEvent = function (elem, isBind) {
			isBind = isBind === undefined ? true : !!isBind;
			var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
			if (window.navigator.pointerEnabled) {
				elem[bindMethod]('pointerdown', this);
			} else if (window.navigator.msPointerEnabled) {
				elem[bindMethod]('MSPointerDown', this);
			} else {
				elem[bindMethod]('mousedown', this);
				elem[bindMethod]('touchstart', this);
			}
		};
		proto.handleEvent = function (event) {
			var method = 'on' + event.type;
			if (this[method]) {
				this[method](event);
			}
		};
		proto.getTouch = function (touches) {
			for (var i = 0; i < touches.length; i++) {
				var touch = touches[i];
				if (touch.identifier == this.pointerIdentifier) {
					return touch;
				}
			}
		};
		proto.onmousedown = function (event) {
			var button = event.button;
			if (button && (button !== 0 && button !== 1)) {
				return;
			}
			this._pointerDown(event, event);
		};
		proto.ontouchstart = function (event) {
			this._pointerDown(event, event.changedTouches[0]);
		};
		proto.onMSPointerDown = proto.onpointerdown = function (event) {
			this._pointerDown(event, event);
		};
		proto._pointerDown = function (event, pointer) {
			if (this.isPointerDown) {
				return;
			}
			this.isPointerDown = true;
			this.pointerIdentifier = pointer.pointerId !== undefined ? pointer.pointerId : pointer.identifier;
			this.pointerDown(event, pointer);
		};
		proto.pointerDown = function (event, pointer) {
			this._bindPostStartEvents(event);
			this.emitEvent('pointerDown', [event, pointer]);
		};
		var postStartEvents = {
			mousedown: ['mousemove', 'mouseup'],
			touchstart: ['touchmove', 'touchend', 'touchcancel'],
			pointerdown: ['pointermove', 'pointerup', 'pointercancel'],
			MSPointerDown: ['MSPointerMove', 'MSPointerUp', 'MSPointerCancel']
		};
		proto._bindPostStartEvents = function (event) {
			if (!event) {
				return;
			}
			var events = postStartEvents[event.type];
			events.forEach(function (eventName) {
				window.addEventListener(eventName, this);
			}, this);
			this._boundPointerEvents = events;
		};
		proto._unbindPostStartEvents = function () {
			if (!this._boundPointerEvents) {
				return;
			}
			this._boundPointerEvents.forEach(function (eventName) {
				window.removeEventListener(eventName, this);
			}, this);
			delete this._boundPointerEvents;
		};
		proto.onmousemove = function (event) {
			this._pointerMove(event, event);
		};
		proto.onMSPointerMove = proto.onpointermove = function (event) {
			if (event.pointerId == this.pointerIdentifier) {
				this._pointerMove(event, event);
			}
		};
		proto.ontouchmove = function (event) {
			var touch = this.getTouch(event.changedTouches);
			if (touch) {
				this._pointerMove(event, touch);
			}
		};
		proto._pointerMove = function (event, pointer) {
			this.pointerMove(event, pointer);
		};
		proto.pointerMove = function (event, pointer) {
			this.emitEvent('pointerMove', [event, pointer]);
		};
		proto.onmouseup = function (event) {
			this._pointerUp(event, event);
		};
		proto.onMSPointerUp = proto.onpointerup = function (event) {
			if (event.pointerId == this.pointerIdentifier) {
				this._pointerUp(event, event);
			}
		};
		proto.ontouchend = function (event) {
			var touch = this.getTouch(event.changedTouches);
			if (touch) {
				this._pointerUp(event, touch);
			}
		};
		proto._pointerUp = function (event, pointer) {
			this._pointerDone();
			this.pointerUp(event, pointer);
		};
		proto.pointerUp = function (event, pointer) {
			this.emitEvent('pointerUp', [event, pointer]);
		};
		proto._pointerDone = function () {
			this.isPointerDown = false;
			delete this.pointerIdentifier;
			this._unbindPostStartEvents();
			this.pointerDone();
		};
		proto.pointerDone = noop;
		proto.onMSPointerCancel = proto.onpointercancel = function (event) {
			if (event.pointerId == this.pointerIdentifier) {
				this._pointerCancel(event, event);
			}
		};
		proto.ontouchcancel = function (event) {
			var touch = this.getTouch(event.changedTouches);
			if (touch) {
				this._pointerCancel(event, touch);
			}
		};
		proto._pointerCancel = function (event, pointer) {
			this._pointerDone();
			this.pointerCancel(event, pointer);
		};
		proto.pointerCancel = function (event, pointer) {
			this.emitEvent('pointerCancel', [event, pointer]);
		};
		Unipointer.getPointerPoint = function (pointer) {
			return {
				x: pointer.pageX,
				y: pointer.pageY
			};
		};
		return Unipointer;
	}));
(function (window, factory) {
	if (typeof define == 'function' && define.amd) {
		define('unidragger/unidragger', ['unipointer/unipointer'], function (Unipointer) {
			return factory(window, Unipointer);
		});
	} else if (typeof module == 'object' && module.exports) {
		module.exports = factory(window, require('unipointer'));
	} else {
		window.Unidragger = factory(window, window.Unipointer);
	}
}
	(window, function factory(window, Unipointer) {
		function noop() {}
		function Unidragger() {}
		var proto = Unidragger.prototype = Object.create(Unipointer.prototype);
		proto.bindHandles = function () {
			this._bindHandles(true);
		};
		proto.unbindHandles = function () {
			this._bindHandles(false);
		};
		var navigator = window.navigator;
		proto._bindHandles = function (isBind) {
			isBind = isBind === undefined ? true : !!isBind;
			var binderExtra;
			if (navigator.pointerEnabled) {
				binderExtra = function (handle) {
					handle.style.touchAction = isBind ? 'none' : '';
				};
			} else if (navigator.msPointerEnabled) {
				binderExtra = function (handle) {
					handle.style.msTouchAction = isBind ? 'none' : '';
				};
			} else {
				binderExtra = noop;
			}
			var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
			for (var i = 0; i < this.handles.length; i++) {
				var handle = this.handles[i];
				this._bindStartEvent(handle, isBind);
				binderExtra(handle);
				handle[bindMethod]('click', this);
			}
		};
		proto.pointerDown = function (event, pointer) {
			if (event.target.nodeName == 'INPUT' && event.target.type == 'range') {
				this.isPointerDown = false;
				delete this.pointerIdentifier;
				return;
			}
			this._dragPointerDown(event, pointer);
			var focused = document.activeElement;
			if (focused && focused.blur) {
				focused.blur();
			}
			this._bindPostStartEvents(event);
			this.emitEvent('pointerDown', [event, pointer]);
		};
		proto._dragPointerDown = function (event, pointer) {
			this.pointerDownPoint = Unipointer.getPointerPoint(pointer);
			var canPreventDefault = this.canPreventDefaultOnPointerDown(event, pointer);
			if (canPreventDefault) {
				event.preventDefault();
			}
		};
		proto.canPreventDefaultOnPointerDown = function (event) {
			return event.target.nodeName != 'SELECT';
		};
		proto.pointerMove = function (event, pointer) {
			var moveVector = this._dragPointerMove(event, pointer);
			this.emitEvent('pointerMove', [event, pointer, moveVector]);
			this._dragMove(event, pointer, moveVector);
		};
		proto._dragPointerMove = function (event, pointer) {
			var movePoint = Unipointer.getPointerPoint(pointer);
			var moveVector = {
				x: movePoint.x - this.pointerDownPoint.x,
				y: movePoint.y - this.pointerDownPoint.y
			};
			if (!this.isDragging && this.hasDragStarted(moveVector)) {
				this._dragStart(event, pointer);
			}
			return moveVector;
		};
		proto.hasDragStarted = function (moveVector) {
			return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
		};
		proto.pointerUp = function (event, pointer) {
			this.emitEvent('pointerUp', [event, pointer]);
			this._dragPointerUp(event, pointer);
		};
		proto._dragPointerUp = function (event, pointer) {
			if (this.isDragging) {
				this._dragEnd(event, pointer);
			} else {
				this._staticClick(event, pointer);
			}
		};
		proto._dragStart = function (event, pointer) {
			this.isDragging = true;
			this.dragStartPoint = Unipointer.getPointerPoint(pointer);
			this.isPreventingClicks = true;
			this.dragStart(event, pointer);
		};
		proto.dragStart = function (event, pointer) {
			this.emitEvent('dragStart', [event, pointer]);
		};
		proto._dragMove = function (event, pointer, moveVector) {
			if (!this.isDragging) {
				return;
			}
			this.dragMove(event, pointer, moveVector);
		};
		proto.dragMove = function (event, pointer, moveVector) {
			event.preventDefault();
			this.emitEvent('dragMove', [event, pointer, moveVector]);
		};
		proto._dragEnd = function (event, pointer) {
			this.isDragging = false;
			setTimeout(function () {
				delete this.isPreventingClicks;
			}
				.bind(this));
			this.dragEnd(event, pointer);
		};
		proto.dragEnd = function (event, pointer) {
			this.emitEvent('dragEnd', [event, pointer]);
		};
		proto.onclick = function (event) {
			if (this.isPreventingClicks) {
				event.preventDefault();
			}
		};
		proto._staticClick = function (event, pointer) {
			if (this.isIgnoringMouseUp && event.type == 'mouseup') {
				return;
			}
			var nodeName = event.target.nodeName;
			if (nodeName == 'INPUT' || nodeName == 'TEXTAREA') {
				event.target.focus();
			}
			this.staticClick(event, pointer);
			if (event.type != 'mouseup') {
				this.isIgnoringMouseUp = true;
				setTimeout(function () {
					delete this.isIgnoringMouseUp;
				}
					.bind(this), 400);
			}
		};
		proto.staticClick = function (event, pointer) {
			this.emitEvent('staticClick', [event, pointer]);
		};
		Unidragger.getPointerPoint = Unipointer.getPointerPoint;
		return Unidragger;
	}));
(function (window, factory) {
	if (typeof define == 'function' && define.amd) {
		define(['get-size/get-size', 'unidragger/unidragger'], function (getSize, Unidragger) {
			return factory(window, getSize, Unidragger);
		});
	} else if (typeof module == 'object' && module.exports) {
		module.exports = factory(window, require('get-size'), require('unidragger'));
	} else {
		window.Draggabilly = factory(window, window.getSize, window.Unidragger);
	}
}
	(window, function factory(window, getSize, Unidragger) {
		var document = window.document;
		function noop() {}
		function extend(a, b) {
			for (var prop in b) {
				if (b.hasOwnProperty(prop)) {
					a[prop] = b[prop];
				}
			}
			return a;
		}
		function isElement(obj) {
			return obj instanceof HTMLElement;
		}
		var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
		var lastTime = 0;
		if (!requestAnimationFrame) {
			requestAnimationFrame = function (callback) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = setTimeout(callback, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}
		var docElem = document.documentElement;
		var transformProperty = typeof docElem.style.transform == 'string' ? 'transform' : 'WebkitTransform';
		var jQuery = window.jQuery;
		function Draggabilly(element, options) {
			this.element = typeof element == 'string' ? document.querySelector(element) : element;
			if (jQuery) {
				this.$element = jQuery(this.element);
			}
			this.options = extend({}, this.constructor.defaults);
			this.option(options);
			this._create();
		}
		var proto = Draggabilly.prototype = Object.create(Unidragger.prototype);
		Draggabilly.defaults = {};
		proto.option = function (opts) {
			extend(this.options, opts);
		};
		var positionValues = {
			relative: true,
			absolute: true,
			fixed: true
		};
		proto._create = function () {
			this.position = {};
			this._getPosition();
			this.startPoint = {
				x: 0,
				y: 0
			};
			this.dragPoint = {
				x: 0,
				y: 0
			};
			this.startPosition = extend({}, this.position);
			var style = getComputedStyle(this.element);
			if (!positionValues[style.position]) {
				this.element.style.position = 'relative';
			}
			this.enable();
			this.setHandles();
		};
		proto.setHandles = function () {
			this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element];
			this.bindHandles();
		};
		proto.dispatchEvent = function (type, event, args) {
			var emitArgs = [event].concat(args);
			this.emitEvent(type, emitArgs);
			var jQuery = window.jQuery;
			if (jQuery && this.$element) {
				if (event) {
					var $event = jQuery.Event(event);
					$event.type = type;
					this.$element.trigger($event, args);
				} else {
					this.$element.trigger(type, args);
				}
			}
		};
		proto._getPosition = function () {
			var style = getComputedStyle(this.element);
			var x = this._getPositionCoord(style.left, 'width');
			var y = this._getPositionCoord(style.top, 'height');
			this.position.x = isNaN(x) ? 0 : x;
			this.position.y = isNaN(y) ? 0 : y;
			this._addTransformPosition(style);
		};
		proto._getPositionCoord = function (styleSide, measure) {
			if (styleSide.indexOf('%') != -1) {
				var parentSize = getSize(this.element.parentNode);
				return !parentSize ? 0 : (parseFloat(styleSide) / 100) * parentSize[measure];
			}
			return parseInt(styleSide, 10);
		};
		proto._addTransformPosition = function (style) {
			var transform = style[transformProperty];
			if (transform.indexOf('matrix') !== 0) {
				return;
			}
			var matrixValues = transform.split(',');
			var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
			var translateX = parseInt(matrixValues[xIndex], 10);
			var translateY = parseInt(matrixValues[xIndex + 1], 10);
			this.position.x += translateX;
			this.position.y += translateY;
		};
		proto.pointerDown = function (event, pointer) {
			this._dragPointerDown(event, pointer);
			var focused = document.activeElement;
			if (focused && focused.blur && focused != document.body) {
				focused.blur();
			}
			this._bindPostStartEvents(event);
			this.element.classList.add('is-pointer-down');
			this.dispatchEvent('pointerDown', event, [pointer]);
		};
		proto.pointerMove = function (event, pointer) {
			var moveVector = this._dragPointerMove(event, pointer);
			this.dispatchEvent('pointerMove', event, [pointer, moveVector]);
			this._dragMove(event, pointer, moveVector);
		};
		proto.dragStart = function (event, pointer) {
			if (!this.isEnabled) {
				return;
			}
			this._getPosition();
			this.measureContainment();
			this.startPosition.x = this.position.x;
			this.startPosition.y = this.position.y;
			this.setLeftTop();
			this.dragPoint.x = 0;
			this.dragPoint.y = 0;
			this.element.classList.add('is-dragging');
			this.dispatchEvent('dragStart', event, [pointer]);
			this.animate();
		};
		proto.measureContainment = function () {
			var containment = this.options.containment;
			if (!containment) {
				return;
			}
			var container = isElement(containment) ? containment : typeof containment == 'string' ? document.querySelector(containment) : this.element.parentNode;
			var elemSize = getSize(this.element);
			var containerSize = getSize(container);
			var elemRect = this.element.getBoundingClientRect();
			var containerRect = container.getBoundingClientRect();
			var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
			var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;
			var position = this.relativeStartPosition = {
				x: elemRect.left - (containerRect.left + containerSize.borderLeftWidth),
				y: elemRect.top - (containerRect.top + containerSize.borderTopWidth)
			};
			this.containSize = {
				width: (containerSize.width - borderSizeX) - position.x - elemSize.width,
				height: (containerSize.height - borderSizeY) - position.y - elemSize.height
			};
		};
		proto.dragMove = function (event, pointer, moveVector) {
			if (!this.isEnabled) {
				return;
			}
			var dragX = moveVector.x;
			var dragY = moveVector.y;
			var grid = this.options.grid;
			var gridX = grid && grid[0];
			var gridY = grid && grid[1];
			dragX = applyGrid(dragX, gridX);
			dragY = applyGrid(dragY, gridY);
			dragX = this.containDrag('x', dragX, gridX);
			dragY = this.containDrag('y', dragY, gridY);
			dragX = this.options.axis == 'y' ? 0 : dragX;
			dragY = this.options.axis == 'x' ? 0 : dragY;
			this.position.x = this.startPosition.x + dragX;
			this.position.y = this.startPosition.y + dragY;
			this.dragPoint.x = dragX;
			this.dragPoint.y = dragY;
			this.dispatchEvent('dragMove', event, [pointer, moveVector]);
		};
		function applyGrid(value, grid, method) {
			method = method || 'round';
			return grid ? Math[method](value / grid) * grid : value;
		}
		proto.containDrag = function (axis, drag, grid) {
			if (!this.options.containment) {
				return drag;
			}
			var measure = axis == 'x' ? 'width' : 'height';
			var rel = this.relativeStartPosition[axis];
			var min = applyGrid(-rel, grid, 'ceil');
			var max = this.containSize[measure];
			max = applyGrid(max, grid, 'floor');
			return Math.min(max, Math.max(min, drag));
		};
		proto.pointerUp = function (event, pointer) {
			this.element.classList.remove('is-pointer-down');
			this.dispatchEvent('pointerUp', event, [pointer]);
			this._dragPointerUp(event, pointer);
		};
		proto.dragEnd = function (event, pointer) {
			if (!this.isEnabled) {
				return;
			}
			if (transformProperty) {
				this.element.style[transformProperty] = '';
				this.setLeftTop();
			}
			this.element.classList.remove('is-dragging');
			this.dispatchEvent('dragEnd', event, [pointer]);
		};
		proto.animate = function () {
			if (!this.isDragging) {
				return;
			}
			this.positionDrag();
			var _this = this;
			requestAnimationFrame(function animateFrame() {
				_this.animate();
			});
		};
		proto.setLeftTop = function () {
			this.element.style.left = this.position.x + 'px';
			this.element.style.top = this.position.y + 'px';
		};
		proto.positionDrag = function () {
			this.element.style[transformProperty] = 'translate3d( ' + this.dragPoint.x + 'px, ' + this.dragPoint.y + 'px, 0)';
		};
		proto.staticClick = function (event, pointer) {
			this.dispatchEvent('staticClick', event, [pointer]);
		};
		proto.enable = function () {
			this.isEnabled = true;
		};
		proto.disable = function () {
			this.isEnabled = false;
			if (this.isDragging) {
				this.dragEnd();
			}
		};
		proto.destroy = function () {
			this.disable();
			this.element.style[transformProperty] = '';
			this.element.style.left = '';
			this.element.style.top = '';
			this.element.style.position = '';
			this.unbindHandles();
			if (this.$element) {
				this.$element.removeData('draggabilly');
			}
		};
		proto._init = noop;
		if (jQuery && jQuery.bridget) {
			jQuery.bridget('draggabilly', Draggabilly);
		}
		return Draggabilly;
	}));
