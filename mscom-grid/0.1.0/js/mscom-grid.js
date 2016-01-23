var msGrid = (function() {
	var findPrecedingColumns = function() {
		$('.col-3-4').prev('.col-1-4').addClass('preceding-col-1-4');
		$('.col-4-6').prev('.col-2-6').addClass('preceding-col-2-6');
		$('.col-4-6').prev('.col-1-6').addClass('preceding-col-1-6');
		$('.col-6-8').prev('.col-2-8').addClass('preceding-col-2-8');
		$('.col-6-8').prev('.col-1-8').addClass('preceding-col-1-8');
		$('.col-12-24').prev('.col-6-24').addClass('preceding-col-6-24');
	};

	var obj = {
		init: function() {
			findPrecedingColumns();
		}
	};

	return obj;
})();

msGrid.init();