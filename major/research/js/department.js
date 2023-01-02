$(function(){
	let $sec = [];
	$(".side-style").each(function(){
		let st = $(this).offset().top + $(this).height() + 90;
		$sec.push({"id":$(this).attr("id"), "top":st});
	});

	$("#wrap").on("load scroll", aside_scroll);

	let current = 0;
	function aside_scroll(){
		let t = $(this).scrollTop();
		let i = 0;
		for(let idx=0; idx<$sec.length; idx++){
			i = idx;
			if(t <= $sec[idx].top) break;
		}
		if(current != i){
			current = i;
			history.pushState(null, null, "#"+$sec[i].id);
		}
	}
});