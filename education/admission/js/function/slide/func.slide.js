$(function(){

  // nxslide 플러그인 with Slick
  $.fn.nxslide = function(slick_options){

    // 옵션
    slick_options = $.extend({
    }, slick_options);

    var slide = $(this).attr("id");
    var $slide = $("#"+ slide);
    var infinite = $slide.data("infinite") ? true : false;
    var autoplay = $slide.data("autoplay") ? true : false;
    var autoplay_act = autoplay;
    var autoplay_time = $slide.data("autoplaySpeed") ? $slide.data("autoplaySpeed") : 5000;
    var speed = $slide.data("speed") ? $slide.data("speed") : 500;
    var video_info = $(this).data("video");
    var youtube_info = $(this).data("youtube");
    var clearTime;
    var has_video = false;
    var has_youtube = false;
    var first_slide_video = false;
    var first_slide_youtube = false;
    var youtube_player = [];
    var youtube_player_timer = [];

    // 비디오 유무
    if(video_info !== undefined){
      has_video = true;
      infinite = false;
      if(video_info[0].d_no == 1){
        first_slide_video = true;
        autoplay_act = false;
      }
    }

    // 유튜브 유무
    if(youtube_info !== undefined){
      has_youtube = true;
      infinite = false;
      if(youtube_info[0].d_no == 1){
        first_slide_youtube = true;
        autoplay_act = false;
      }
      youtube_load(youtube_info, first_slide_youtube);
    }

    // 옵션 추가
    slick_options.infinite = infinite;
    slick_options.autoplay = autoplay_act;
    slick_options.autoplay_time = autoplay_time;
    slick_options.speed = speed;

    // Slick
    $slide.on("init", function(slick){
      if(!has_video && !has_youtube) return;

      // 첫슬라이드가 동영상일때 재생
      if(first_slide_video){
        $("#" + slide + "-video-" + video_info[0].idx).trigger("play");
        if(autoplay){ // 자동재생일때만 다음 슬라이드로
          clearTimeout(clearTime);
          clearTime = setTimeout(function(){
            $slide.slick("slickGoTo", 1);
          }, parseInt(video_info[0].play_time) + 100);
        }
      }

      // 첫슬라이드가 유튜브일때 재생
      if(first_slide_youtube && autoplay){
        // 자동재생일때만 다음 슬라이드로
        clearTimeout(clearTime);
        clearTime = setTimeout(function(){
          $slide.slick("slickGoTo", 1);
        }, parseInt(youtube_info[0].play_time) + 600);
      }

    // beforeChange
    }).slick(slick_options).on("beforeChange", function(event, slick, currentSlide, nextSlide){

      if(has_video) $slide.find(".nx-slide-video").trigger("pause"); // 비디오 일시중지
      if(has_youtube){ // 유튜브 일시중지
        for(var i=0; i<youtube_player.length; i++){
          if(!youtube_player[i]) continue;
          if(youtube_player[i].pauseVideo !== undefined) youtube_player[i].pauseVideo();
        }
      }

    // afterChange
    }).on("afterChange", function(event, slick, currentSlide){

      if(!has_video && !has_youtube) return; // 비디오, youtube 없으면 return

      $slide.slick("slickPause");
      var current_idx = currentSlide + 1;
      var nextSlide = currentSlide + 1;
      if(slick.slideCount == nextSlide) nextSlide = 0;

      var is_video = false;
      var is_youtube = false;
      var video_idx = 0;
      var youtube_idx = 0;
      var time = autoplay_time;

      // 비디오 체크
      if(video_info !== undefined){
        for(var i=0; i<video_info.length; i++){
          if(video_info[i].d_no == current_idx){
            is_video = true;
            video_idx = video_info[i].idx;
            time = video_info[i].play_time;
            $("#"+ slide + "-video-"+ video_idx).trigger("play"); // 재생
            break;
          }
        }
      }

      // 유튜브 체크
      if(youtube_info !== undefined){
        for(var i=0; i<youtube_info.length; i++){
          if(youtube_info[i].d_no == current_idx){
            var d_no = youtube_info[i].d_no;
            is_youtube = true;
            youtube_idx = youtube_info[i].idx;
            time = youtube_info[i].play_time;
            youtube_player[youtube_idx].playVideo();
            break;
          }
        }
      }

      if(!autoplay) return; // 자동재생 사용안할시 return

      clearTimeout(clearTime);
      clearTime = setTimeout(function(){
        $slide.slick("slickGoTo", nextSlide);
      }, time);
    });

    /* Y O U   T U B E */
    function youtube_load(info, first_slide_youtube){
      if(typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined'){
        $.getScript("https://www.youtube.com/iframe_api", function() {
          loadVideo(info, first_slide_youtube);
        });
      }
      return;
    }

    function loadVideo(info, first_slide_youtube){
      if(!info) return;
      var playing = first_slide_youtube ? true : false;
      for(var i=0; i<info.length; i++){
        createPlayer(info[i], playing);
        playing = false;
      }

      function createPlayer(playerInfo, playing){
        window.YT.ready(function(){
          var player = new window.YT.Player("youtube_" + playerInfo.idx, {
            width: "100%",
            height: "100vh",
            videoId: playerInfo.code,
            playerVars: {
              autoplay : playing ? 1 : 0,
              controls: 0,
              rel: 0,
              showinfo: 0,
              autohide: 0,
              enablejsapi: 1,
              mute: 1,
              // origin: 'http://localhost'
            },
            events: {
              onStateChange: onPlayerStateChange
            }
          });
          youtube_player[playerInfo.idx] = player;
          return player;
        });
      }

      function onPlayerStateChange(event){
        var yid = event.target.h.id;
        if(youtube_player_timer.yid == undefined) youtube_player_timer.yid = 0;
        var videoStatuses = Object.entries(window.YT.PlayerState)

        // console.log(videoStatuses.find(status => status[1] === event.data)[0])
        if(event.data == 1){ // 재생중
          youtube_player_timer.yid = setInterval(function(){
            youtubeInterval(event.target);
          }, 450);
        }else if(event.data == 0){ // 혹시 끝나면
          clearInterval(youtube_player_timer.yid);
          event.target.playVideo();
        }else{ // 이외
          clearInterval(youtube_player_timer.yid);
        }
      }

      function youtubeInterval(t){
        var ct = t.getCurrentTime();
        var du = t.getDuration();
        if((du - ct) < 0.95){
          clearInterval(youtube_player_timer.yid);
          t.seekTo(0);
        }
        return;
      }
    }
  };
});