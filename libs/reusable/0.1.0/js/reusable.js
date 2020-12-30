/*jslint browser: true */

/*jslint node: true */

/*global ActiveXObject, addClass, findPos, toggleClass, addListener, ajaxGet,
appendFragment, console, Cookies, getByClass, embedHtmlFragment, hasClass,
imgLightbox, isNodejs, isValidId, LoadingSpinner, removeChildren,
removeElement, removeListener, isElectron, isNwjs, loadHtmlResponse,
loadJsCss, Mustache, Promise, removeClass, renderTemplate, require,
safelyParseJson, scroll2Top, setDisplayBlock, setDisplayNone, supportsPassive,
t, truncateString*/

/*property console, join, split */

(function (root, document) {
	"use strict";

	/*!
	 * safe way to handle console.log
	 * @see {@link https://github.com/paulmillr/console-polyfill}
	 */
	(function () {
		if (!root.console) {
			root.console = {};
		}
		var con = root.console;
		var prop;
		var method;
		var dummy = function () {};
		var properties = ["memory"];
		var methods = ["assert,clear,count,debug,dir,dirxml,error,exception,group,",
			"groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,",
			"show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn"
		];
		methods.join("").split(",");
		for (;(prop = properties.pop());) {
			if (!con[prop]) {
				con[prop] = {};
			}
		}
		for (;(method = methods.pop());) {
			if (!con[method]) {
				con[method] = dummy;
			}
		}
		prop = method = dummy = properties = methods = null;
	})();

	/*!
	 * supportsPassive
	 */
	root.supportsPassive = (function () {
		var support = false;
		try {
			var options = Object.defineProperty && Object.defineProperty({}, "passive", {
				get: function() {
					support = true;
				}
			});
			root.addEventListener("test", function () {}, options);
		} catch (err) {}
		return support;
	})();

	/*!
	 * supportsSvgSmilAnimation
	 */
	root.supportsSvgSmilAnimation = (function () {
		var toStringFn = {}.toString;
		return !!document.createElementNS &&
			(/SVGAnimate/).test(toStringFn.call(document.createElementNS("http://www.w3.org/2000/svg", "animate"))) || "";
	})();

	/*!
	 * supportsCanvas
	 */
	root.supportsCanvas = (function () {
		var canvas = document.createElement("canvas");
		return !!(canvas.getContext && canvas.getContext("2d"));
	})();

	/*!
	 * hasWheel
	 */
	root.hasWheel = "onwheel" in document.createElement("div") || void 0 !== document.onmousewheel || "";

	/*!
	 * hasTouch
	 */
	root.hasTouch = "ontouchstart" in document.documentElement || "";

	/*!
	 * needsPolyfills
	 */
	root.needsPolyfills = (function () {
		return !String.prototype.startsWith ||
			!supportsPassive ||
			!root.requestAnimationFrame ||
			!root.matchMedia ||
			("undefined" === typeof root.Element && !("dataset" in document.documentElement)) ||
			!("classList" in document.createElement("_")) ||
			(document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) ||
			(root.attachEvent && !root.addEventListener) ||
			!("onhashchange" in root) ||
			!Array.prototype.indexOf ||
			!root.Promise ||
			!root.fetch ||
			!document.querySelectorAll ||
			!document.querySelector ||
			!Function.prototype.bind ||
			(Object.defineProperty &&
				Object.getOwnPropertyDescriptor &&
				Object.getOwnPropertyDescriptor(Element.prototype, "textContent") &&
				!Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) ||
			!("undefined" !== typeof root.localStorage && "undefined" !== typeof root.sessionStorage) ||
			!root.WeakMap ||
			!root.MutationObserver;
	})();

	/*!
	 * getHumanDate
	 */
	root.getHumanDate = (function () {
		var newDate = (new Date());
		var newDay = newDate.getDate();
		var newYear = newDate.getFullYear();
		var newMonth = newDate.getMonth();
		(newMonth += 1);
		if (10 > newDay) {
			newDay = "0" + newDay;
		}
		if (10 > newMonth) {
			newMonth = "0" + newMonth;
		}
		return "".concat(newYear, "-", newMonth, "-", newDay);
	})();

	/*!
	 * Super-simple wrapper around addEventListener and attachEvent (old IE).
	 * Does not handle differences in the Event-objects.
	 * @see {@link https://github.com/finn-no/eventlistener}
	 */
	(function () {
		var setListener = function (standard, fallback) {
			return function (el, type, listener, useCapture) {
				if (el[standard]) {
					el[standard](type, listener, useCapture);
				} else {
					if (el[fallback]) {
						el[fallback]("on" + type, listener);
					}
				}
			};
		};
		root.addListener = setListener("addEventListener", "attachEvent");
		root.removeListener = setListener("removeEventListener", "detachEvent");
	})();

	/*!
	 * get elements by class name wrapper
	 */
	root.getByClass = function (parent, name) {
		if (!document.getElementsByClassName) {
			var children = (parent || document.body).getElementsByTagName("*"),
				elements = [],
				regx = new RegExp("\\b" + name + "\\b"),
				child;
			var i,
				l;
			for (i = 0, l = children.length; i < l; i += 1) {
				child = children[i];
				if (regx.test(child.className)) {
					elements.push(child);
				}
			}
			i = l = null;
			return elements;
		} else {
			return parent ? parent.getElementsByClassName(name) : "";
		}
	};

	/*!
	 * class list wrapper
	 */
	(function () {
		var hasClass;
		var addClass;
		var removeClass;
		if ("classList" in document.documentElement) {
			hasClass = function (el, name) {
				return el.classList.contains(name);
			};
			addClass = function (el, name) {
				el.classList.add(name);
			};
			removeClass = function (el, name) {
				el.classList.remove(name);
			};
		} else {
			hasClass = function (el, name) {
				return new RegExp("\\b" + name + "\\b").test(el.className);
			};
			addClass = function (el, name) {
				if (!hasClass(el, name)) {
					el.className += " " + name;
				}
			};
			removeClass = function (el, name) {
				el.className = el.className.replace(new RegExp("\\b" + name + "\\b", "g"), "");
			};
		}
		root.hasClass = hasClass;
		root.addClass = addClass;
		root.removeClass = removeClass;
		root.toggleClass = function (el, name) {
			if (hasClass(el, name)) {
				removeClass(el, name);
			} else {
				addClass(el, name);
			}
		};
	})();

	/*!
	 * truncateString
	 */
	root.truncateString = function (str, max, add) {
		var _add = add || "\u2026";
		return ("string" === typeof str && str.length > max ? str.substring(0, max) + _add : str);
	};

	/*!
	 * isValidId
	 */
	root.isValidId = function (id, withHash) {
		return withHash ? /^\#[A-Za-z][-A-Za-z0-9_:.]*$/.test(id) ? true : false : /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(id) ? true : false;
	};

	/*!
	 * parseLink
	 */

	/*jshint bitwise: false */
	root.parseLink = function (url, full) {
		var _full = full || "";
		var _url = encodeURI(url);
		return (function () {
			var _replace = function (s) {
				return s.replace(/^(#|\?)/, "").replace(/\:$/, "");
			};
			var _location = location || "";
			var _protocol = function (protocol) {
				switch (protocol) {
					case "http:":
						return _full ? ":" + 80 : 80;
					case "https:":
						return _full ? ":" + 443 : 443;
					default:
						return _full ? ":" + _location.port : _location.port;
				}
			};
			var _isAbsolute = (0 === url.indexOf("//") || !!~url.indexOf("://"));
			var _origin = function () {
				var c = document.createElement("a");
				c.href = _url;
				var o = c.protocol + "//" + c.hostname + (c.port ? ":" + c.port : "");
				return o || "";
			};
			var _isCrossDomain = function () {
				var _locationHref = window.location || "";
				var v = _locationHref.protocol + "//" + _locationHref.hostname + (_locationHref.port ? ":" + _locationHref.port : "");
				return v !== _origin();
			};
			var _link = document.createElement("a");
			_link.href = _url;
			return {
				href: _link.href,
				origin: _origin(),
				host: _link.host || _location.host,
				port: ("0" === _link.port || "" === _link.port) ?
					_protocol(_link.protocol) :
					(_full ? _link.port : _replace(_link.port)),
				hash: _full ? _link.hash : _replace(_link.hash),
				hostname: _link.hostname || _location.hostname,
				pathname: _link.pathname.charAt(0) !== "/" ?
					(_full ? "/" + _link.pathname : _link.pathname) :
					(_full ? _link.pathname : _link.pathname.slice(1)),
				protocol: !_link.protocol ||
					":" === _link.protocol ?
					(_full ? _location.protocol : _replace(_location.protocol)) :
					(_full ? _link.protocol : _replace(_link.protocol)),
				search: _full ? _link.search : _replace(_link.search),
				query: _full ? _link.search : _replace(_link.search),
				isAbsolute: _isAbsolute,
				isRelative: !_isAbsolute,
				isCrossDomain: _isCrossDomain(),
				hasHTTP: (/^(http|https):\/\//i).test(url) ? true : false
			};
		})();
	};
	/*jshint bitwise: true */

	/*!
	 * getHttp
	 */
	root.getHttp = (function () {
		var prot = root.location.protocol || "";
		return "http:" === prot ? "http" : "https:" === prot ? "https" : "";
	})();

	/*!
	 * throttle
	 */
	root.throttle = function (func, wait) {
		var context;
		var args;
		var fn;
		var timer;
		var last = 0;
		function call() {
			timer = 0;
			last = +new Date();
			fn = func.apply(context, args);
			context = null;
			args = null;
		}
		return function throttled() {
			context = this;
			args = arguments;
			var delta = new Date() - last;
			if (!timer) {
				if (delta >= wait) {
					call();
				} else {
					timer = setTimeout(call, wait - delta);
				}
			}
			return fn;
		};
	};

	/*!
	 * debounce
	 */
	root.debounce = function (func, wait) {
		var timer;
		var args;
		var context;
		var timestamp;
		return function debounced() {
			context = this;
			args = [].slice.call(arguments, 0);
			timestamp = new Date();
			var later = function () {
				var last = (new Date()) - timestamp;
				if (last < wait) {
					timer = setTimeout(later, wait - last);
				} else {
					timer = null;
					func.apply(context, args);
				}
			};
			if (!timer) {
				timer = setTimeout(later, wait);
			}
		};
	};

	/*!
	 * isNodejs isElectron isNwjs;
	 */
	root.isNodejs = "undefined" !== typeof process && "undefined" !== typeof require || "";
	root.isElectron = (function () {
		if (typeof root !== "undefined" &&
			typeof root.process === "object" &&
			root.process.type === "renderer") {
			return true;
		}
		if (typeof root !== "undefined" &&
			typeof root.process !== "undefined" &&
			typeof root.process.versions === "object" &&
			!!root.process.versions.electron) {
			return true;
		}
		if (typeof navigator === "object" &&
			typeof navigator.userAgent === "string" &&
			navigator.userAgent.indexOf("Electron") >= 0) {
			return true;
		}
		return false;
	})();
	root.isNwjs = (function () {
		if ("undefined" !== typeof isNodejs && isNodejs) {
			try {
				if ("undefined" !== typeof require("nw.gui")) {
					return true;
				}
			} catch (err) {
				return false;
			}
		}
		return false;
	})();

	/*!
	 * openDeviceBrowser
	 */
	root.openDeviceBrowser = function (url) {
		var onElectron = function () {
			var es = isElectron ? require("electron").shell : "";
			return es ? es.openExternal(url) : "";
		};
		var onNwjs = function () {
			var ns = isNwjs ? require("nw.gui").Shell : "";
			return ns ? ns.openExternal(url) : "";
		};
		var onLocal = function () {
			return root.open(url, "_system", "scrollbars=1,location=no");
		};
		if (isElectron) {
			onElectron();
		} else if (isNwjs) {
			onNwjs();
		} else {
			if (root.getHttp) {
				return true;
			} else {
				onLocal();
			}
		}
	};

	/*!
	 * scroll2Top
	 */
	root.scroll2Top = function (scrollTargetY, speed, easing) {
		var scrollY = root.scrollY || document.documentElement.scrollTop;
		var posY = scrollTargetY || 0;
		var rate = speed || 2000;
		var soothing = easing || "easeOutSine";
		var currentTime = 0;
		var time = Math.max(0.1, Math.min(Math.abs(scrollY - posY) / rate, 0.8));
		var easingEquations = {
			easeOutSine: function (pos) {
				return Math.sin(pos * (Math.PI / 2));
			},
			easeInOutSine: function (pos) {
				return (-0.5 * (Math.cos(Math.PI * pos) - 1));
			},
			easeInOutQuint: function (pos) {
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}
				return 0.5 * (Math.pow((pos - 2), 5) + 2);
			}
		};
		function tick() {
			currentTime += 1 / 60;
			var p = currentTime / time;
			var t = easingEquations[soothing](p);
			if (p < 1) {
				requestAnimationFrame(tick);
				root.scrollTo(0, scrollY + ((posY - scrollY) * t));
			} else {
				root.scrollTo(0, posY);
			}
		}
		tick();
	};

	/*!
	 * setDisplayBlock
	 */
	root.setDisplayBlock = function (elem) {
		return elem && (elem.style.display = "block");
	};

	/*!
	 * setDisplayNone
	 */
	root.setDisplayNone = function (elem) {
		return elem && (elem.style.display = "none");
	};

	/*!
	 * setVisible
	 */
	root.setVisible = function (elem) {
		return elem && (elem.style.visibility = "visible", elem.style.opacity = 1);
	};

	/*!
	 * prependFragment
	 */
	root.prependFragment = function (loco, car) {
		if (loco && car) {
			var parent = car.parentNode || "";
			if (parent) {
				var fragment = document.createDocumentFragment();
				if ("string" === typeof loco) {
					loco = document.createTextNode(loco);
				}
				fragment.appendChild(loco);
				parent.insertBefore(fragment, car);
			}
		}
	};

	/*!
	 * appendFragment
	 */
	root.appendFragment = function (car, loco) {
		if (car && loco) {
			var fragment = document.createDocumentFragment() || "";
			if ("string" === typeof car) {
				car = document.createTextNode(car);
			}
			fragment.appendChild(car);
			loco.appendChild(fragment);
		}
	};

	/*!
	 * removeElement
	 */
	root.removeElement = function (elem) {
		if (elem) {
			if ("undefined" !== typeof elem.remove) {
				return elem.remove();
			} else {
				return elem.parentNode && elem.parentNode.removeChild(elem);
			}
		}
	};

	/*!
	 * findPos
	 */
	root.findPos = function (elem) {
		var _elem = elem.getBoundingClientRect();
		var docElem = document.documentElement || "";
		var docBody = document.body || "";
		return {
			top: Math.round(_elem.top + (root.pageYOffset || docElem.scrollTop || docBody.scrollTop) - (docElem.clientTop || docBody.clientTop || 0)),
			left: Math.round(_elem.left + (root.pageXOffset || docElem.scrollLeft || docBody.scrollLeft) - (docElem.clientLeft || docBody.clientLeft || 0))
		};
	};

	/*!
	 * safelyParseJson
	 */
	root.safelyParseJson = function (response) {
		var isObj = function (obj) {
			var objType = typeof obj;
			return ["boolean", "number", "string", 'symbol', "function"].indexOf(objType) === -1;
		};
		if (!isObj(response)) {
			return JSON.parse(response);
		} else {
			return response;
		}
	};

	/*!
	 * isValidId
	 */
	root.isValidId = function (id, withHash) {
		return withHash ? /^\#[A-Za-z][-A-Za-z0-9_:.]*$/.test(id) ? true : false : /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(id) ? true : false;
	};

	/*!
	 * embedHtmlFragment
	 */
	root.embedHtmlFragment = function (textHtml, render, callback, useInnerHtml) {
		var _useInnerHtml = useInnerHtml || "";
		try {
			if (_useInnerHtml) {
				render.innerHTML = textHtml;
			} else {
				if (render.parentNode) {
					var cloned = render.cloneNode(false);
					if (document.createRange) {
						var range = document.createRange();
						range.selectNode(document.body);
						var fragment = range.createContextualFragment(textHtml);
						cloned.appendChild(fragment);
						render.parentNode.replaceChild(cloned, render);
					} else {
						cloned.innerHTML = textHtml;
						render.parentNode.replaceChild(document.createDocumentFragment.appendChild(cloned), render);
					}
				}
			}
			return callback && "function" === typeof callback && callback();
		} catch (err) {
			console.log(err);
		}
	};

	/*!
	 * renderTemplate
	 */
	root.renderTemplate = function (jsonObject, templateId) {
		var template = document.getElementById(templateId.replace(/^#/, "")) || "";
		var _jsonObject = safelyParseJson(jsonObject);
		if (_jsonObject && template) {
			var textHtml = template.innerHTML || "";
			if (root.t) {
				var parsedTemplate = new t(textHtml);
				return parsedTemplate.render(_jsonObject);
			} else {
				if (root.Mustache) {
					Mustache.parse(textHtml);
					return Mustache.render(textHtml, _jsonObject);
				}
			}
		}
		return "cannot renderTemplate";
	};

	/*!
	 * insertFromTemplate
	 */
	root.insertFromTemplate = function (jsonObject, templateId, renderId, callback, useInnerHtml) {
		var _callback = function () {
			return callback && "function" === typeof callback && callback();
		};
		var _useInnerHtml = useInnerHtml || "";
		var template = document.getElementById(templateId.replace(/^#/, "")) || "";
		var render = document.getElementById(renderId.replace(/^#/, "")) || "";
		if (jsonObject && template && render) {
			var textHtml = renderTemplate(jsonObject, templateId);
			embedHtmlFragment(textHtml, render, _callback, _useInnerHtml);
		}
	};

	/*!
	 * insertExternalHtml
	 * accepts external HTML url
	 * and renders text response as HTML into DOM element
	 */
	root.insertExternalHtml = function (renderId, url, callback, onFailure, useInnerHtml) {
		var _callback = function () {
			return callback && "function" === typeof callback && callback();
		};
		var _useInnerHtml = useInnerHtml || "";
		var render = document.getElementById(renderId.replace(/^#/, "")) || "";
		if (render) {
			ajaxGet(url, {
				overrideMimeType: "text/html;charset=utf-8",
				success: function (responseText) {
					embedHtmlFragment(responseText, render, _callback, _useInnerHtml);
				},
				failure: function (status) {
					return onFailure && "function" === typeof onFailure && onFailure(status);
				}
			});
		}
	};

	/*!
	 * loadHtmlFragment
	 */
	root.loadHtmlFragment = function (triggerElem, url, renderId, callback, useInnerHtml) {
		var render = document.getElementById(renderId.replace(/^#/, "")) || "";
		var processResponse = function (responseText) {
			var _callback = function () {
				if (triggerElem.parentNode) {
					setDisplayNone(triggerElem.parentNode);
					setDisplayBlock(render);
				}
				return callback && "function" === typeof callback && callback(responseText);
			};
			var _useInnerHtml = useInnerHtml || "";
			embedHtmlFragment(responseText, render, _callback, _useInnerHtml);
		};
		if (render) {
			ajaxGet(url, {
				overrideMimeType: "text/html;charset=utf-8",
				success: function (responseText) {
					processResponse(responseText);
				},
				failure: function (status) {
					console.log(status);
				}
			});
		}
	};

	/*!
	 * notiBar
	 */
	root.notiBar = function (options) {
		var docBody = document.body || "";
		var notibarClass = "notibar";
		var notibar = getByClass(document, notibarClass)[0] || "";
		var messageClass = "message";
		var closeButtonClass = "close";
		var defaultKey = "_notibar_dismiss_";
		var defaultDatum = "ok";
		var animatedClass = "animated";
		var fadeInDownClass = "fadeInDown";
		var fadeOutUpClass = "fadeOutUp";
		if ("string" === typeof options) {
			options = {
				"message": options
			};
		}
		var defaultOptions = {
			"message": "",
			"timeout": 10000,
			"key": defaultKey,
			"datum": defaultDatum,
			"days": 0
		};
		var _options = options || {};
		var key;
		for (key in defaultOptions) {
			if (defaultOptions.hasOwnProperty(key) && !_options.hasOwnProperty(key)) {
				_options[key] = defaultOptions[key];
			}
		}
		key = null;
		var cookieKey = Cookies.get(_options.key) || "";
		if (cookieKey && cookieKey === decodeURIComponent(_options.datum)) {
			return;
		}
		if (notibar) {
			removeChildren(notibar);
		} else {
			notibar = document.createElement("div");
			addClass(notibar, notibarClass);
			addClass(notibar, animatedClass);
		}
		var msgContainer = document.createElement("div");
		addClass(msgContainer, messageClass);
		var msgContent = _options.message || "";
		if ("string" === typeof msgContent) {
			msgContent = document.createTextNode(msgContent);
		}
		msgContainer.appendChild(msgContent);
		notibar.appendChild(msgContainer);
		var insertCancelSvg = function (targetObj) {
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
			svg.setAttribute("class", "ui-icon");
			use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#ui-icon-Cancel");
			svg.appendChild(use);
			targetObj.appendChild(svg);
		};
		var closeButton = document.createElement("button");
		addClass(closeButton, closeButtonClass);
		closeButton.title = "Закрыть";
		insertCancelSvg(closeButton);
		var setCookie = function () {
			if (_options.days) {
				Cookies.set(_options.key, _options.datum, {
					expires: _options.days,
					sameSite: "strict"
				});
			} else {
				Cookies.set(_options.key, _options.datum, {
					sameSite: "strict"
				});
			}
		};
		var hideMessage = function () {
			var notibar = getByClass(document, notibarClass)[0] || "";
			if (notibar) {
				removeClass(notibar, fadeInDownClass);
				addClass(notibar, fadeOutUpClass);
				removeChildren(notibar);
			}
		};
		var handleCloseButton = function () {
			removeListener(closeButton, "click", handleCloseButton);
			hideMessage();
			setCookie();
		};
		addListener(closeButton, "click", handleCloseButton);
		notibar.appendChild(closeButton);
		if (docBody) {
			appendFragment(notibar, docBody);
			removeClass(notibar, fadeOutUpClass);
			addClass(notibar, fadeInDownClass);
			var timer = setTimeout(function () {
				clearTimeout(timer);
				timer = null;
				hideMessage();
			}, _options.timeout);
		}
	};

	/*!
	 * Notifier42
	 */
	root.Notifier42 = function (message, timeout, elemClass) {
		var docBody = document.body || "";
		var _message = message || "No message passed as argument";
		var delay = timeout || 0;
		var msgClass = elemClass || "";
		var cls = "notifier42";
		var notifier42 = getByClass(document, cls)[0] || "";
		var an = "animated";
		var an2 = "fadeInUp";
		var an4 = "fadeOutDown";
		if (!notifier42) {
			notifier42 = document.createElement("div");
			appendFragment(notifier42, docBody);
		}
		addClass(notifier42, cls);
		addClass(notifier42, an);
		addClass(notifier42, an2);
		if (msgClass) {
			addClass(notifier42, msgClass);
		}
		if ("string" === typeof _message) {
			_message = document.createTextNode(_message);
		}
		appendFragment(_message, notifier42);
		var clearContainer = function (callback) {
			removeClass(notifier42, an2);
			addClass(notifier42, an4);
			var timer = setTimeout(function () {
				clearTimeout(timer);
				timer = null;
				removeClass(notifier42, an);
				removeClass(notifier42, an4);
				if (msgClass) {
					removeClass(notifier42, msgClass);
				}
				removeChildren(notifier42);
				return callback && "function" === typeof callback && callback();
			}, 400);
		};
		addListener(notifier42, "click", function handleContainer() {
			removeListener(this, "click", handleContainer);
			clearContainer();
		});
		if (0 !== delay) {
			var timer = setTimeout(function () {
				clearTimeout(timer);
				timer = null;
				clearContainer();
			}, delay);
		}
		return {
			destroy: function () {
				return clearContainer(removeElement.bind(null, notifier42));
			}
		};
	};

	/*!
	 * LoadingSpinner
	 */
	root.LoadingSpinner = (function () {
		var docBody = document.body || "";
		var loadingSpinnerClass = "loading-spinner";
		var sp = getByClass(document, loadingSpinnerClass)[0] || "";
		var loadingSpinnerIsActiveClass = "loading-spinner--is-active";
		if (!sp) {
			sp = document.createElement("div");
			addClass(sp, loadingSpinnerClass);
			appendFragment(sp, docBody);
		}
		return {
			show: function () {
				return hasClass(docBody, loadingSpinnerIsActiveClass) || addClass(docBody, loadingSpinnerIsActiveClass);
			},
			hide: function (callback, timeout) {
				var delay = timeout || 500;
				var timer = setTimeout(function () {
						clearTimeout(timer);
						timer = null;
						removeClass(docBody, loadingSpinnerIsActiveClass);
						return callback && "function" === typeof callback && callback();
					}, delay);
			}
		};
	})();

	/*!
	 * modified Detect Whether a Font is Installed
	 * @param {String} fontName The name of the font to check
	 * @return {Boolean}
	 * @author Kirupa <sam@samclarke.com>
	 * @see {@link https://www.kirupa.com/html5/detect_whether_font_is_installed.htm}
	 * passes jshint
	 */
	root.doesFontExist = function (fontName) {
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		var text = "abcdefghijklmnopqrstuvwxyz0123456789";
		context.font = "72px monospace";
		var baselineSize = context.measureText(text).width;
		context.font = "72px '" + fontName + "', monospace";
		var newSize = context.measureText(text).width;
		canvas = null;
		if (newSize === baselineSize) {
			return false;
		} else {
			return true;
		}
	};

	/*!
	 * modified loadExt
	 * @see {@link https://gist.github.com/englishextra/ff9dc7ab002312568742861cb80865c9}
	 * passes jshint
	 */
	root.loadJsCss = function (files, callback, type) {
		var _this = this;
		_this.files = files;
		_this.js = [];
		_this.head = document.getElementsByTagName("head")[0] || "";
		_this.body = document.body || "";
		_this.ref = document.getElementsByTagName("script")[0] || "";
		_this.callback = callback || function() {};
		_this.type = type ? type.toLowerCase() : "";
		_this.loadStyle = function (file) {
			var link = document.createElement("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = file;
			link.media = "only x";
			link.onload = function () {
				this.onload = null;
				this.media = "all";
			};
			link.setAttribute("property", "stylesheet");
			/* _this.head.appendChild(link); */
			(_this.body || _this.head).appendChild(link);
		};
		_this.loadScript = function (i) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true;
			script.src = _this.js[i];
			var loadNextScript = function () {
				if (++i < _this.js.length) {
					_this.loadScript(i);
				} else {
					_this.callback();
				}
			};
			script.onload = function () {
				loadNextScript();
			};
			_this.head.appendChild(script);
			/* if (_this.ref.parentNode) {
				_this.ref.parentNode[insertBefore](script, _this.ref);
			} else {
				(_this.body || _this.head).appendChild(script);
			} */
			(_this.body || _this.head).appendChild(script);
		};
		var i,
			l;
		for (i = 0, l = _this.files.length; i < l; i += 1) {
			if ((/\.js$|\.js\?/).test(_this.files[i]) || _this.type === "js") {
				_this.js.push(_this.files[i]);
			}
			if ((/\.css$|\.css\?|\/css\?/).test(_this.files[i]) || _this.type === "css") {
				_this.loadStyle(_this.files[i]);
			}
		}
		i = l = null;
		if (_this.js.length > 0) {
			_this.loadScript(0);
		} else {
			_this.callback();
		}
	};

	/*!
	 * loadDeferred
	 */
	root.loadDeferred = function (urlArray, callback) {
		var timer;
		var handle = function () {
			clearTimeout(timer);
			timer = null;
			var load;
			load = new loadJsCss(urlArray, callback);
		};
		var req;
		var raf = function () {
			cancelAnimationFrame(req);
			timer = setTimeout(handle, 0);
		};
		if (root.requestAnimationFrame) {
			req = requestAnimationFrame(raf);
		} else {
			addListener(root, "load", handle);
		}
	};

	/*!
	 * early utility classes
	 */
	root.earlyDeviceFormfactor = (function(selectors) {
		var orientation;
		var size;
		var addClasses = function (e) {
			var classesList = e.split(" ");
			if (selectors) {
				var i;
				for (i = 0; i < classesList.length; i += 1) {
					e = classesList[i];
					selectors.add(e);
				}
				i = null;
			}
		};
		var removeClasses = function (e) {
			var classesList = e.split(" ");
			if (selectors) {
				var i;
				for (i = 0; i < classesList.length; i += 1) {
					e = classesList[i];
					selectors.remove(e);
				}
				i = null;
			}
		};
		var orientationMq = {
			landscape: "all and (orientation:landscape)",
			portrait: "all and (orientation:portrait)"
		};
		var sizeMq = {
			small: "all and (max-width:768px)",
			medium: "all and (min-width:768px) and (max-width:991px)",
			large: "all and (min-width:992px)"
		};
		var matchMedia = "matchMedia";
		var matches = "matches";
		var toggleOrientationClasses = function (mqList, classText) {
			var handleMq = function (mqList) {
				if (mqList[matches]) {
					addClasses(classText);
					orientation = classText;
				} else {
					removeClasses(classText);
				}
			};
			handleMq(mqList);
			mqList.addListener(handleMq);
		};
		var toggleSizeClasses = function (mqList, classText) {
			var handleMq = function (mqList) {
				if (mqList[matches]) {
					addClasses(classText);
					size = classText;
				} else {
					removeClasses(classText);
				}
			};
			handleMq(mqList);
			mqList.addListener(handleMq);
		};
		var key;
		for (key in orientationMq) {
			if (orientationMq.hasOwnProperty(key)) {
				toggleOrientationClasses(root[matchMedia](orientationMq[key]), key);
			}
		}
		for (key in sizeMq) {
			if (sizeMq.hasOwnProperty(key)) {
				toggleSizeClasses(root[matchMedia](sizeMq[key]), key);
			}
		}
		key = null;
		return {
			orientation: orientation || "",
			size: size || ""
		};
	})(document.documentElement.classList || "");

	root.earlyDeviceType = (function(mobile, desktop, opera) {
		var selector = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i).test(opera) ||
			(/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i).test(opera.substr(0, 4)) ?
			mobile :
			desktop;
		addClass(document.documentElement, selector);
		return selector;
	})("mobile", "desktop", navigator.userAgent || navigator.vendor || (root).opera);

	root.earlySvgSupport = (function(selector) {
		selector = document.implementation.hasFeature("http://www.w3.org/2000/svg", "1.1") ? selector : "no-" + selector;
		addClass(document.documentElement, selector);
		return selector;
	})("svg");

	root.earlySvgasimgSupport = (function(selector) {
		selector = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") ? selector : "no-" + selector;
		addClass(document.documentElement, selector);
		return selector;
	})("svgasimg");

	root.earlyHasTouch = (function(selector) {
		selector = "ontouchstart" in document.documentElement ? selector : "no-" + selector;
		addClass(document.documentElement, selector);
		return selector;
	})("touch");

	/*!
	 * manageChaptersSelect
	 */
	/* root.manageChaptersSelect = function () {
		var chaptersSelect = document.getElementById("chapters-select") || "";
		var handleChaptersSelect = function () {
			var _this = this;
			var hashString = _this.options[_this.selectedIndex].value || "";
			if (hashString) {
				var targetObj = hashString ?
				(isValidId(hashString, true) ? document.getElementById(hashString.replace(/^#/, "")) || "" : "")
				: "";
				if (targetObj) {
					scroll2Top((targetObj ? findPos(targetObj).top : 0), 20000);
				} else {
					root.location.href = hashString;
				}
			}
		};
		if (chaptersSelect) {
			addListener(chaptersSelect, "change", handleChaptersSelect);
		}
	}; */

	var containerClass = "container";

	var isDropdownClass = "is-dropdown";

	var isActiveClass = "is-active";

	var hideOtherDropdownAll = function (_self) {
		var _this = _self || this;
		var list = getByClass(document, isDropdownClass) || "";
		var removeActiveClass = function (e) {
			if (_this !== e) {
				removeClass(e, isActiveClass);
			}
		};
		if (list) {
			var i,
				l;
			for (i = 0, l = list.length; i < l; i += 1) {
				removeActiveClass(list[i]);
			}
			i = l = null;
		}
	};
	var manageDropdownAll = function () {
		var container = document.getElementById(containerClass) || "";
		if (container) {
			addListener(container, "click", hideOtherDropdownAll);
		}
	};
	manageDropdownAll();

	var manageChaptersSelect = function () {
		var chaptersSelect = document.getElementById("chapters-select") || "";
		var holderChaptersSelect = getByClass(document, "holder-chapters-select")[0] || "";
		var chaptersListClass = "chapters-list";
		var chaptersListButtonClass = "chapters-list-button";
		var rerenderChaptersList = function () {
			var handleChaptersListItem = function (listObj, hashString) {
				if (hashString) {
					var targetObj = hashString ? (isValidId(hashString, true) ? document.getElementById(hashString.replace(/^#/, "")) || "" : "") : "";
					if (targetObj) {
						scroll2Top(findPos(targetObj).top, 10000);
					} else {
						root.location.hash = hashString;
					}
				}
				removeClass(listObj, isActiveClass);
			};
			var chaptersList = document.createElement("ul");
			var chaptersListItems = chaptersSelect ? chaptersSelect.getElementsByTagName("option") || "" : "";
			var chaptersListBtnDefaultText = "";
			var df = document.createDocumentFragment();
			var generateChaptersListItems = function (_this, i) {
				if (0 === i) {
					chaptersListBtnDefaultText = _this.firstChild.textContent;
				}
				var chaptersListItem = document.createElement("li");
				var chaptersListItemText = _this.firstChild.textContent || "";
				var chaptersListItemValue = _this.value;
				var chaptersListItemTextTruncated = truncateString("" + chaptersListItemText, 28);
				chaptersListItem.appendChild(document.createTextNode(chaptersListItemTextTruncated));
				chaptersListItem.title = chaptersListItemText;
				addListener(chaptersListItem, "click", handleChaptersListItem.bind(null, chaptersList, chaptersListItemValue));
				df.appendChild(chaptersListItem);
				df.appendChild(document.createTextNode("\n"));
			};
			var i,
				l;
			for (i = 0, l = chaptersListItems.length; i < l; i += 1) {
				generateChaptersListItems(chaptersListItems[i], i);
			}
			i = l = null;
			appendFragment(df, chaptersList);
			addClass(chaptersList, chaptersListClass);
			addClass(chaptersList, isDropdownClass);
			holderChaptersSelect.replaceChild(chaptersList, chaptersSelect.parentNode.parentNode);
			var chaptersListButton = document.createElement("button");
			addClass(chaptersListButton, chaptersListButtonClass);
			chaptersListButton.appendChild(document.createTextNode(chaptersListBtnDefaultText));
			chaptersList.parentNode.insertBefore(chaptersListButton, chaptersList);
			var insertChevronDownSmallSvg = function (targetObj) {
				var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
				svg.setAttribute("class", "ui-icon");
				use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#ui-icon-ChevronDownSmall");
				svg.appendChild(use);
				targetObj.appendChild(svg);
			};
			insertChevronDownSmallSvg(chaptersListButton);
			var handleChaptersListBtn = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				toggleClass(chaptersList, isActiveClass);
				hideOtherDropdownAll(chaptersList);
			};
			addListener(chaptersListButton, "click", handleChaptersListBtn);
		};
		if (holderChaptersSelect && chaptersSelect) {
			rerenderChaptersList();
		}
	};
	manageChaptersSelect();

	/*!
	 * promiseAjaxLoad
	 * accepts external url and returns text response Promise
	 */
	root.promiseAjaxLoad = function (url, options) {
		var _options = options || {};
		return new Promise(function(resolve, reject) {
			var x = root.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			if (_options.hasOwnProperty("overrideMimeType")) {
				x.overrideMimeType(_options.overrideMimeType);
			}
			x.open("GET", url, true);
			x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			x.withCredentials = _options.hasOwnProperty("withCredentials");
			x.addEventListener("readystatechange", function () {
				if (x.status === 404 || x.status === 0) {
					reject(x.status);
				} else if (x.readyState === 4 && x.status === 200 && x.responseText) {
					resolve(x.responseText);
				}
			}, false);
			x.send(null);
		});
	};

	/*!
	 * ajaxGet
	 * accepts external url and returns text response
	 */
	root.ajaxGet = function (url, options) {
		var _options = options || {};
		var success = _options.hasOwnProperty("success") ? _options.success : "";
		var failure = _options.hasOwnProperty("failure") ? _options.failure : "";
		var x = root.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		if(_options.hasOwnProperty("overrideMimeType")) {
			x.overrideMimeType(_options.overrideMimeType);
		}
		x.open("GET", url, true);
		x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		x.withCredentials = _options.hasOwnProperty("withCredentials");
		x.addEventListener("readystatechange", function () {
			if (x.status === 404 || x.status === 0) {
				return failure && "function" === typeof failure && failure(x.status);
			} else if (x.readyState === 4 && x.status === 200 && x.responseText) {
				return success && "function" === typeof success && success(x.responseText);
			}
		}, false);
		x.send(null);
	};

	/*!
	 * objectPath
	 */
	/*jshint -W003 */
	/*jshint -W016 */
	/*jshint -W116 */
	root.objectPath = (function () {
		var toStr = Object.prototype.toString;
		function hasOwnProperty(obj, prop) {
			if (obj == null) {
				return false;
			}
			return Object.prototype.hasOwnProperty.call(obj, prop);
		}
		function isEmpty(value) {
			if (!value) {
				return true;
			}
			if (isArray(value) && value.length === 0) {
				return true;
			} else if (typeof value !== "string") {
				for (var i in value) {
					if (hasOwnProperty(value, i)) {
						return false;
					}
				}
				return true;
			}
			return false;
		}
		function toString(type) {
			return toStr.call(type);
		}
		function isObject(obj) {
			return typeof obj === "object" && toString(obj) === "[object Object]";
		}
		var isArray = Array.isArray || function(obj) {
			return toStr.call(obj) === "[object Array]";
		};
		function isBoolean(obj) {
			return typeof obj === "boolean" || toString(obj) === "[object Boolean]";
		}
		function getKey(key) {
			var intKey = parseInt(key);
			if (intKey.toString() === key) {
				return intKey;
			}
			return key;
		}
		function factory(options) {
			options = options || {};
			var objectPath = function(obj) {
				return Object.keys(objectPath).reduce(function(proxy, prop) {
					if (prop === "create") {
						return proxy;
					}
					if (typeof objectPath[prop] === "function") {
						proxy[prop] = objectPath[prop].bind(objectPath, obj);
					}
					return proxy;
				}, {});
			};
			var hasShallowProperty;
			if (options.includeInheritedProps) {
				hasShallowProperty = function() {
					return true;
				};
			} else {
				hasShallowProperty = function(obj, prop) {
					return (typeof prop === "number" && Array.isArray(obj)) || hasOwnProperty(obj, prop);
				};
			}
			function getShallowProperty(obj, prop) {
				if (hasShallowProperty(obj, prop)) {
					return obj[prop];
				}
			}
			function set(obj, path, value, doNotReplace) {
				if (typeof path === "number") {
					path = [path];
				}
				if (!path || path.length === 0) {
					return obj;
				}
				if (typeof path === "string") {
					return set(obj, path.split(".").map(getKey), value, doNotReplace);
				}
				var currentPath = path[0];
				var currentValue = getShallowProperty(obj, currentPath);
				if (options.includeInheritedProps && (currentPath === "__proto__" ||
						(currentPath === "constructor" && typeof currentValue === "function"))) {
					throw new Error("For security reasons, object's magic properties cannot be set");
				}
				if (path.length === 1) {
					if (currentValue === void 0 || !doNotReplace) {
						obj[currentPath] = value;
					}
					return currentValue;
				}
				if (currentValue === void 0) {
					if (typeof path[1] === "number") {
						obj[currentPath] = [];
					} else {
						obj[currentPath] = {};
					}
				}
				return set(obj[currentPath], path.slice(1), value, doNotReplace);
			}
			objectPath.has = function(obj, path) {
				if (typeof path === "number") {
					path = [path];
				} else if (typeof path === "string") {
					path = path.split(".");
				}
				if (!path || path.length === 0) {
					return !!obj;
				}
				for (var i = 0; i < path.length; i++) {
					var j = getKey(path[i]);
					if ((typeof j === "number" && isArray(obj) && j < obj.length) ||
						(options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
						obj = obj[j];
					} else {
						return false;
					}
				}
				return true;
			};
			objectPath.ensureExists = function(obj, path, value) {
				return set(obj, path, value, true);
			};
			objectPath.set = function(obj, path, value, doNotReplace) {
				return set(obj, path, value, doNotReplace);
			};
			objectPath.insert = function(obj, path, value, at) {
				var arr = objectPath.get(obj, path);
				at = ~~at;
				if (!isArray(arr)) {
					arr = [];
					objectPath.set(obj, path, arr);
				}
				arr.splice(at, 0, value);
			};
			objectPath.empty = function(obj, path) {
				if (isEmpty(path)) {
					return void 0;
				}
				if (obj == null) {
					return void 0;
				}
				var value,
					i;
				if (!(value = objectPath.get(obj, path))) {
					return void 0;
				}
				if (typeof value === "string") {
					return objectPath.set(obj, path, "");
				} else if (isBoolean(value)) {
					return objectPath.set(obj, path, false);
				} else if (typeof value === "number") {
					return objectPath.set(obj, path, 0);
				} else if (isArray(value)) {
					value.length = 0;
				} else if (isObject(value)) {
					for (i in value) {
						if (hasShallowProperty(value, i)) {
							delete value[i];
						}
					}
				} else {
					return objectPath.set(obj, path, null);
				}
			};
			objectPath.push = function(obj, path  ) {
				var arr = objectPath.get(obj, path);
				if (!isArray(arr)) {
					arr = [];
					objectPath.set(obj, path, arr);
				}
				arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
			};
			objectPath.coalesce = function(obj, paths, defaultValue) {
				var value;
				for (var i = 0, len = paths.length; i < len; i++) {
					if ((value = objectPath.get(obj, paths[i])) !== void 0) {
						return value;
					}
				}
				return defaultValue;
			};
			objectPath.get = function(obj, path, defaultValue) {
				if (typeof path === "number") {
					path = [path];
				}
				if (!path || path.length === 0) {
					return obj;
				}
				if (obj == null) {
					return defaultValue;
				}
				if (typeof path === "string") {
					return objectPath.get(obj, path.split("."), defaultValue);
				}
				var currentPath = getKey(path[0]);
				var nextObj = getShallowProperty(obj, currentPath);
				if (nextObj === void 0) {
					return defaultValue;
				}
				if (path.length === 1) {
					return nextObj;
				}
				return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
			};
			objectPath.del = function del(obj, path) {
				if (typeof path === "number") {
					path = [path];
				}
				if (obj == null) {
					return obj;
				}
				if (isEmpty(path)) {
					return obj;
				}
				if (typeof path === "string") {
					return objectPath.del(obj, path.split("."));
				}
				var currentPath = getKey(path[0]);
				if (!hasShallowProperty(obj, currentPath)) {
					return obj;
				}
				if (path.length === 1) {
					if (isArray(obj)) {
						obj.splice(currentPath, 1);
					} else {
						delete obj[currentPath];
					}
				} else {
					return objectPath.del(obj[currentPath], path.slice(1));
				}
				return obj;
			};
			return objectPath;
		}
		var mod = factory();
		mod.create = factory;
		mod.withInheritedProps = factory({
			includeInheritedProps: true
		});
		return mod;
	})();
	/*jshint +W003 */
	/*jshint +W016 */
	/*jshint +W116 */
	/* var obj = {
		a: {
			b: "d",
			c: ["e", "f"],
			"\u1200": "unicode key",
			"dot.dot": "key"
		}
	};
	var str = objectPath.get(obj, ["a", "dot.dot"]);
	console.log(str); */

	/*!
	 * manageImgLightbox
	 * @see {@link https://github.com/englishextra/img-lightbox}
	 */
	root.manageImgLightbox = function () {
		var imgLightboxLinkClass = "img-lightbox-link";
		var link = getByClass(document, imgLightboxLinkClass) || "";
		var initScript = function () {
			imgLightbox(imgLightboxLinkClass, {
				onLoaded: function () {
					LoadingSpinner.hide();
				},
				onClosed: function () {
					LoadingSpinner.hide();
				},
				onCreated: function () {
					LoadingSpinner.show();
				},
				touch: false
			});
		};
		if (root.imgLightbox && link) {
			initScript();
		}
	};

})("undefined" !== typeof window ? window : this, document);
