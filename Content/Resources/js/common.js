$(function () {
   /*====顶部菜单交互====*/
   $(".navigation li").hover(function () {
      $(this).addClass("active").siblings().removeClass("active");
   },function () {
       $(this).removeClass("active");
   })



    $(".tab_bar .menu-icon").click(function () {
       if($(".mainWrap").hasClass("move-left")){
           hideMobileManue()
       }else{
           showMobileManue()
       }
    })

    $(".exit-off-canvas").click(function () {
        hideMobileManue()
    })
    
    function showMobileManue() {
         $("body").addClass("body_clock");
         $(".tab_bar").addClass("removeFix");
         $(".mainWrap").addClass("removePad");
         $(".tab_bar").animate({'margin-left':'-250px'});
         $(".main-section").animate({'margin-left':'-250px'});
         $(".exit-off-canvas").show().animate({'right':'250px'});
         $(".navigation-wrapper").animate({'right':'0'});
         $(".MCBreadcrumbsBox_0").animate({'right':'250px','left':'-250px'});
         if($(".swiper-button-next").length>0){
             $(".swiper-button-next").animate({'right':'260px'});
         }
    }
    
    function hideMobileManue() {

        $(".tab_bar").animate({'margin-left':'0'});
        $(".main-section").animate({'margin-left':'0'});
        $(".exit-off-canvas").animate({'right':'0'}).hide();
        $(".navigation-wrapper").animate({'right':'-250px'});
        $(".navigation ul").animate({'right':'-250px'});
        $(".MCBreadcrumbsBox_0").animate({'right':'0','left':'0'});
        if($(".swiper-button-next").length>0){
            $(".swiper-button-next").animate({'right':'10px'});
        }
        setTimeout(function () {
            $(".tab_bar").removeClass("removeFix");
            $(".mainWrap").removeClass("removePad");
            $("body").removeClass("body_clock");
        },1000)



    }

    $(".navigation>li.has-submenu>a").click(function (e) {
        var win_w=$(window).width();
        if(win_w>1200){
            return
        }
        e.preventDefault();
        var idx=$(this).parent().index();
        var $sub_manue=$(".navigation>li").eq(idx).find("ul");
        if(!$(this).parent().hasClass("hasPrepend")){
            var $clone="<li class='clone'> <a> "+$(this).html()+ "</a> </li>";
            $sub_manue.prepend($clone);
            $sub_manue.prepend("<li class='back'> <a>返回</a> </li>");
            $(this).parent().addClass("hasPrepend");
        }
        $sub_manue.animate({'right':'0'});
    })

    $(document).on('click', '.navigation ul li.back', function() {
        console.log("hello");
        $(this).parent().animate({'right':'-250px'});
    })


        // 搜索
    // $(".search-field").keyup(function () {
    //     searchSlideShow()
    // })

    // $(".search_slide li").click(function () {
    //     window.location.href="./Search.htm#search-"+$(this).find(".value").html();
    //     searchSlideHide()
    // })


    // $(document).click(function(){
    //     searchSlideHide()
    // });


    // $(".search-field").click(function (e) {
    //     e.stopPropagation();
    //     searchSlideShow()

    // })

    // $(".MCBreadcrumbsBox_0").click(function (e) {
    //     e.stopPropagation();
    // })

    // function searchSlideHide() {
    //     $(".search_slide").hide();
    // }

    // function searchSlideShow() {
    //     $(".search_slide").show();
    //     if(!!$(".search-field").val()){
    //         $(".search_slide ul").hide();
    //         $(".search_slide .searchResult").show();
    //     }else {
    //         $(".search_slide ul").hide();
    //         $(".search_slide .hot").show();
    //     }

    // }



})


