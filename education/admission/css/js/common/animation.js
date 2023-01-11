$(function(){

	$.belowthefold = function(element, settings){
		var fold = $(window).height() + $(window).scrollTop();
		return fold <= $(element).offset().top - settings.threshold;
	};
	$.abovethetop = function(element, settings){
		var top = $(window).scrollTop();
		return top >= $(element).offset().top + $(element).height() - settings.threshold;
	};
	$.rightofscreen = function(element, settings){
		var fold = $(window).width() + $(window).scrollLeft();
		return fold <= $(element).offset().left - settings.threshold;
	};
	$.leftofscreen = function(element, settings){
		var left = $(window).scrollLeft();
		return left >= $(element).offset().left + $(element).width() - settings.threshold;
	};
	$.inviewport = function(element, settings){
		return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	};
	$.extend($.expr[':'], {
		"below-the-fold": function(a, i, m) {
			return $.belowthefold(a, {threshold : 0});
		},"above-the-top": function(a, i, m) {
			return $.abovethetop(a, {threshold : 0});
		},"left-of-screen": function(a, i, m) {
			return $.leftofscreen(a, {threshold : 0});
		},"right-of-screen": function(a, i, m) {
			return $.rightofscreen(a, {threshold : 0});
		},"in-viewport": function(a, i, m) {
			return $.inviewport(a, {threshold : -50});
		}
	});

  start_animate();
  $("#wrap").on("scroll", start_animate);

	function start_animate(){
		if(is_mobile) return false;
		var j = 0;
		$(".animate-element:in-viewport").each(function(){
			var $this = $(this);
			if(!$this.hasClass("start-animate") && !$this.hasClass("animated")){
				$this.addClass("start-animate");
				setTimeout(function(){
					$this.addClass("animated");
				}, 250 * j);
				j++;
			};
		});
	}
});