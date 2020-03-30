var lunbo = function(config) {
  // 定义变量
  var $box = $(config.box),       // 轮播图容器
      imgs = config.imgs,         // 图片数组
      len = config.imgs.length,   // 图片数量
      time = config.time || 2000, // 图片切换时间
      index = 0,                  // 当前图片索引
      timer;                      // 定时器

  var $sliderDiv = $('<div class="slider" id="slider"></div>'),
      $leftBtn = $('<span id="left"><</span>'),
      $rightBtn = $('<span id="right">></span>'),
      $navUl = $('<ul class="nav" id="navs"></ul>');

  // --- 图 片 --- //
  for (var i = 0; i < len; i++) {
    var $imgDiv = $('<div class="slide"><img src="' + imgs[i] + '" alt=""></div>');
    $sliderDiv.append($imgDiv);
  }
  $sliderDiv.prepend($('<div class="slide"><img src="' + imgs[len - 1] + '" alt=""></div>'));
  $sliderDiv.append($('<div class="slide"><img src="' + imgs[0] + '" alt=""></div>'));

  // 移动函数
  function move(toIndex, callback=null) {
    var to = toIndex - index;
    if (to > 0) {
      to = '-=' + (to * 1200);
    } else if (to < 0) {
      to = '+=' + (to * -1200);
    } else {
      return 0;
    }
    $sliderDiv.animate({'left': to}, 800, callback);
  }

  // 上一张图片函数
  function prev() {
    if (index == 0) {
      activeLi(len - 1);
      move(-1, function() {
        $sliderDiv.css('left', -1200 * len);
      });
      index = len - 1;
    } else {
      activeLi(index - 1);
      move(index - 1);
      index--;
    }
  }

  // 下一张图片函数
  function next() {
    if (index == len - 1) {
      activeLi(0);
      move(len, function() {
        $sliderDiv.css('left', -1200);
      });
      index = 0;
    } else {
      activeLi(index + 1);
      move(index + 1);
      index++;
    }
  }
  
  // --- 左 右 按 钮 --- //
  $box.hover(function() {
    $leftBtn.stop().animate({'opacity': 0.8}, 'fast');
    $rightBtn.stop().animate({'opacity': 0.8}, 'fast');
    clearInterval(timer);
  }, function() {
    $leftBtn.stop().animate({'opacity': 0}, 'fast');
    $rightBtn.stop().animate({'opacity': 0}, 'fast');
    timer = setInterval(next, time);
  });

  // 添加点击事件
  $leftBtn.click(prev);
  $rightBtn.click(next);

  // --- 底 部 指 示 点 --- //
  var $li = [];
  for (var i = 0; i < len; i++) {
    $li[i] = $('<li>' + (i + 1) +'</li>');
    $navUl.append($li[i]);
  }
  // 第一个添加样式
  $li[0].addClass("active");

  // 点击事件
  for (var i = 0; i < len; i++) {
    (function(j) {
      $li[j].click(function() {
        activeLi(j);
        move(j);
        index = j;
      });
    })(i);
  }

  // 修改样式
  function activeLi(toIndex) {
    for (var i = 0; i < len; i++) {
      if ($li[i].hasClass("active")) {
        $li[i].removeClass("active");
      }
    }
    $li[toIndex].addClass("active");
  }

  // --- 依 次 插 入 容 器 --- //
  $box.append($sliderDiv);
  $box.append($leftBtn);
  $box.append($rightBtn);
  $box.append($navUl);

  // --- 启动定时器 --- //
  timer = setInterval(next, time);

  return $box;
}

