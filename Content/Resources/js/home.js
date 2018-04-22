$(function () {
    /*==========滚动图片slider==========*/

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    /*=======首页左右布局图片高度计算=========*/

    resizesliderheight();
    $(window).resize(function () {
        resizesliderheight();

    })

    function resizesliderheight() {
        var window_w = $(window).width();
        var pic_w=650;
        var pic_h=649;
        var height_slider;
        if (window_w < 1200) {
            height_slider = window_w * pic_h / 1200;
            if(window_w < 767){
                height_slider= window_w;
            }
        } else{
            height_slider = pic_h;

        }

        if(window_w<1200&&window_w>=767){
            homeMapSet(height_slider/pic_h);
        }else if(window_w<767){
            homeMapSet(window_w/pic_w);
        }

        $(".swiper-container").css("height", String(height_slider) + "px");
    }

    /*========homdeMap========*/

    function homeMapSet(_pc) {
        $("area").each(function(e){
            var _cd = $(this).attr("coords");
            var _carr = _cd.split(",");
            for(var i=0;i<_carr.length;i++){
                _carr[i] = Math.ceil(_carr[i] * _pc);
            }
            $(this).attr("coords",_carr.join(","));
        });
    }



})