window.onload = () => {
  //1.搜索栏
  search()
  //2.轮播图
  banner()
  //3.倒计时功能
  downTime()
}

//当屏幕向上向下滚动的时候，搜索栏的透明度改变
let search = () => {
  let searchBox = document.querySelector('.jd_search_box')
  let height = document.querySelector('.jd_banner').offsetHeight

  window.onscroll = () => {
    //我的谷歌支持的是documentElement
    let scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
    let opacity = 0

    if (scrollTop < height) {
      opacity = scrollTop / height * 0.85
    } else {
      opacity = 0.85
    }
    searchBox.style.backgroundColor = 'rgba(201,21,35,' + opacity + ')'
  }
}

//轮播图
//1.自动播放功能
//2.点随图片改变
//3.滑动切换图片
//4.滑动的距离的判断
let banner = () => {
  //定义需要用到的变量
  /*轮播图*/
  let banner = document.querySelector('.jd_banner')
  /*屏幕宽度 ======需要实时获取的吗？*/
  let width = banner.offsetWidth;
  /*图片容器*/
  let imageBox = banner.querySelector('ul:first-child')
  /*点容器*/
  let pointBox = banner.querySelector('ul:last-child')
  /*所有的点*/
  let points = pointBox.querySelectorAll('li')

  //抽离出来的函数
  //添加过渡
  let addTransition = () => {
    imageBox.style.transition = 'all 0.2s'
    imageBox.style.webkitTransition = 'all 0.2s'
  }

  //做位移
  let setTranslateX = (translateX) => {
    imageBox.style.transform = 'translateX(' + translateX + 'px)'
    imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)'
  }

  //清除过渡
  let removeTransition = () => {
    imageBox.style.transition = 'none'
    imageBox.style.webkitTransition = 'none'
  }

  //自动播放功能
  let index = 1
  let timeId = setInterval(() => {
    index++

    //添加过渡
    addTransition()

    //做运动
    setTranslateX(-index * width)

  }, 1000)

  //在最后一章（最左边或者是最右边）动画结束的时候
  imageBox.addEventListener('transitionend', () => {
    if (index >= 9) {
      index = 1
      //瞬间定位
      removeTransition()
      setTranslateX(-index * width)
    } else if (index <= 0) {
      index = 8
      //瞬间定位
      removeTransition()
      setTranslateX(-index * width)
    }

    //每一个动画结束的时候设置相应的点
    setPoint()
  })

  //设置相应的点
  let setPoint = () => {
    for (let i = 0; i < points.length; i++) {
      points[i].classList.remove('now')
    }
    points[index - 1].classList.add('now')
  }

  //绑定事件---触摸-滑动-移开
  let startX = 0
  let distanceX = 0
  let isMove = false

  //触摸事件
  imageBox.addEventListener('touchstart', (e) => {
    clearInterval(timeId)
    startX = e.touches[0].clientX
  })

  //移动事件
  imageBox.addEventListener('touchmove', (e) => {
    let moveX = e.touches[0].clientX
    distanceX = moveX - startX

    //图片跟着移动
    let translateX = -index * width + distanceX
    removeTransition()
    setTranslateX(translateX)
    isMove = true
  })

  //手指离开事件
  imageBox.addEventListener('touchend', (e) => {

    if (isMove) {
      //当移动的距离小于三分之一宽度的时候
      if (Math.abs(distanceX) < width / 3) {
        addTransition();
        setTranslateX(-index * width);
      }
      //当移动距离大于三分之二的时候
      else {
        /*右滑动 上一张*/
        if (distanceX > 0) {
          index--;
        }
        /*左滑动 下一张*/
        else {
          index++;
        }
        /*根据index去动画的移动*/
        addTransition();
        setTranslateX(-index * width);
      }
    }

    // 参数的重置
    startX = 0;
    distanceX = 0;
    isMove = false;

    //加上定时器
    clearInterval(timeId);
    timeId = setInterval(() => {
      index++;
      //加过渡
      addTransition();
      //做位移
      setTranslateX(-index * width);
    }, 1000);
  })
}

//秒杀倒计时
let downTime = () => {
  /*1.每一秒改变当前的时间*/
  /*2.倒数计时  假设 4小时*/
  let time = 4 * 60 * 60;
  let spans = document.querySelectorAll('.time span');

  let timer = setInterval(() => {
    time--;
    /*格式化  给不同的元素html内容*/
    let h = Math.floor(time / 3600);
    let m = Math.floor(time % 3600 / 60);
    let s = Math.floor(time % 60);

    spans[0].innerHTML = Math.floor(h / 10);
    spans[1].innerHTML = h % 10;
    spans[3].innerHTML = Math.floor(m / 10);
    spans[4].innerHTML = m % 10;
    spans[6].innerHTML = Math.floor(s / 10);
    spans[7].innerHTML = s % 10;

    if (time <= 0) {
      clearInterval(timer);
    }

  }, 1000)

}
