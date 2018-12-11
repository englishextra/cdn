/*global ActiveXObject, console */
(function (root, document) {
	"use strict";
	Element.prototype.prependChild = function (node) {
		var firstChild = this.firstChild;
		if (firstChild) {
			return this.insertBefore(node, firstChild);
		} else {
			return this.appendChild(node);
		}
	};
	var toArray = function toArray(obj) {
		if (!obj) {
			return [];
		}
		return Array.prototype.slice.call(obj);
	};
	var parseColor = function parseColor(color) {
		var RGB_match = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
		var hex_match = /^#(([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2}))$/;
		var _color = color.toLowerCase();
		if (RGB_match.test(_color)) {
			return _color.match(RGB_match).slice(1);
		} else if (hex_match.test(_color)) {
			return _color.match(hex_match).slice(2).map(function (piece) {
				return parseInt(piece, 16);
			});
		}
		console.error("Unrecognized color format.");
		return null;
	};
	var calculateBrightness = function calculateBrightness(color) {
		return color.reduce(function (p, c) {
			return p + parseInt(c, 10);
		}, 0) / 3;
	};
	var removeJsCssFile = function removeJsCssFile(filename, filetype) {
		var targetelement = filetype == "js" ? "script" : filetype == "css" ? "link" : "none";
		var targetattr = filetype == "js" ? "src" : filetype == "css" ? "href" : "none";
		var allsuspects = document.getElementsByTagName(targetelement) || "";
		for (var i = allsuspects.length; i >= 0; i--) {
			if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1) {
				allsuspects[i].parentNode.removeChild(allsuspects[i]);
			}
		}
	};
	var _extends = function _extends() {
		var _extends = Object.assign || function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
			return target;
		};
		return _extends.apply(this, arguments);
	};
	var parseDomFromString = function parseDomFromString(responseText) {
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = responseText;
		return tempDiv;
	};
	var UWP = {
		version: "2.0.0",
		config: {
			pageTitle: "UWP web framework",
			layoutType: "docked-minimized",
			activeColor: "#26C6DA",
			mainColor: "#373737",
			mainColorDarkened: "#0097A7",
			includes: "./includes/serguei-uwp",
			includeScript: "./libs/serguei-uwp/js/include-script",
			includeStyle: "./libs/serguei-uwp/css/include-style",
			navContainer: "nav-container",
			home: "home",
			hashNavKey: "page",
			hashBang: "#/",
			onPageLoad: function () {
				return;
			},
			errorTitle: "Something went wrong",
			errorLinkText: "Go Home"
		},
		init: function init(params) {
			console.log("UWP.init()");
			UWP.head = document.head;
			UWP.body = document.body;
			UWP.container = null;
			var _uwp_container = document.getElementsByClassName("uwp-container")[0] || "";
			if (!_uwp_container) {
				UWP.container = document.createElement("div");
				UWP.container.setAttribute("class", "uwp-container");
				UWP.container.setAttribute("role", "document");
				document.body.appendChild(UWP.container);
			} else {
				UWP.container = _uwp_container;
			}
			UWP.header = null;
			var _UWP_header = document.getElementsByClassName("uwp-header")[0] || "";
			if (!_UWP_header) {
				UWP.header = document.createElement("div");
				UWP.header.setAttribute("class", "uwp-header");
				UWP.header.setAttribute("role", "navigation");
				UWP.container.appendChild(UWP.header);
			} else {
				UWP.header = _UWP_header;
			}
			UWP.main = null;
			var _uwp_main = document.getElementsByClassName("uwp-main")[0] || "";
			if (!_uwp_main) {
				UWP.main = document.createElement("div");
				UWP.main.setAttribute("class", "uwp-main");
				UWP.main.setAttribute("role", "main");
				UWP.container.appendChild(UWP.main);
			} else {
				UWP.main = _uwp_main;
			}
			UWP.loading = null;
			var _uwp_loading = document.getElementsByClassName("uwp-loading")[0] || "";
			if (!_uwp_loading) {
				UWP.loading = document.createElement("div");
				UWP.loading.setAttribute("class", "uwp-loading");
				UWP.loading.setAttribute("role", "main");
				UWP.loading.innerHTML = '<div class="uwp-loading__part"><div class="uwp-loading__rotator"></div></div><div class="uwp-loading__part uwp-loading__part--bottom"><div class="uwp-loading__rotator"></div></div>\n';
				document.body.appendChild(UWP.loading);
			} else {
				UWP.loading = _uwp_loading;
			}
			UWP.revealUWPLoading = function () {
				UWP.loading.classList.add("uwp-loading--is-active");
			};
			UWP.concealUWPLoading = function () {
				var timer = setTimeout(function () {
						clearTimeout(timer);
						timer = null;
						UWP.loading.classList.remove("uwp-loading--is-active");
					}, 1000);
			};
			UWP.removeUWPLoading = function () {
				UWP.loading.classList.remove("uwp-loading--is-active");
			};
			UWP.getConfig(params);
			UWP.header.type = UWP.config.layoutType;
			UWP.body.setAttribute("data-layout-type", UWP.header.type);
			UWP.body.addEventListener("click", function (event) {
				if (event.target.getAttribute("data-target") !== null) {
					event.stopPropagation();
					event.preventDefault();
					UWP.navigate(event.target.getAttribute("data-target"));
				}
			});
			UWP.getNavigation();
			UWP.createStyles();
			UWP.navigate(root.location.hash.split(/#\//)[1], false);
			root.onhashchange = function () {
				UWP.navigate(root.location.hash.split(/#\//)[1], false);
			};
			UWP.pageTitle = null;
			var _uwp_page_heading = document.getElementsByClassName("uwp-page-heading")[0] || "";
			if (!_uwp_page_heading) {
				UWP.pageTitle = document.createElement("h1");
				UWP.pageTitle.setAttribute("class", "uwp-page-heading");
				UWP.pageTitle.innerHTML = UWP.config.pageTitle;
				UWP.header.appendChild(UWP.pageTitle);
			} else {
				UWP.pageTitle = _uwp_page_heading;
			}
		},
		getConfig: function getConfig(params) {
			console.log("UWP.getConfig()");
			UWP.config = _extends(UWP.config, params);
		},
		getNavigation: function getNavigation(target) {
			console.log("UWP.getNavigation()");
			if (typeof target === "undefined") {
				target = UWP.config.navContainer;
			}
			function parseNavElement(el) {
				var elLabel = el ? el.getElementsByTagName("nav-label")[0] || "" : "";
				var navLabel = elLabel.textContent || "";
				var elTarget = el ? el.getElementsByTagName("nav-target")[0] || "" : "";
				var navTarget = elTarget.textContent || "";
				var elIcon = el ? el.getElementsByTagName("nav-icon")[0] || "" : "";
				var navIconSource = elIcon;
				var navElement = document.createElement("li");
				var navLink = document.createElement("a");
				/* jshint -W107 */
				navLink.href = "javascript:void(0);";
				/* jshint +W107 */
				navLink.title = navLabel;
				navLink.innerHTML = navLabel;
				if (navIconSource) {
					var navIcon = document.createElement("span");
					if (/\.(jpg|png|gif|svg)/.test(navIconSource.textContent)) {
						var navIconImage = document.createElement("img");
						navIconImage.src = navIconSource.textContent;
						navIcon.appendChild(navIconImage);
					} else {
						navIcon.innerHTML = navIconSource.innerHTML;
					}
					navLink.prependChild(navIcon);
				}
				navLink.addEventListener("click", function (event) {
					event.stopPropagation();
					event.preventDefault();
					if (root.location.hash !== "".concat(UWP.config.hashBang, navTarget)) {
						UWP.menuList.classList.remove("active");
						UWP.navigate(navTarget);
					}
				});
				navLink.setAttribute("data-target", navTarget);
				navElement.appendChild(navLink);
				return navElement;
			}
			var URL = "".concat(UWP.config.includes, "/", target, ".html");
			var UWP_navigation_request = root.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			UWP_navigation_request.overrideMimeType("text/html;charset=utf-8");
			UWP_navigation_request.open("GET", URL, true);
			UWP_navigation_request.withCredentials = false;
			UWP_navigation_request.onreadystatechange = function () {
				if (UWP_navigation_request.status === 404 || UWP_navigation_request.status === 0) {
					console.log("Error XMLHttpRequest-ing file", UWP_navigation_request.status);
				} else if (UWP_navigation_request.readyState === 4 && UWP_navigation_request.status === 200 && UWP_navigation_request.responseText) {
					var parsed = parseDomFromString(UWP_navigation_request.responseText);
					var elMainMenu = parsed.getElementsByTagName("nav-container")[0] || "";
					var navsSource = elMainMenu || "";
					var nav = document.createElement("div");
					nav.setAttribute("class", "uwp-nav");
					UWP.nav = nav;
					var elList = navsSource ? navsSource.getElementsByTagName("nav-list") || "" : "";
					toArray(elList).forEach(function (navSource) {
						var navMain = document.createElement("ul");
						UWP.nav.appendChild(navMain);
						var elEl = navsSource ? navSource.getElementsByTagName("nav-item") || "" : "";
						toArray(elEl).forEach(function (el) {
							navMain.appendChild(parseNavElement(el));
						});
					});
					if (toArray(elList).length) {
						UWP.header.appendChild(UWP.nav);
						UWP.addMenuButton();
					}
				}
			};
			UWP_navigation_request.send(null);
		},
		updateNavigation: function updateNavigation() {
			console.log("UWP.updateNavigation()");
			var nav = document.getElementsByClassName("uwp-nav")[0] || "";
			var navA = nav ? nav.getElementsByTagName("a") || "" : "";
			toArray(navA).forEach(function (link) {
				if (link.getAttribute("data-target") === UWP.config.currentPage) {
					link.parentElement.classList.add("active");
				} else {
					link.parentElement.classList.remove("active");
				}
			});
		},
		createStyles: function createStyles() {
			console.log("UWP.createStyles()");
			UWP.customStyle = document.createElement("style");
			if (UWP.config.mainColor) {
				var mainColor_RGB = parseColor(UWP.config.mainColor);
				if (mainColor_RGB) {
					var mainColor_brightness = calculateBrightness(mainColor_RGB);
					if (mainColor_brightness >= 128) {
						UWP.body.classList.add("uwp-theme--light");
					} else {
						UWP.body.classList.add("uwp-theme--dark");
					}
					var mainColorDarkened = mainColor_RGB.map(function (color) {
							var newColor = color - 20;
							if (newColor < 0)
								newColor = 0;
							return newColor;
						});
					if (!UWP.config.mainColorDarkened) {
						UWP.config.mainColorDarkened = "rgb(".concat(mainColorDarkened, ")");
					}
				}
				UWP.customStyle.innerHTML += "\n\t[data-layout-type=\"tabs\"] .uwp-header {\n\tbackground: ".concat(UWP.config.mainColor, ";\n\t}\n\n\t[data-layout-type=\"overlay\"] .uwp-header {\n\tbackground: ").concat(UWP.config.mainColor, ";\n\t}\n\t[data-layout-type=\"overlay\"] .uwp-header .uwp-nav:nth-of-type(1) {\n\tbackground-color: ").concat(UWP.config.mainColorDarkened, ";\n\t}\n\n\t[data-layout-type=\"docked-minimized\"] .uwp-header {\n\tbackground: ").concat(UWP.config.mainColor, ";\n\t}\n\t[data-layout-type=\"docked-minimized\"] .uwp-header .uwp-nav:nth-of-type(1) {\n\tbackground: ").concat(UWP.config.mainColorDarkened, ";\n\t}\n\n\t[data-layout-type=\"docked\"] .uwp-header {\n\tbackground: ").concat(UWP.config.mainColor, ";\n\t}\n\t[data-layout-type=\"docked\"] .uwp-header .uwp-nav:nth-of-type(1) {\n\tbackground: ").concat(UWP.config.mainColorDarkened, ";\n\t}\n\t");
			}
			if (UWP.config.activeColor) {
				var activeColor_RGB = parseColor(UWP.config.activeColor);
				if (activeColor_RGB) {
					var activeColor_brightness = calculateBrightness(activeColor_RGB);
					if (activeColor_brightness >= 128) {
						UWP.body.classList.add("uwp-theme--active-light");
					} else {
						UWP.body.classList.add("uwp-theme--active-dark");
					}
				}
				UWP.customStyle.innerHTML += "\n\t[data-layout-type=\"tabs\"] .uwp-header .uwp-nav:nth-of-type(1) ul li.active {\n\tcolor: ".concat(UWP.config.activeColor, ";\n\tborder-bottom-color: ").concat(UWP.config.activeColor, ";\n\t}\n\t[data-layout-type=\"overlay\"] .uwp-header .uwp-nav:nth-of-type(1) ul li.active {\n\tbackground-color: ").concat(UWP.config.activeColor, ";\n\t}\n\t[data-layout-type=\"docked-minimized\"] .uwp-header .uwp-nav:nth-of-type(1) ul li.active {\n\tbackground-color: ").concat(UWP.config.activeColor, ";\n\t}\n\t[data-layout-type=\"docked\"] .uwp-header .uwp-nav:nth-of-type(1) ul li.active {\n\tbackground-color: ").concat(UWP.config.activeColor, ";\n\t}\n\t");
			}
			if (UWP.customStyle.innerHTML.length) {
				UWP.body.appendChild(UWP.customStyle);
			}
		},
		addMenuButton: function addMenuButton() {
			console.log("UWP.addMenuButton()");
			UWP.menuButton = null;
			var _uwp_menu_button = document.getElementsByClassName("uwp-menu-button")[0] || "";
			if (!_uwp_menu_button) {
				UWP.menuButton = document.createElement("button");
				UWP.menuButton.setAttribute("class", "uwp-menu-button");
				UWP.menuButton.setAttribute("aria-label", "Menu");
				UWP.menuButton.innerHTML = '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" transform="scale(1.75 1.75) translate(0 0)" d="M1024 320h-1024v-64h1024v64zm0 512h-1024v-64h1024v64zm0-256.5h-1024v-63.5h1024v63.5z"/></svg>';
				UWP.header.prependChild(UWP.menuButton);
			} else {
				UWP.menuButton = _uwp_menu_button;
			}
			UWP.menuList = UWP.header.getElementsByClassName("uwp-nav")[0] || "";
			if (UWP.menuList) {
				UWP.menuButton.addEventListener("click", function () {
					UWP.menuList.classList.toggle("active");
				});
				UWP.main.addEventListener("click", function () {
					UWP.menuList.classList.remove("active");
				});
			}
		},
		navigate: function navigate(target, addHistory) {
			console.log("UWP.navigate()");
			if (typeof target === "undefined") {
				target = UWP.config.home;
			}
			UWP.config.currentPage = target;
			if (addHistory !== false) {
				history.pushState("", "", "".concat(root.location.href.split(/#\//)[0], UWP.config.hashBang, target));
			}
			UWP.main.innerHTML = "";
			function displayError(title, linkText) {
				UWP.main.innerHTML = "\n\t<div class=\"uwp-error\">\n\t<p>".concat(title, "</p>\n\t<p><a href=\"javascript:void(0);\" class=\"uwp-error-link\">" + linkText + "</a></p>\n\t</div>\n\t");
				var mainA = UWP.main.getElementsByClassName("uwp-error-link")[0] || "";
				mainA.addEventListener("click", function (event) {
					event.stopPropagation();
					event.preventDefault();
					UWP.navigate(UWP.config.home);
				});
				UWP.updateNavigation();
				UWP.removeUWPLoading();
			}
			var URL = "".concat(UWP.config.includes, "/").concat(target, ".html");
			var UWP_navigate_request = root.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			UWP_navigate_request.overrideMimeType("text/html;charset=utf-8");
			UWP_navigate_request.open("GET", URL, true);
			UWP_navigate_request.withCredentials = false;
			UWP_navigate_request.onreadystatechange = function () {
				if (UWP_navigate_request.status === 404 || UWP_navigate_request.status === 0) {
					console.log("Error XMLHttpRequest-ing file", UWP_navigate_request.status);
					console.error(UWP.config.errorTitle);
					displayError(UWP.config.errorTitle, UWP.config.errorLinkText);
				} else if (UWP_navigate_request.readyState === 4 && UWP_navigate_request.status === 200 && UWP_navigate_request.responseText) {
					var parsed = parseDomFromString(UWP_navigate_request.responseText);
					var page = parsed.getElementsByTagName("page-container")[0] || "";
					if (!page) {
						console.error(UWP.config.errorTitle);
						displayError(UWP.config.errorTitle, UWP.config.errorLinkText);
					}
					UWP.revealUWPLoading();
					var elTitle = page ? page.getElementsByTagName("page-title")[0] || "" : "";
					var pageTitle = elTitle.textContent || "";
					var elBody = page ? page.getElementsByTagName("page-content")[0] || "" : "";
					var pageBody = elBody.innerHTML || "";
					var pageIncludeScript = page ? page.getElementsByTagName("include-script")[0] || "" : "";
					var pageIncludeStyle = page ? page.getElementsByTagName("include-style")[0] || "" : "";
					UWP.main.innerHTML = "";
					UWP.main.innerHTML = pageBody;
					UWP.main.classList.remove("uwp-main--with-animation");
					(function () {
						return UWP.main.offsetWidth;
					})();
					UWP.main.classList.add("uwp-main--with-animation");
					UWP.pageTitle.innerHTML = pageTitle;
					document.title = "".concat(pageTitle, " - ").concat(UWP.config.pageTitle);
					if (pageIncludeScript) {
						var scriptName = pageIncludeScript.textContent;
						var _src = "".concat(UWP.config.includeScript, "/").concat(scriptName);
						removeJsCssFile(_src, "js");
						var script = document.createElement("script");
						script.setAttribute("src", _src);
						script.async = true;
						UWP.body.appendChild(script);
					}
					if (pageIncludeStyle) {
						var styleName = pageIncludeStyle.textContent;
						var _href = "".concat(UWP.config.includeStyle, "/").concat(styleName);
						removeJsCssFile(_href, "css");
						var link = document.createElement("link");
						link.setAttribute("href", _href);
						link.setAttribute("property", "stylesheet");
						link.rel = "stylesheet";
						link.media = "all";
						UWP.body.appendChild(link);
					}
					if (UWP.config.onPageLoad && "function" === typeof UWP.config.onPageLoad) {
						UWP.config.onPageLoad();
					}
					UWP.updateNavigation();
					UWP.concealUWPLoading();
				}
			};
			UWP_navigate_request.send(null);
		}
	};
	root.UWP = UWP;
})("undefined" !== typeof window ? window : this, document);
