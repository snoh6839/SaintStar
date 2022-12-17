$(function(){

	/*--------------------------------------------------------------------------
	| Language Switcher
	|--------------------------------------------------------------------------*/

	// Click : Toggle
	$(".__language-switcher__btn").on("click", function(e){
		e.preventDefault();
		$(this).parent().toggleClass("open");
	});


	
});



/**********************************************/
	// FAQ
	/**********************************************/
	/* $(".nxFaq.toggle_type > li > a").click(function(e){
		e.preventDefault();
		var faq = $(this).parents('.nxFaq').attr('id'),
			$li = $(this).parent(),
			thisIdx = $li.index();
		if($(".nxFaq .answer").is(":animated")){
			return false;
		}
		if($li.hasClass('open')){
			$li.removeClass('open');
			$li.children('.answer').slideUp(300);
		}else{
			var openIdx = $("#"+faq).children("li.open").index();
			if(openIdx >= 0){
				$("#"+faq).children("li.open").children('.answer').slideUp(300);
				$("#"+faq).children("li.open").removeClass('open');
			}
			$li.addClass('open');
			$li.children('.answer').slideDown(300);
		}
	});
	$(".nxFaqTab > li > a").click(function(e){
		e.preventDefault();
		var target = $(this).parent().parent().data('target'),
			idx = $(this).data('idx');
		if(idx == 'all'){
			$("#"+target+" > li").removeClass('hide');
		}else{
			$("#"+target+" > li").addClass('hide');
			$("#"+target+" > li.nxFaqCate_"+idx).removeClass('hide');
		}
		$(".nxFaqTab > li > a.act").removeClass('act');
		$(this).addClass('act');

		$("#"+target+" > li.open").removeClass('open').children('.answer').hide();
		return;
	});
	$(".nxFaq.open_type > li > a").click(function(e){
		e.preventDefault();
	}); */


	/**********************************************/
	// History
	/**********************************************/
	/* $(".nxHistoryTab > li > a").click(function(e){
		e.preventDefault();
		var target = $(this).parent().parent().data('target'),
			idx = $(this).data('idx');
		if(idx == 'all'){
			$("#"+target+" > li").removeClass('hide');
		}else{
			$("#"+target+" > li").addClass('hide');
			$("#"+target+" > li.nxHisCate_"+idx).removeClass('hide');
		}
		$(".nxHistoryTab > li > a.act").removeClass('act');
		$(this).addClass('act');

		$("#"+target+" > li.open").removeClass('open').children('.answer').hide();
		return;
	}); */