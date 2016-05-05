/*!
 * superbox modified http://toddmotto.com/introducing-superbox-the-reimagined-lightbox-gallery/
 */
"undefined" !== typeof window.jQuery && (function (a) {
	a.fn.SuperBox = function (b) {
		var c = a('<div class="superbox-show"></div>'),
		d = a('<div class="superbox-current-desc">');
		b = a('<div class="superbox-close"></div>');
		c.append(d).append(b);
		return this.each(function () {
			a(".superbox-list").click(function () {
				var b = a(this).find(".superbox-desc"),
				e = b.html();
				d.html(e);
				0 == a(".superbox-current-desc").css("opacity") && a(".superbox-current-desc").animate({
					opacity : 1
				});
				a(this).next().hasClass("superbox-show") ? c.toggle() : c.insertAfter(this).css("display", "block");
				a("html, body").animate({
					scrollTop : c.position().top - b.height()
				}, "medium")
			});
			a(".superbox").on("click", ".superbox-close", function () {
				a(".superbox-current-desc").animate({
					opacity : 0
				}, 200, function () {
					a(".superbox-show").slideUp()
				})
			})
		})
	}
})(jQuery);
