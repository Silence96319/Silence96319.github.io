$(() => {
  banner()
  initMobileTab()
})

// 如果数据已经存在了就直接渲染页面，否则请求数据再渲染
let banner = () => {
  let getData = (callback) => {
    if (window.data) {
      callback && callback(window.data)
    } else {
      $.ajax({
        type: 'get',
        url: 'data.json',
        dataType: 'json',
        data: '',
        success: (data) => {
          //缓存数据
          window.data = data
          callback && callback(window.data)
        }
      })
    }
  }

  let render = () => {
    getData(
      (data) => {
        //点的渲染
        let htmlPoints = template('points', {
          data: data
        })
        $('.carousel-indicators').html(htmlPoints)

        // 获取当前窗口的宽度 从而确定渲染方式
        let isMobile = $(window).width() < 768 ? true : false

        //轮播图的渲染
        let htmlStr = template('tpl', {
          data: data,
          isMobile: isMobile
        })
        $('.carousel-inner').html(htmlStr)
      }
    )
  }

  //为window绑定事件并直接触发一次
  $(window).on('resize', () => {
    render()
  }).trigger('resize')

  //移动端手势切换图片
  let startX = 0
  let distanceX = 0
  let isMove = false

  //jq中的e不是原生的e，它里面的originalEvent才是原生的e
  $('.wjs_banner')
    .on('touchstart', (e) => {
      startX = e.originalEvent.touches[0].clientX
    })
    .on('touchmove', (e) => {
      let moveX = e.originalEvent.touches[0].clientX
      distanceX = moveX - startX
      isMove = true
    })
    .on('touchend', (e) => {
      if (isMove && Math.abs(distanceX) > 50) {
        if (distanceX < 0) {
          $('.carousel').carousel('next')
        } else {
          $('.carousel').carousel('prev')
        }
      }

      //重置数据
      startX = 0
      distanceX = 0
      isMove = false
    })
}

let initMobileTab = () => {
  let $navTabs = $('.wjs_product .nav-tabs')
  let width = 0
  $navTabs.find('li').each(function(i, item) {
    let liWidth = $(this).outerWidth(true)
    width += liWidth
  })
  $navTabs.width(width)

  new IScroll($('.nav-tabs-parent')[0], {
    scrollX: true,
    scrollY: false,
    click: true
  });
}
