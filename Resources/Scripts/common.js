$(function () {
    // 搜索
    $(".search-field").keyup(function () {
        searchSlideShow()
    })

    $(".search_slide li").click(function () {
        window.location.href="./Search.htm#search-"+$(this).find(".value").html();
        searchSlideHide()
    })


    $(document).click(function(){
        searchSlideHide()
        sideFixManueHide()
    });


    $(".search-field").click(function (e) {
        e.stopPropagation();
        searchSlideShow()

    })

    $(".MCBreadcrumbsBox_0").click(function (e) {
        e.stopPropagation();
    })

    function searchSlideHide() {
        $(".search_slide").hide();
    }

    function searchSlideShow() {
        $(".search_slide").show();
        if(!!$(".search-field").val()){
            $(".search_slide ul").hide();
            $(".search_slide .searchResult").show();
        }else {
            $(".search_slide ul").hide();
            $(".search_slide .hot").show();
        }

    }


    // 菜单
    $(".MCBreadcrumbsBox_0 .arrow_down").click(function () {

        if(!$(this).hasClass("trun_up")){
            $(".sideFixManueWrap").show();
            $(this).addClass("trun_up");
            $(".screenShadow").show();
        }else {
            sideFixManueHide();
        }

    })

    function sideFixManueHide() {
        $(".sideFixManueWrap").hide();
        $(".MCBreadcrumbsBox_0 .arrow_down").removeClass("trun_up");
        $(".screenShadow").hide();
    }

    $(".sideFixManue a").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })

    var placeList=[];
    var place_len=$(".sectiontitlePlace").length;
    for(var i=0;i<place_len;i++){
        var top=parseInt($(".sectiontitlePlace").eq(i).offset().top);
        placeList.push(top);
    }

    var maxScorll=$(document).height() - $(window).height()*2;

    $(window).scroll(function () {
        var now_top=$(document).scrollTop();
        var manueIdx=checkManueIdx(now_top);
        $(".sideFixManue a").eq(manueIdx).addClass("active").siblings().removeClass("active");
    })



    function checkManueIdx(top) {
        // console.log("top:===="+top+"/////maxScorll:===="+maxScorll);
        if(top >= maxScorll) {
            return place_len-1
        }

        for(var j=0;j<place_len;j++){
            if(top<placeList[j]){
                if(j!=0){
                    return j-1
                }else {
                    return j
                }

            }
        }
    }

})


