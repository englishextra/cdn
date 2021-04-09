/*global require */

/*!
 * @see {@link https://github.com/mildrenben/surface/blob/master/gulpfile.js}
 * @see {@link https://www.webstoemp.com/blog/gulp-setup/}
 * @see {@link https://gulpjs.com/plugins/blackList.json}
 * @see {@link https://hackernoon.com/how-to-automate-all-the-things-with-gulp-b21a3fc96885}
 * @see {@link https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async}
 * @see {@link https://zzz.buzz/2016/11/19/gulp-4-0-upgrade-guide/}
 * @see {@link https://blog.khophi.co/migrate-gulp-4-complete-example/}
 * @see {@link https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/}
 * @see {@link https://codeburst.io/switching-to-gulp-4-0-271ae63530c0}
 */

var gulp = require("gulp");
var eslint = require("gulp-eslint");

var options = {
	libbundle: {
		src: [
			"./libs/adaptivecards/1.1.0/src/adaptivecards.fixed.js",
			"./libs/ajax/3.0.4/js/ajax.fixed.js",
			"./libs/bala/0.1.9/js/bala.fixed.js",
			"./libs/bootstrap/3.3.7/js/bootstrap.fixed.js",
			"./libs/crel/3.0.0/js/crel.fixed.js",
			"./libs/docReady/1.0.0/js/docready.fixed.js",
			"./libs/dom4/1.8.5/js/dom4.max.fixed.js",
			"./libs/doSlide/1.1.4/js/do-slide.fixed.js",
			"./libs/echo.js/0.1.0/js/echo.fixed.js",
			"./libs/EventEmitter/5.2.5/js/EventEmitter.fixed.js",
			"./libs/Evento/1.0.0/js/evento.fixed.js",
			"./libs/fastclick/1.0.6/js/fastclick.fixed.js",
			"./libs/fetch/2.0.3/js/fetch.fixed.js",
			"./libs/glightbox/1.0.8/src/glightbox.fixed.js",
			"./libs/google-code-prettify/0.1/js/prettify.bundled.fixed.js",
			"./libs/highlight.js/9.12.0/src/highlight.pack.fixed.js",
			"./libs/iframe-lightbox/0.2.10/src/iframe-lightbox.fixed.js",
			"./libs/imagesloaded/4.1.4/js/imagesloaded.pkgd.fixed.js",
			"./libs/img-lightbox/0.2.5/src/img-lightbox.fixed.js",
			"./libs/infinite-scroll/0.1.0/js/infinite-scroll.fixed.js",
			"./libs/isotope/3.0.1/js/isotope.imagesloaded.pkgd.fixed.js",
			"./libs/isotope/3.0.1/js/isotope.pkgd.fixed.js",
			"./libs/jquery-builder/0.7.0/dist/2.1.1/js/jquery-deprecated-wrap.fixed.js",
			"./libs/jquery/3.5.1/js/jquery.fixed.js",
			"./libs/jqueryui/1.10.4/custom/js/jquery-ui.custom.fixed.js",
			"./libs/js-cookie/2.1.3/js/js.cookie.fixed.js",
			"./libs/justified-layout/2.1.1/js/justified-layout.fixed.js",
			"./libs/kamil/0.1.1/js/kamil.fixed.js",
			"./libs/lazyload/10.19.0/js/lazyload.iife.fixed.js",
			"./libs/lazyload/3.2.2/js/lazyload.fixed.js",
			"./libs/lightgallery.js/1.1.1/src/lightgallery.fixed.js",
			"./libs/loadCSS/1.2.0/js/loadCSS.fixed.js",
			"./libs/loadJS/0.2.3/js/loadJS.fixed.js",
			"./libs/macy.js/2.3.1/js/macy.fixed.js",
			"./libs/ManUp.js/0.7/js/manup.fixed.js",
			"./libs/masonry/4.1.1/js/masonry.imagesloaded.pkgd.fixed.js",
			"./libs/masonry/4.1.1/js/masonry.pkgd.fixed.js",
			"./libs/minigrid/3.1.1/js/minigrid.fixed.js",
			"./libs/mustache/2.3.0/js/mustache.fixed.js",
			"./libs/mutation-observer/1.0.3/js/index.fixed.js",
			"./libs/object-path/0.11.5/js/object-path.fixed.js",
			"./libs/packery/2.1.1/js/packery.draggabilly.pkgd.fixed.js",
			"./libs/packery/2.1.1/js/packery.imagesloaded.draggabilly.pkgd.fixed.js",
			"./libs/packery/2.1.1/js/packery.imagesloaded.pkgd.fixed.js",
			"./libs/packery/2.1.1/js/packery.pkgd.fixed.js",
			"./libs/parallax-js/3.1.0/js/parallax.fixed.js",
			"./libs/photoswipe/4.1.0/js/photoswipe.photoswipe-ui-default.fixed.js",
			"./libs/platform/1.3.4/js/platform.fixed.js",
			"./libs/pnotify/1.3.1/js/pnotify.fixed.js",
			"./libs/polyfills/js/polyfills.fixed.js",
			"./libs/promise-polyfill/8.1.0/js/promise.fixed.js",
			"./libs/pwabuilder-serviceworkers/1.1.1/serviceWorker2/src/pwabuilder-sw.fixed.js",
			"./libs/qrjs2/0.1.9/src/qrjs2.fixed.js",
			"./libs/ReadMore.js/1.0.0/js/readMoreJS.fixed.js",
			"./libs/reqwest/2.0.5/js/reqwest.fixed.js",
			"./libs/resize/1.0.0/js/any-resize-event.fixed.js",
			"./libs/reusable/0.1.0/js/reusable.js",
			"./libs/ripple-js/1.4.4/js/ripple.fixed.js",
			"./libs/routie/0.3.2/js/routie.fixed.js",
			"./libs/shower/1.0.1/js/shower.fixed.js",
			"./libs/t.js/0.1.0/js/t.fixed.js",
			"./libs/tablesort/4.0.1/js/tablesort.fixed.js",
			"./libs/Tocca.js/2.0.1/js/Tocca.fixed.js",
			"./libs/ToProgress/0.1.1/js/ToProgress.fixed.js",
			"./libs/uwp-web-framework/2.0/src/uwp.core.fixed.js",
			"./libs/verge/1.9.1/js/verge.fixed.js",
			"./libs/webfontloader/1.6.2/js/webfontloader.fixed.js",
			"./libs/wheel-indicator/1.1.4/js/wheel-indicator.fixed.js",
			"./libs/zenscroll/3.2.2/js/zenscroll.fixed.js",
			"./libs/zoomwall.js/1.1.1/js/zoomwall.fixed.js"
		]
	},
};

gulp.task("lint-libbundle-js", function () {
	return gulp.src(options.libbundle.src)
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task("default", gulp.task("lint-libbundle-js"));
