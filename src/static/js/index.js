Zepto(function($) {
// 加载flag
      var loading = false;
      // 最多可加载的条目
      var maxItems = 100;

      // 每次加载添加多少条目
      var itemsPerLoad = 20;

      function addItems(number, lastIndex) {
              // 生成新条目的HTML
              var html = '';
              for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
                  html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
              }
              // 添加新条目
              $('.infinite-scroll-bottom .list-container').append(html);

          }
          //预先加载20条
      addItems(itemsPerLoad, 0);

      // 上次加载的序号

      var lastIndex = 20;

      // 注册'infinite'事件处理函数
      $(document).on('infinite', '.infinite-scroll-bottom',function() {

          // 如果正在加载，则退出
          if (loading) return;

          // 设置flag
          loading = true;

          // 模拟1s的加载过程
          setTimeout(function() {
              // 重置加载flag
              loading = false;

              if (lastIndex >= maxItems) {
                  // 加载完毕，则注销无限加载事件，以防不必要的加载
                  $.detachInfiniteScroll($('.infinite-scroll'));
                  // 删除加载提示符
                  $('.infinite-scroll-preloader').remove();
                  return;
              }

              // 添加新条目
              addItems(itemsPerLoad, lastIndex);
              // 更新最后加载的序号
              lastIndex = $('.list-container li').length;
              //容器发生改变,如果是js滚动，需要刷新滚动
              $.refreshScroller();
          }, 1000);
      });
	$.init();
})