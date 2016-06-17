Zepto(function($) {
    var page = 1;
    var perPage = 10;
    var loading = false;
    var zWin = $(window);
    var poster = {
        "with": 800,
        "height": 455,
    }
    var winWidth = zWin.width();
    var winHeight = zWin.height();
    var posterHeight = (winWidth / poster.with) * poster.height + 'px';
    // var posterHeight = '100%';
    var maxItems = 1000;
    var getlist = function() {
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: "./static/data/activity.json",
            success: function(data) {
                console.log(data);
                if (data.success == 1) {
                    var pages = data.data.pages;
                    // maxItems = Math.ceil(pages.totalCount / perPage);
                    if (data.data.activities) {
                        var html = '';
                        var ids = '';
                        for (var i in data.data.activities) {
                            var activity = data.data.activities[i];

                            if (activity == null) {
                                continue;
                            };
                            ids += activity.id + ' ';
                            html += '<div class="activityList" href="/view?id=' + activity.id + '" activityId="' + activity.id + '" class="item-link item-content">' +
                                '<div class="activity-block" >' +
                                '<img class="activity-photo" style="height:' + posterHeight + '" src="' + activity.poster + '" alt="activity photo"/>' +
                                '<div class="activity-describe"><a href="/activity/view?id=' + activity.id + ' " >' + activity.content + '</a></div></div></div>';

                            // html  = '<img src="'+activity.poster+'"';
                        }
                        // console.log(html);
                    }

                    $('.activity-list').append(html);
                    // $('.infinite-scroll-bottom .list-container').append(html);
                    // 如果加载数据少于4个则不显示加载框
                    // console.log(data.data.activities.length);
                    // if (data.data.activities.length < perPage) {
                    //     $('.infinite-scroll-preloader').remove();
                    // }
                    setTimeout(function() {
                        $('.startAnimation').hide();
                        $('#actList').show();
                    }, 200);
                }


            },
            error: function() {
                console.log(11111111);
            }
        })
    }

getlist();


    //预先加载20条

    // 上次加载的序号

    var lastIndex = 20;

    // 注册'infinite'事件处理函数
    $(document).on('infinite', '.infinite-scroll-bottom', function() {

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
            getlist();
            // 更新最后加载的序号
            lastIndex = $('.list-container li').length;
            //容器发生改变,如果是js滚动，需要刷新滚动
            $.refreshScroller();
        }, 1000);
    });
    $.init();
})

Zepto(function($){
	var getParam = function(name){
        var search = document.location.search;
        var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if(null != matcher){
                try{
                        items = decodeURIComponent(decodeURIComponent(matcher[1]));
                }catch(e){
                        try{
                                items = decodeURIComponent(matcher[1]);
                        }catch(e){
                                items = matcher[1];
                        }
                }
        }
        console.log(items);
        return items;
};
getParam('id');
})