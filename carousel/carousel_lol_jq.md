# 总结

1. 渲染页面
    - 循环遍历添加li,公共部分抽离出来
        + .append()
    - 大图片clone,小图片添加默认属性
        + .clone()
        + .css('','')
    - 添加完后才能获取图片的宽度！
        + .width() ---无参数，返回值无单位
        + .css('width') --- 返回值有单位

2. 小图片注册事件
    - each遍历 ----传入参数index,即为所需索引
    - 利用jq排它功能
       + $(this).stop().animate().siblings().stop().css()
       + **注意此时必须使用stop来停止其他的小图片的动画**
    - 利用jq动画函数
       + element.animate({}, speed, 'swing', callback)

3. 大图片点击即自动播放事件
    - 思路同js版
    - 唯一不同的是js版一开始就清除了定时器，所以jq要用stop清除自身的运动，区别于上面排它的stop作用
    - 里面公共部分非常的多，可以封装成函数，放到common.js 中

4. 问题！
   - 当将函数都放入到common.js中时，由于jq入口函数里的代码都是在函数内，所以与common.js里的变量不搭边，导致undefined结果
   - 解决方法： 将common.js中的封装好的函数都作为一个对象的属性，然后引入到主文件中。另外，抽离出main.js，并将pic,imgWidth暴露给全局，从而达到共享的作用。-----（否则common.js里的函数的作用域内找不到该变量/常量）
