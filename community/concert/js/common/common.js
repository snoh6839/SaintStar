/*--------------------------------------------------------------------------
| Javascript Common
|--------------------------------------------------------------------------*/

// Variable
const agt = navigator.userAgent;
const is_mobile = (/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|windows phone|Mobile|Phone)/.test(agt));

// Func : Remove Tag
let remove_tag = function(elem){
  let extractTextPattern = /(<([^>]+)>)/gi;
  return elem.replace(extractTextPattern, "");
}

// Format : String %s
let string_format = function(format){
  let i = 1;
  while (/%s/.test(format)){
    format = format.replace("%s", arguments[i++]);
  }
  return format;
}

// Format : nl2br
let nl2br = function(str, is_xhtml){
  let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

// Cookie : 쿠키생성
let set_cookie = function(name, value, exp){
  let date = new Date();
  date.setTime(date.getTime() + exp*60*60*1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

// Cookie :  쿠키로드
let get_cookie = function(name){
	let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? value[2] : null;
};

// Cookie :  쿠키연장
let extend_cookie = function(name, exp){
  let cookie_value = getCookie(name);
  if(cookie_value) setCookie(name, cookie_value, exp);
}

// Cookie :  쿠키삭제
let delete_cookie = function(name){
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

// Oninput : onlynumber
function onlynumber(input){
  input.value = input.value.replace(/[^0-9.]/g, '');
}

$(function(){

  /*--------------------------------------------------------------------------
  | Scroll & Load
  |--------------------------------------------------------------------------*/

  // Event
	$(window).on("load", loadHandler);
  $("#wrap").on("scroll", scrollHandler);

	// Func : loadHandler
	function loadHandler(){
		let t = $("#wrap").scrollTop();
    floating(t);
    desktop_top_button(t);
	}

	// Func : Scroll
	function scrollHandler(){
		let t = $(this).scrollTop();
    floating(t);
    desktop_top_button(t);
	}

  // Func : floating
	function floating(t){
		(t > 50) ? $("#header").addClass("floating") : $("#header").removeClass("floating");
		return;
	}

	// Func : desktop_top_button
	function desktop_top_button(t){
		(t > 550) ? $("#btn-desktop-top").addClass("show") : $("#btn-desktop-top").removeClass("show");
		return;
	}

  /* 테이블 좌우 스크롤 */
  $(".scroll-table").on("scroll", function(){
    $(".scroll-guide").remove();
  });


  /*--------------------------------------------------------------------------
  | Click
  |--------------------------------------------------------------------------*/

  // Click : Desktop To Top
  $("#btn-desktop-top").on("click", function(e){
		e.preventDefault();
    $("#wrap").animate({scrollTop : 0});
  });

  // Click : Page Transition
  $("a[data-page_transition=1]").on("click", function(e){
    e.preventDefault();
    let link = $(this).attr("href");
    $("#wrap").addClass("move");
    setTimeout(() => {
      window.location.href = link;
    }, 75);
  });

  // Click : Lable Trigger Click
  $(".__label-trigger-click").on("keyup", function(e){
		if(e.keyCode == 13 || e.keyCode == 32){ // Enter | Space Bar
      let target = $(this).attr("for");
      if(target) $("#"+target).trigger("click");
		}
	});

  // Click : Search Reset
  $(".__search-reset").on("click", function(e){
    e.preventDefault();
    let form = $(this).attr("data-form");
    let select = $(this).attr("data-select") ? $(this).attr("data-select") : '';
    let keyword = $(this).attr("data-keyword") ? $(this).attr("data-keyword") : 'keyword';
    if(select) $("#"+select+" option[value='']").attr("selected", true);
    $("#"+keyword).attr("value", "");
    $("#"+form).submit();
  });

  /* 프린트 */
	$(".__print").click(function(){
		html2canvas(document.querySelector("#print_area"),{
			useCORS: true,
    }).then(function(canvas) {
			var imgageData = canvas.toDataURL("image/png");
			var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");

			var img = '<img src="'+newData+'" alt="" style="max-width:100%" />';
			var newWin=window.open('','Print-Window');
			newWin.document.open();
			var tag = '<html><body onload="window.print()">'+img+'</body></html>';
			newWin.document.write(tag);
			newWin.document.close();
			setTimeout(function(){newWin.close();},200);
    });
	});

  /* Family Site */
  $("#family-btn").on("click", function(){
    $(this).parent().toggleClass("open");
    $("#family-site").slideToggle(300);
  })


  /*--------------------------------------------------------------------------
  | Focus & Blur
  |--------------------------------------------------------------------------*/

  // Focus : Input Focus
  $(".__input--focus").focus(function(){
    $(this).addClass("focus");
  });

  // Blur : Input Blur
  $(".__input--focus").blur(function(){
    $(this).removeClass("focus");
  });

  // Focus : Input Parent Focus
  $(".__input__parent--focus").focus(function(){
    $(this).parent().addClass("focus");
  });

  // Blur : Input Parent Blur
  $(".__input__parent--focus").blur(function(){
    $(this).parent().removeClass("focus");
  });


  /*--------------------------------------------------------------------------
	| Functions : Term
	|--------------------------------------------------------------------------*/

	// Click : Open
	$(".__nxterm--open").on("click", function(e){
		e.preventDefault();
		var idx = $(this).data("idx");
		$.ajax({
			type : 'post',
			url : '/NXFUNCTION/common/get_term',
			data : {idx : idx},
			dataType : 'json',
			success : function(data){
        if(!data){
          alert('해당 ID의 약관이 존재하지 않습니다.');
          return false;
        }
				var elem = nxterm_make_popup_elem(data);
				$("#wrap").append(elem);
        setTimeout(function(){
          $("#wrap #nxterm__popup").addClass("show");
        }, 1);
			}
		});
	});

	// Click : Close
	$("#wrap").on("click", ".__nxterm--close", function(e){
		e.preventDefault();
    term_mask.destory();
	});

	// Func : nxterm_make_popup_elem
  let term_mask;
	function nxterm_make_popup_elem(data){
    term_mask = $("#wrap").mask({id:"nxterm_mask", target:"nxterm__popup", is_remove:true});

		let elem = '';
		elem += '<div id="nxterm__popup" class="nxterm__popup">';
		elem += '	<div class="nxterm__popup-header">';
		elem += '	 <h3 class="nxterm__popup-title">'+ data.post_title +'</h3>';
		elem += '	 <button type="button" class="nxterm__popup--close-icon __nxterm--close" data-close_target="nxterm__popup"><i class="xi-close"></i></button>';
		elem += '	</div>';
		elem += '	<div class="nxterm__popup-content">';
		elem += '	 <div class="editor-contents scrollbar--default">'+ data.post_content +'</div>';
		elem += '	 </div>';
		elem += '	<div class="nxterm__popup-footer">';
		elem += '	 <button type="button" class="nxterm__popup--close-btn __nxterm--close" data-close_target="nxterm__popup">확인</button>';
		elem += '	</div>';
		elem += '</div>';
		return elem;
	}


  /*--------------------------------------------------------------------------
  | Plugin
  |--------------------------------------------------------------------------*/

  // Plugin : Mask
  $.fn.mask = function(options){

    // Init
    let mask_id = options.id,
        target = options.target,
        zindex = options.zindex ? options.zindex : false,
        is_mobile_menu = options.is_mobile_menu ? options.is_mobile_menu : false,
        is_remove = options.is_remove ? options.is_remove : false,
        destroy = options.destroy ? options.destroy : false;
    let $this = this;
    let elem = "<div id=\""+ mask_id +"\" class=\"mask\" data-close=\""+ target +"\"";
        if(zindex) elem += "style=\"z-index:"+ zindex +"\"";
        elem += "></div>";

    let FP = {
      destory : _destory
    }

    // Destroy
    if(destroy){
      _destory();
      return false;
    }else{
      $this.append(elem);
      setTimeout(function(){
        $("#"+mask_id).addClass("show");
      }, 1);
    }

    // Click : Mask Click
    $("#"+mask_id).on("click", maskClickHandler);

    // Func : Mask Click
    function maskClickHandler(){
      // alert('close');
      if(is_mobile_menu){
        $("body").removeClass("o-hd");
		    $("#header").removeClass("mobile-open");
      }
      _destory();
    }

    // keydown : keydown (ESC)
    window.addEventListener("keydown", keydownHandler);

    // Func : keydown (ESC)
    function keydownHandler(e){ // ☆이벤트가 쌓이는 문제
      if(e.keyCode == 27 || e.which == 27){
        alert('esc');
        if(is_mobile_menu){
          $("body").removeClass("o-hd");
          $("#header").removeClass("mobile-open");
        }
        _destory();
      }
    }

    // Func : Distory
    function _destory(){
      is_remove ? $("#"+target).remove() : $("#"+target).removeClass("show");
      $("#"+mask_id).remove();
      $("#"+mask_id).off("click", maskClickHandler);
      window.removeEventListener("keydown", keydownHandler);
    }
    return FP;
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
