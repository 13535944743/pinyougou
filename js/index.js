window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focus_ul = focus.querySelector('ul');
    var focus_ol = focus.querySelector('ol');
    var focusWidth = focus.offsetWidth;
    var num = 0;
    var circle = 0;  //用来控制点击后下面的小圆圈也跟着变化

    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';

        clearInterval(timer);

        timer = null;  //保险
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';

        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)       //离开后重新开启自动轮播
    })
    for (var i = 0; i < focus_ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        focus_ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var j = 0; j < focus_ol.children.length; j++) {
                focus_ol.children[j].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('data-index');
            num = index;  
            circle = index; //点击小圆圈后，设置num和circle为对应的index
            animate(focus_ul, -index * focusWidth);
        })
    }
    focus_ol.children[0].className = 'current';

    var first = focus_ul.children[0].cloneNode(true);
    focus_ul.appendChild(first);

    var flag = true;

    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == focus_ul.children.length - 1) {
                focus_ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(focus_ul, -num * focusWidth, function () {
                flag = true;
            });
        
            circle++;
            if (circle == focus_ol.children.length) {
                circle = 0;
            }
            circleChange();
        }

    })

    arrow_l.addEventListener('click', function () {
        if (flag == true) {
            flag = false;
            if (num == 0) {
                num = focus_ul.children.length - 1;
                focus_ul.style.left = num * focusWidth;
            
                console.log(num);
            }
            num--;
            animate(focus_ul, -num * focusWidth, function () {
                flag = true;
            });
        
            circle--;
            if (circle < 0) {
                circle = focus_ol.children.length - 1;
            }
            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < focus_ol.children.length; i++) {
            focus_ol.children[i].className = '';
        }
        focus_ol.children[circle].className = 'current';
    }
    
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000)
})
