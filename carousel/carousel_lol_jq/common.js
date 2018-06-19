
let app = {
  //  渲染页面
  tmpl: function(element, dataPath, ext) {
    for (let i = 0; i < dataPath.length; i++) {
      let htmlStr = `<li><a href="#"><img src="../carousel_lol_js/images/${dataPath[i]}.${ext}" alt="Can not found it~"></a></li>`
      element.append(htmlStr)
    }
  },

  //排他功能
  exclusive: function(element) {
    element.stop().animate({
      'opacity': 1
    }, 400, 'swing').siblings().stop().css('opacity', 0.5)

  },

  //移动一次的函数
  moveOne: function() {
    $('#bigBox').stop().animate({
      'left': -pic * imgWidth
    }, 400, 'swing')
    // if (pic === 5) {
    //   $('#smallBox li').eq(0).animate({
    //     'opacity': 1
    //   }, 400, 'swing').siblings().stop().css('opacity', 0.5)
    // } else {
    //   $('#smallBox li').eq(pic).animate({
    //     'opacity': 1
    //   }, 400, 'swing').siblings().stop().css('opacity', 0.5)
    // }
    //此处多处重复又可以进行封装exclusive()
    if (pic === 5) {
      app.exclusive($('#smallBox li').eq(0))
    } else {
      app.exclusive($('#smallBox li').eq(pic))
    }
  },

  //右侧点击，左移动一次
  rightClick: function() {
    if (pic === 5) {
      pic = 0;
      $('#bigBox').css('left', 0)
    }
    pic++
    app.moveOne()
  },

  //向左点击，右移动一次
  leftClick: function() {
    if (pic === 0) {
      pic = 5
      $('#bigBox').css('left', -pic * imgWidth)
    }
    pic--
    app.moveOne()
  }

}
