//将图片索引和图片宽暴露给全局
let pic = 0
let imgWidth = 0
$(function() {
  //生成页面
  let bigPath = ['1b', '2b', '3b', '4b', '5b']
  let smallPath = ['1s', '2s', '3s', '4s', '5s']

  //大图渲染
  app.tmpl($('#bigBox'), bigPath, 'jpg')
  $('#bigBox').append($('#bigBox li:eq(0)').clone())

  //小图渲染
  app.tmpl($('#smallBox'), smallPath, 'png')
  $('#smallBox li:eq(0)').css('opacity', 1)

  //获取图片的宽度
  imgWidth = $('img').eq(0).width()

  //为小图片注册mouseenter事件
  $('#smallBox li').each(function(index) {
    $(this).on('mouseover', function() {
      //版本1
      // $('#smallBox li').each(function() {
      //   $(this).stop() //停止其它元素的动画效果
      //   $(this).css('opacity', 0.5)
      // })

      //版本2
      // $(this).siblings().stop().css('opacity', 0.5)
      // $(this).animate({
      //   'opacity': 1
      // }, 400, 'swing')

      //版本3
      //链式编程，这里是清除其它头像的动画
      // $(this).animate({
      //   'opacity': 1
      // }, 400, 'swing').siblings().stop().css('opacity', 0.5)

      //版本4 由于后面多处用到，可以封装成函数
      app.exclusive($(this))

      pic = index //此处的index是第一次循环中参数传下来的
      //这里是清除自身的动画
      $('#bigBox').stop().animate({
        left: -pic * imgWidth
      }, 400, 'swing')
    })
  })

  //左右按钮有共同部分，可以封装成函数moveOne()
  //点击右侧按钮，pic++执行上面定时器一次
  $('#fr').on('click', function() {
    app.rightClick();
  })
  //点击左侧按钮，pic--执行定时器一次
  $('#fl').on('click', function() {
    app.leftClick();
  })

  //大图片自动播放------等同于一直按右键
  let timeId = setInterval(app.rightClick, 1400)

  //当鼠标进入main里面的时候，停止动画，反之开始动画
  $('#main').on('mouseover', function() {
    clearInterval(timeId)
  })
  $('#main').on('mouseout', function() {
    timeId = setInterval(app.rightClick, 1400)
  })


  //当鼠标进入big的时候，显示点击按钮，反之隐藏
  $('#big').on('mouseover', function() {
    $('#fl').css('display', 'block')
    $('#fr').css('display', 'block')
  })
  $('#big').on('mouseout', function() {
    $('#fl').css('display', 'none')
    $('#fr').css('display', 'none')
  })


  //在网页上看到了一个框条，自己也做了一个
  $('#box').on('mouseover', function() {
    $('#box > span').eq(0).stop().animate({'height': 612},200,'swing',function() {$('#box > span').eq(0).css({'bottom':0,'top': 'auto'})})
    $('#box > span').eq(1).stop().animate({'width':612},200,'swing',function() {$('#box > span').eq(1).css({'left':0,'right': 'auto'})})
    $('#box > span').eq(2).stop().animate({'height': 612},200,'swing',function() {$('#box > span').eq(2).css({'top':0,'bottom': 'auto'})})
    $('#box > span').eq(3).stop().animate({'width':612},200,'swing',function() {$('#box > span').eq(3).css({'right':0,'left': 'auto'})})
  })

  $('#box').on('mouseout', function() {
    $('#box > span').eq(0).stop().animate({'height': 0},200,'swing',function() {$('#box > span').eq(0).css({'top':0,'bottom': 'auto'})})
    $('#box > span').eq(1).stop().animate({'width':0},200,'swing',function() {$('#box > span').eq(1).css({'right':0,'left': 'auto'})})
    $('#box > span').eq(2).stop().animate({'height': 0},200,'swing',function() {$('#box > span').eq(2).css({'bottom':0,'top': 'auto'})})
    $('#box > span').eq(3).stop().animate({'width':0},200,'swing',function() {$('#box > span').eq(3).css({'left':0,'right': 'auto'})})
  })
})
