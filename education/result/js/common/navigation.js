$(function(){

  /*--------------------------------------------------------------------------
  | Main Navigation
  |--------------------------------------------------------------------------*/

  // Init
  var nav_item = ".__main-nav__item";

  // Hover : Main Navigation Depth1 Item
	$(nav_item).on("mouseenter focusin", function(){
		$(this).addClass("hover");
	})
	$(nav_item).on("mouseleave focusout", function(){
		$(this).removeClass("hover");
	});

	$("#main-nav").on("mouseenter focusin", function(){
		$(this).closest("#header").addClass("hover");
	})
	$("#header").on("mouseleave focusout",function(){
		$(this).removeClass("hover");
	});

	$("#btn-megamenu").on("click", function(){
		$(this).toggleClass("close");
		$("#header").toggleClass("show");
	});


  /*--------------------------------------------------------------------------
  | Mobile Navigation
  |--------------------------------------------------------------------------*/

  // Init
  var btn_mobile = "#btn-mobile";
  var btn_mobile_close = "#btn_mobile--close";
  var mobile_nav = "#mobile-nav";
  var sub_nav = ".main-nav__sub";

  // Click : Mobile Menu Toggle Btn
	$(btn_mobile).on("click", function(e){
		e.preventDefault();
		if($("#header").hasClass("mobile-open")){
			$(this).removeClass("close");
			mobile_menu_close();
		}else{
			$(this).addClass("close");
			mobile_menu_open();
		}
	});

  // Click : Mobile Menu Close Btn
	$(btn_mobile_close).on("click", function(e){
		e.preventDefault();
		mobile_menu_close();
	});

  // Click : Toggle Submenu
  $(mobile_nav + " .main-nav__child--button").on("click", function(e){
		e.preventDefault();
    var $parent = $(this).parent();
    var $child = $(this).next(sub_nav);
		if($child.is(":animated")) return;
    if($parent.hasClass("open")){
      $parent.removeClass("open");
      $child.slideUp(350);
    }else{
      var idx = $parent.index();
      $parent.addClass("open");
      $child.slideDown(350);
      $(mobile_nav + " " + nav_item + ".depth1:not(:eq("+idx+"))").removeClass("open").children(sub_nav).slideUp(350);
    }
  });

  // Each : Set Active Menu Open
  $(mobile_nav + " > " + nav_item).each(function(){
    if($(this).hasClass("act") && $(this).hasClass("has-child")){
      $(this).addClass("open");
      $(this).children(sub_nav).show();
      return false;
    }
  });

  // Func : mobile_menu_open
  var mobile_mask;
	function mobile_menu_open(){
		$("body").addClass("body-mobile");
		$("#header").addClass("mobile-open");
    mobile_mask = $("#wrap").mask({id:"mobile_mask", target:"mobile-menu", zindex:1999, is_mobile_menu:true});
    $("#mobile-menu").addClass("show");
	}

  // Func : mobile_menu_close
	function mobile_menu_close(){
		$("body").removeClass("body-mobile");
		$("#header").removeClass("mobile-open");
    mobile_mask.destory();
	}


  /*--------------------------------------------------------------------------
  | BreadCrumb Menu
  |--------------------------------------------------------------------------*/

  // Click : Toogle Menu
	$(".__breadcrumb-menu__link").on("click", function(e){
		e.preventDefault();
		var p_idx = $(this).parent().index();
		$(".breadcrumb-menu__item:not(.depth"+ p_idx +")").removeClass("open");
		$(this).parent().toggleClass("open");
	});

  // Click : Document
  $(document).mouseup(function(e){
		if($(".breadcrumb-menu__item").has(e.target).length === 0){
			$(".breadcrumb-menu__item").removeClass("open");
		}
	});


  /*--------------------------------------------------------------------------
  | Scroll Link
  |--------------------------------------------------------------------------*/

  // Load : Check Scroll Link
  $(window).on("load", function(){
		var str = $(location).attr("href");
		scroll(str);
	});

  // Click : Scroll Link
	$(".scroll > a").on("click", function(e){
		e.preventDefault();
		var str = $(this).attr("href");
		scroll(str);
	});

  // Func : Scroll Exe
	function scroll(str){
    var n = str.indexOf("#!");
		if(n > 0){
			var section = str.substring(n+2, str.length);
			if($("#"+section).length > 0){
				var scrollPosition = $("#"+section).offset().top - $("#header").height();
				$("#wrap").animate({scrollTop: scrollPosition}, 1200);
			}
		}
	}



	/**********************************************/
	// Document Click
	/**********************************************/
	/* $(document).mouseup(function(e){
		if($(".language-switcher").has(e.target).length === 0){
			$(".language-switcher").removeClass('open');
		}

		// breadcrumb-menu
		if($("#breadcrumb-menu > li").has(e.target).length === 0){
			$("#breadcrumb-menu > li").removeClass('open');
		}
	}); */
});
