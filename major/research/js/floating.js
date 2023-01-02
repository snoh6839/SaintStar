$(function(){
  scrollDetail();

	let $sec = getLnbPositionTop();

	$("#wrap").scroll(function(){
		scrollDetail();
		scrollActive($sec);
	});

	$(window).resize(function(){
		init();
	})

	function init() {
		$sec = getLnbPositionTop();
		scrollDetail();
	}

	function scrollDetail() {
		let win_w = $("#wrap").width();
		let win_t = $("#wrap").scrollTop();
		let view_t = $("#print_area").position().top;
		let hd_h = $("#header").innerHeight();
		let pos_t = view_t - hd_h;
		let vis_h = $("#sub-visual").innerHeight();
		let top_h = $("#sub-top").outerHeight(true);
		let nav_h = $("#breadcrumb-nav").height();
		let cont_h = $("#view-default").innerHeight();
		let cont_pb = parseInt($("#print_area").css("padding-bottom").split("px"));
		let box_h = $("#detail-box").innerHeight();
		let all_h = (vis_h + top_h + nav_h + cont_h)  - (box_h + cont_pb);

		if(pos_t <= win_t && win_w > 1024) {
			$("#detail-box").addClass("floating");
		} else {
			$("#detail-box").removeClass("floating");
		}

		if(win_t >= all_h && win_w > 1024) {
			$("#detail-box").removeClass("floating");
			$("#side-nav").addClass("stop");
		} else {
			$("#side-nav").removeClass("stop");
		}
	}

	// 스크롤 하면 LNB active 되는 함수
	function scrollActive($sec) {
		let t = $("#wrap").scrollTop(); // wrap의 스크롤 위치
		let all_h = ($("#offset-parent").innerHeight() - $("#wrap").height()) + $("#footer").innerHeight();
		let all_h_math = Math.round(all_h);

		// nxm-tab-8__list가 하나인지 두개인지
		let one_lnb_check = $(".nxm-tab-8__list.last").length == 0 ? true : false;

		// 1. nxm-tab-8__list가 하나인 경우
		for(let idx=0; idx<$sec.length; idx++){
			if (t >= $sec[idx].top - 50) {
				$(".nxm-tab-8__sub-item").eq(idx).addClass("active").siblings().removeClass("active");

				// 2. nxm-tab-8__list가 두개인 경우
				if(! one_lnb_check){
					let second_section_position_top = $sec[second_section_idx].top;

					if(t >= second_section_position_top){
						$(".nxm-tab-8__list.first").find(".nxm-tab-8__sub-item").removeClass("active");
						$(".nxm-tab-8__list.first").find(".nxm-tab-8__item").removeClass("active");
						$(".nxm-tab-8__list.last").find(".nxm-tab-8__item").addClass("active");
					}
					else{
						$(".nxm-tab-8__list.last").find(".nxm-tab-8__sub-item").removeClass("active");
						$(".nxm-tab-8__list.last").find(".nxm-tab-8__item").removeClass("active");
						$(".nxm-tab-8__list.first").find(".nxm-tab-8__item").addClass("active");
					}
				}
			}
		}
		if(t >= all_h_math) {
			// nxm-tab-8__list active변경
			$(".nxm-tab-8__list.first").find(".nxm-tab-8__sub-item").removeClass("active");
			$(".nxm-tab-8__list.first").find(".nxm-tab-8__item").removeClass("active");
			$(".nxm-tab-8__list.last").find(".nxm-tab-8__item").addClass("active");

			// nxm-tab-8__sub-item active변경
			$(".nxm-tab-8__sub-item").removeClass("active");
			$(".nxm-tab-8__list:last-child .nxm-tab-8__sub-item:last-child").addClass("active");
		}
	}


	/*--------------------------------------------------------------------------
  | Lnb Click
	|--------------------------------------------------------------------------*/
	// 두번째 섹션이 시작되는 Side-style의 인덱스
	let second_section_idx = $(".side-style[data-second=true]").index();


	// Click : Lnb 링크 클릭
	$(".nxm-tab-8__sub-link").on("click",function(){
		let item_idx = $(this).parent().index(); // Lnb링크인덱스
		let section_idx = $(this).parents('.nxm-tab-8__list').index(); // Lnb섹션(.nxm-tab-8__list)인덱스
		let move_idx = 0; // scrollTo 인덱스

		if(section_idx == 1){
			move_idx = item_idx + second_section_idx;
		}
		else{
			move_idx = item_idx;
		}

		let scrollTop_value = $sec[move_idx].top;
		if($(this).parent().hasClass("first")) {
			scrollTop_value = $sec[move_idx].top - 160;
		}

		$("#wrap").animate({
			scrollTop: scrollTop_value
		});
	});

	// Click : Lnb 두꺼운 링크 클릭
	// $(".nxm-tab-8__link").on("click",function(){
	// 	let section_idx = $(this).parents('.nxm-tab-8__list').index();
	// 	let move_idx = 0; // scrollTo 인덱스


	// 	if(section_idx == 1){
	// 		move_idx = second_section_idx;
	// 	}

	// 	let scrollTop_value = $sec[move_idx].top;

	// 	$("#wrap").animate({
	// 		scrollTop: scrollTop_value
	// 	});
	// });

	// Get Position Top
	function getLnbPositionTop(){
		let $sec = [];
		$(".side-style").each(function(){
			let st = Math.floor($(this).position().top);
			$sec.push({"id":$(this).attr("id"), "top":st});
		});
		return $sec;
	}
});