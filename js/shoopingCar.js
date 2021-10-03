$(function () {
    $(".checkall").change(function () {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        }
        else {
            $(".cart-item").removeClass("check-cart-item");
        }

        getSum();
    })

    $(".j-checkbox").on("change", function () {
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        }
        else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        }
        else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }

        getSum();
    })

    $(".decrement").on("click", function () {
        let value = $(this).siblings(".itxt").val();
        if (value == 1) {
            return;
        }
        value--;
        $(this).siblings(".itxt").val(value);

        let p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        let price = (p * value).toFixed(2);

        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    })

    $(".increment").on("click", function () {
        let value = $(this).siblings(".itxt").val();
        value++;
        $(this).siblings(".itxt").val(value);

        let p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        let price = (p * value).toFixed(2);

        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    })

    getSum();

    function getSum() {
        var count = 0, money = 0;
        $(".j-checkbox:checked").parents(".p-checkbox").siblings(".p-num").children().children(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        })
        $(".amout-sum em").html(count);

        $(".j-checkbox:checked").parents(".p-checkbox").siblings(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).html().substr(1));
            console.log(i, ele);
        })
        $(".price-sum em").html("￥" + money.toFixed(2));
    }

    $(".p-action a").on("click", function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })

    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })

    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })
})