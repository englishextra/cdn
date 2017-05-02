/*!
 * modified Implement infinite scrolling v0.1.0
 * github.com/alexblack/infinite-scroll
 * - Inspired by: http://ravikiranj.net/drupal/201106/code/javascript/how-implement-infinite-scrolling-using-native-javascript-and-yui3
 * infiniteScroll({distance:50,callback: function (done) {
 * 1. fetch data from the server
 * 2. insert it into the document
 * 3. call done when we are done
 * window.location.hash = "#/somepage";
 * done();}});
 * exposed as window / self / global property;
 * source: github.com/alexblack/infinite-scroll/blob/master/infinite-scroll.js
 * passes jshint
 */
(function (w) {
	var getScrollPos = function () {
		if (/msie/gi.test(navigator.userAgent)) {
			return document.documentElement.scrollTop;
		} else {
			return w.pageYOffset;
		}
	},
	prevScrollPos = getScrollPos() || "",
	handleScroll = function (scroller, event) {
		if (scroller.updateInitiated) {
			return;
		}
		var scrollPos = getScrollPos();
		if (scrollPos == prevScrollPos) {
			return;
		}
		var pageHeight = document.documentElement.scrollHeight,
		clientHeight = document.documentElement.clientHeight;
		if (pageHeight - (scrollPos + clientHeight) < scroller.options.distance) {
			scroller.updateInitiated = true;
			scroller.options.callback(function () {
				scroller.updateInitiated = false;
			});
		}
		prevScrollPos = scrollPos;
	};
	w.infiniteScroll = function (options) {
		var defaults = {
			callback: function () {},
			distance: 50
		};
		for (var key in defaults) {
			if (defaults.hasOwnProperty(key)) {
				if ("undefined" === typeof options[key]) {
					options[key] = defaults[key];
				}
			}
		}
		var scroller = {
			options: options,
			updateInitiated: false
		};
		w.onscroll = function (event) {
			handleScroll(scroller, event);
		};
		document.ontouchmove = function (event) {
			handleScroll(scroller, event);
		};
	};
}
	("undefined"===typeof window?"undefined"===typeof self?"undefined"===typeof global?this:global:self:window));
/* infiniteScroll({
	distance: 50,
	callback: function (done) {
		window.location.hash = "#/contents";
		done();
}}); */
