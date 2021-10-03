function animate(obj, target, callback) {
    clearInterval(obj.timer); //清除原来的定时器，避免多次点击按钮，速度变快
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();    //callback为false，直接不看右边，和上面代码等价
            
        }
        else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }

    }, 30)
}