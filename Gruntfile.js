/*jslint node: true */
/*jslint esversion: 6 */
module.exports = function (grunt) {
	"use strict";
	grunt.initConfig({
		jshint: {
			all: [
					"bala/0.1.9/js/bala.fixed.js",
					"bootstrap/3.3.7/js/bootstrap.fixed.js",
					"crel/3.0.0/js/crel.fixed.js",
					"docReady/1.0.0/js/docready.fixed.js",
					"dom4/1.8.5/js/dom4.max.fixed.js",
					"doSlide/1.1.4/js/do-slide.fixed.js",
					"echo.js/0.1.0/js/echo.fixed.js",
					"Evento/1.0.0/js/evento.fixed.js",
					"fastclick/1.0.6/js/fastclick.fixed.js",
					"fetch/2.0.3/js/fetch.fixed.js",
					"google-code-prettify/0.1/js/prettify.bundled.fixed.js",
					"highlight.js/9.12.0/js/highlight.pack.fixed.js",
					"iframe-lightbox/0.1.7/js/iframe-lightbox.fixed.js",
					"img-lightbox/0.1.1/js/img-lightbox.fixed.js",
					"infinite-scroll/0.1.0/js/infinite-scroll.fixed.js",
					"isotope/3.0.1/js/isotope.imagesloaded.pkgd.fixed.js",
					"isotope/3.0.1/js/isotope.pkgd.fixed.js",
					"jquery-builder/0.7.0/dist/2.1.1/js/jquery-deprecated-wrap.fixed.js",
					"jquery/3.1.1/js/jquery.fixed.js",
					"jqueryui/1.10.4/custom/js/jquery-ui.custom.fixed.js",
					"js-cookie/2.1.3/js/js.cookie.fixed.js",
					"kamil/0.1.1/js/kamil.fixed.js",
					"lazyload/3.2.2/js/lazyload.fixed.js",
					"loadCSS/1.2.0/js/loadCSS.fixed.js",
					"loadJS/0.2.3/js/loadJS.fixed.js",
					"ManUp.js/0.7/js/manup.fixed.js",
					"masonry/4.1.1/js/masonry.imagesloaded.pkgd.fixed.js",
					"masonry/4.1.1/js/masonry.pkgd.fixed.js",
					"minigrid/3.1.1/js/minigrid.fixed.js",
					"mutation-observer/1.0.3/js/index.fixed.js",
					"packery/2.1.1/js/packery.draggabilly.pkgd.fixed.js",
					"packery/2.1.1/js/packery.imagesloaded.draggabilly.pkgd.fixed.js",
					"packery/2.1.1/js/packery.imagesloaded.pkgd.fixed.js",
					"packery/2.1.1/js/packery.pkgd.fixed.js",
					"parallax-js/3.1.0/js/parallax.fixed.js",
					"photoswipe/4.1.0/js/photoswipe.photoswipe-ui-default.fixed.js",
					"platform/1.3.4/js/platform.fixed.js",
					"pnotify/1.3.1/js/pnotify.fixed.js",
					"polyfills/js/polyfills.fixed.js",
					"promise-polyfill/6.0.2/js/promise.fixed.js",
					"qrjs2/0.1.6/js/qrjs2.fixed.js",
					"reqwest/2.0.5/js/reqwest.fixed.js",
					"ripple-js/1.4.4/js/ripple.fixed.js",
					"routie/0.3.2/js/routie.fixed.js",
					"shower/1.0.1/js/shower.fixed.js",
					"sw-toolbox/3.6.1/js/companion.fixed.js",
					"sw-toolbox/3.6.1/js/sw-toolbox.fixed.js",
					"t.js/0.1.0/js/t.fixed.js",
					"tablesort/4.0.1/js/tablesort.fixed.js",
					"Tocca.js/2.0.1/js/Tocca.fixed.js",
					"ToProgress/0.1.1/js/ToProgress.fixed.js",
					"verge/1.9.1/js/verge.fixed.js",
					"webfontloader/1.6.2/js/webfontloader.fixed.js",
					"wheel-indicator/1.1.4/js/wheel-indicator.fixed.js",
					"zenscroll/3.2.2/js/zenscroll.fixed.js",
					"zoomwall.js/1.1.1/js/zoomwall.fixed.js",
			]
		}
	});
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.registerTask("default", "jshint");
};
