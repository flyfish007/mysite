$(function () {

    // 菜单
    $(".MCBreadcrumbsBox_0 .arrow_down").click(function (e) {
        e.stopPropagation();
        if(!$(this).hasClass("trun_up")){
            $(".sideFixManueWrap").show();
            $(this).addClass("trun_up");
            $(".screenShadow").show();
        }else {
            sideFixManueHide();
        }

    })

    $(".sideFixManueWrap").click(function (e) {
        // e.stopPropagation();
    })


    function sideFixManueHide() {
        $(".sideFixManueWrap").hide();
        $(".MCBreadcrumbsBox_0 .arrow_down").removeClass("trun_up");
        $(".screenShadow").hide();
    }


    $(".sideFixManueWrap a").click(function () {
        $(".sideFixManueWrap a").removeClass("active") ;
        console.log("idx:"+$(this).index());
        $(this).addClass("active")

    })


    var placeList=[];
    var maxScorll = 0;
    var place_len=$(".sectiontitlePlace").length;
    var _w = parseInt($(window).width());
    if(_w>650){
        // var placeList = $(".sectiontitlePlace").toArray().map(function (node){
        //     return node.offset().top;
        // })
        document.onreadystatechange = function () {
            if(document.readyState=="complete") {
                for(var i=0;i<place_len;i++){
                    var top=parseInt($(".sectiontitlePlace").eq(i).offset().top);
                    placeList.push(top);
                }
                console.log("placeList:"+JSON.stringify(placeList));
                maxScorll=$(document).height()-$(window).height();
                console.log("maxScorll:===="+maxScorll);
                $(window).scroll(function () {
                    var now_top=$(document).scrollTop();
                    console.log("now_top:==="+now_top);
                    var manueIdx=checkManueIdx(now_top);
                    // console.log("manueIdx"+manueIdx);
                    $(".sideFixManueWrap a").removeClass("active");
                    $(".sideFixManueWrap a").eq(manueIdx).addClass("active");
                })
            }
        }

        function checkManueIdx(top) {
            // console.log("top >= maxScorll   >>>>>>>"+(top >= maxScorll));
            if(top >= maxScorll) {
                return place_len-1
            }
            // console.log("top<=placeList[0]   >>>>>>>"+(top<=placeList[0]));
            if(top<=placeList[0]){
                return 0
            }
            for(var j=0;j<place_len;j++){
                // console.log("j:"+j);
                // console.log("j!=place_len-1"+(j!=(place_len-1)));
                if(j!=(place_len-1)){
                    // console.log("top>placeList[j]&&top<placeList[j+1]  ===="+(top>placeList[j]&&top<placeList[j+1]));
                    if(top>=placeList[j]&&top<placeList[j+1]){
                        return j
                    }
                }else {
                    // console.log("j==(place_len-1)"+j==(place_len-1));
                    // console.log("top>=placeList[j]"+(top>=placeList[j]));
                    if(top>=placeList[j]){
                        return j
                    }
                }

            }
        }
    }

    $(".toTop").click(function() {
        $("html,body").animate({scrollTop:0}, 500);
    });

    //去掉目录上的三角和返回顶部
    if($(".sideFixManue a").length==0){
        $(".arrow_down").hide();
        $(".toTop").hide();
    }


})


