Zepto(function($) {
    var getParam = function(name) {
        var search = document.location.search;
        var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if (null != matcher) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                }
            }
        }
        console.log(items);
        return items;
    };


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
                	for (var i in data.data.activities) {
                            var activity = data.data.activities[i];
    						var id = getParam('id');
                            if (activity.id == id) {
                            	var view = document.getElementById('view');
                            	var poster = new Image;
                            		poster.src = activity.poster;
                            	console.log(activity.details);
                            	poster.style.width = '100%';
                            	view.appendChild(poster);
                            	$(".detail-title").html(activity.title);
                            	$(".detail-activity").html(activity.details);
                            }

                    }

                }
            }
        }
    })
})
