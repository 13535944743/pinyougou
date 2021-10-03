$(function () {
    let flag = true;         //点击电梯之后会触发页面滚动事件，例如现在在一楼，点了三楼，会依次变为二楼，三楼，通过节流阀（互斥锁）来实现直接到达三楼
    $(window).scroll(function () {
        var recomTop = $(".recom").offset().top;
        if ($(document).scrollTop() >= recomTop) {
            $(".fixedtool").stop().fadeIn();
        }
        else {
            $(".fixedtool").stop().fadeOut();
        }

        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings("li").removeClass("current");
                }
            })
        }
    })

    $(".fixedtool li").click(function () {
        flag = false;
        $(this).addClass("current").siblings().removeClass("current");
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("html").stop().animate({
            scrollTop: current
        },function () {
            flag = true;  //点击电梯后触发的动画结束后，要把flag重新变回true
        });
        
    })
})