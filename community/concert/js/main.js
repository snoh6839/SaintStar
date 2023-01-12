$(function(){

  /*--------------------------------------------------------------------------
  | Main Visual
  |--------------------------------------------------------------------------*/

  // Init
  let $main_visual = $("#main-visual");
  let autoplay = $main_visual.data("autoplay"),
      autoplaySpeed = $main_visual.data("autoplaySpeed"),
      infinite = $main_visual.data("infinite"),
      speed = $main_visual.data("speed");

  // Slick
  $main_visual.slick({
    dots: false,
    arrows: false,
    fade: true,
    autoplay : autoplay,
    autoplaySpeed : autoplaySpeed,
    infinite : infinite,
    speed : speed,
    cssEase: "linear",
    pauseOnFocus: false,
    pauseOnHover: false,
    touchMove: false,
    touchThreshold: 0,
    asNavFor: "#visual-news-slider",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          touchMove: true,
          touchThreshold: 10
        }
      }
    ]
  });

  let $news_slider = "#visual-news-slider";
  let $notice_slider = "#notice-slider";

  $($news_slider).slick({
    dots: false,
    arrows: false,
    fade: true,
    // autoplay : autoplay,
    autoplaySpeed : autoplaySpeed,
    infinite : infinite,
    speed : speed,
    cssEase: "linear",
    pauseOnFocus: false,
    pauseOnHover: false,
    asNavFor: "#main-visual",
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true
        }
      }
    ]
  }).on("beforeChange", function(event, slick, currentSlide, nextSlide){
    $(".main-visual__dots-item").removeClass("active").eq(nextSlide).addClass("active");
  });

  $($notice_slider).slick({
    arrows: false,
    vertical: true,
    verticalSwiping: true,
  }).on("beforeChange", function(event, slick, currentSlide, nextSlide){
    sliderDotsAction("#notice", nextSlide);
  });

  dotsMake($news_slider, "#visual-ctrl", "main-visual__dots-item", "main-visual__dots __main-visual__dots", "#visual-dots-list");
  dotsMake($notice_slider, "#notice-ctrl", "slider__dots-item", "slider__dots __slider__dots", "#notice-dots-list");

  sliderCount("#notice");

  $("#notice-prev").on("click", function(){
    $($notice_slider).slick("slickPrev");
  });
  $("#notice-next").on("click", function(){
    $($notice_slider).slick("slickNext");
  });


  /**********************************************
  * Research
  **********************************************/
  $("#main-research-slider").slick({
    variableWidth: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          variableWidth: false,
          slidesToShow: 2,
          dots: true
        }
      },{
        breakpoint: 640,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
          dots: true
        }
      }
    ]
  });

  $("#research-prev").on("click", function(){
    $("#main-research-slider").slick("slickPrev");
  });
  $("#research-next").on("click", function(){
    $("#main-research-slider").slick("slickNext");
  });


  /**********************************************
  * Fund
  **********************************************/
  let $item = ".__main-fund__item";

  $($item).first().addClass("active");
  $($item).first().find(".main-fund__box").show();

  $(".__main-fund__link").on("click", function(e){
    if(! $(this).closest($item).hasClass("active")) {
      e.preventDefault();
      $($item).removeClass("active");
      $(this).parent().addClass("active");
      $(".main-fund__box").stop().slideUp(300);
      $(this).find(".main-fund__box").stop().slideDown(300);
    }
  });


  /**********************************************
  * Community
  **********************************************/
  let $community_slider = "#community-slider";
  let community_link = ["/research/bk21#research-math", "/research/bk21#research-physics", "/research/bk21#research-chemistry", "/research/bk21#research-earth"];

  $("#community-slider").slick({
    arrows: false,
    fade : true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true
        }
      }
    ]
  }).on("beforeChange", function(event, slick, currentSlide, nextSlide){
    sliderDotsAction("#community", nextSlide);

    $(".main-community__item").each(function(idx){
      if(idx == nextSlide) {
        $(this).addClass("active").siblings().removeClass("active");
      }
    });
    $(".__community-btn").attr("href", community_link[nextSlide]);
  });

  dotsMake("#community-slider", "#community-ctrl", "slider__dots-item", "slider__dots __slider__dots", "#community-dots-list");
  sliderCount("#community");

  $("#community-prev").on("click", function(){
    $($community_slider).slick("slickPrev");
  });
  $("#community-next").on("click", function(){
    $($community_slider).slick("slickNext");
  });

  /**********************************************
  * Slider Func
  **********************************************/
  function dotsMake(slider, ctrl, item, dots_name, list) {
    $(slider + " .slick-slide").not(".slick-cloned").each(function(idx){
      let dots = '<li class="' + item + '" data-idx="' + idx + '"><button type="button" class="' + dots_name + '">' + idx + '</button></li>';

      $(list).append(dots);
    });
    $(list + " ." + item).first().addClass("active");

    let name = dots_name.split(" ");

    $(ctrl + " ." + name[1]).on("click", function(){
      let idx = $(this).parent().index();
      $(slider).slick("slickGoTo", idx);
    });
  }

  function sliderCount(slider) {
    let leng = $(slider + "-slider .slick-slide").not(".slick-cloned").length;

    (leng < 9) ? $(slider + "-total").text("0" + leng) : $(slider + "-total").text(leng);
  }

  function sliderDotsAction(slider, nextSlide) {
    let next_idx = nextSlide + 1;

    (next_idx < 9) ? $(slider + "-idx").text("0" + next_idx) : $(slider + "-idx").text(next_idx);

    $(slider + "-ctrl .slider__dots-item").each(function(){
      let idx = $(this).data("idx");

      if(nextSlide == 0) {
        $(slider + "-ctrl .slider__dots-item").removeClass("active show");
        setTimeout(function(){
          $(slider + "-ctrl .slider__dots-item").eq(nextSlide).addClass("active");
        }, 100);
      } else if(nextSlide == idx) {
        $(this).addClass("active");
      } else if (idx < nextSlide) {
        $(this).addClass("show");
      } else if(idx > nextSlide) {
        $(slider + "-ctrl .slider__dots-item").eq(next_idx).removeClass("active show");
        $(slider + "-ctrl .slider__dots-item").eq(nextSlide).removeClass("active show");
        setTimeout(function(){
          $(slider + "-ctrl .slider__dots-item").eq(nextSlide).addClass("active");
        }, 100);
      }
    });
  }

  $("#wrap").on("scroll", iconAnimation);

  function iconAnimation() {
    let t = $(this).scrollTop();
    let st = $("#main-majo").position().top - ($("#main-majo").innerHeight() / 2 + $("#header").innerHeight());
    let wrapper = $('.main-major__svg');

    if(t >= st) {
      setTimeout(draw, 300);
    }

    function draw() {
      wrapper.addClass('active');
    }
  }
}); /* Document End */

