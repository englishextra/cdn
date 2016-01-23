$('.gridlinesToggle').on("click", function () {
	$('.gridlines').toggle();
});

$('.rtlToggle').on("click", function () {
	var current = $('html').attr("dir");
	if(current === "ltr") {
		$('html').attr("dir", "rtl");
	}
	else {
		$('html').attr("dir", "ltr");
	}
});

$('.fullGridToggle').on("click", function () {
	var $grid = $('.ms-grid');
	if(!$grid.hasClass('full')){
		$('.ms-grid').addClass('full');
		$('.gridlines').children('row').addClass('full');
	};
});

$('.marginGridToggle').on("click", function () {
	var $grid = $('.ms-grid');
	if($grid.hasClass('full')){
		$('.ms-grid').removeClass('full');
		$('.inside').removeClass('full');
	};
});

$('.fixedGridToggle').on("click", function() {
	var $grid = $('.ms-grid');
	if($grid.hasClass('zero-margin')) {
		$grid.removeClass('zero-margin');
	}
	if($grid.hasClass('fixed-small')) {
		$grid.removeClass('fixed-small');
	}
	if($grid.hasClass('fixed-large')) {
		$grid.removeClass('fixed-large');
	}
	$grid.toggleClass('fixed');
});

$('.fixedSmallGridToggle').on("click", function() {
	var $grid = $('.ms-grid');
	if($grid.hasClass('zero-margin')) {
		$grid.removeClass('zero-margin');
	}
	if($grid.hasClass('fixed')) {
		$grid.removeClass('fixed');
	}
	if($grid.hasClass('fixed-large')) {
		$grid.removeClass('fixed-large');
	}
	$grid.toggleClass('fixed-small');
});

$('.fixedLargeGridToggle').on("click", function() {
	var $grid = $('.ms-grid');
	if($grid.hasClass('zero-margin')) {
		$grid.removeClass('zero-margin');
	}
	if($grid.hasClass('fixed')) {
		$grid.removeClass('fixed');
	}
	if($grid.hasClass('fixed-small')) {
		$grid.removeClass('fixed-small');
	}
	$grid.toggleClass('fixed-large');
});

$('.zeroMarginToggle').on("click", function() {
	var $grid = $('.ms-grid');
	if($grid.hasClass('fixed')) {
		$grid.removeClass('fixed');
	}
	if($grid.hasClass('fixed-small')) {
		$grid.removeClass('fixed-small');
	}
	if($grid.hasClass('fixed-large')) {
		$grid.removeClass('fixed-large');
	}
	$grid.toggleClass('zero-margin');
});

$('.headersToggle').on("click", function () {
	$('.fullGridDemo h1, .fullGridDemo h2, .fullGridDemo h3, .fullGridDemo h4').toggle();
});

$('.gridBackgroundToggle').on("click", function () {
	$('.ms-grid').toggleClass('light-gray');
});

$(document).ready(function () {
	$('.colNum').each(function() {
		var cn = $(this).parent().attr('class')
		$(this).text(cn);
	});
});