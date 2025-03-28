var blog_running_days = document.getElementById("blog_running_days");
var blog_running_hours = document.getElementById("blog_running_hours");
var blog_running_mins = document.getElementById("blog_running_mins");
var blog_running_secs = document.getElementById("blog_running_secs");

function refresh_blog_running_time() {
    var time = new Date() - new Date(2022, 9, 01, 0, 0, 0);
    var d = parseInt(time / 24 / 60 / 60 / 1000);
    var h = parseInt((time % (24 * 60 * 60 * 1000)) / 60 / 60 / 1000);
    var m = parseInt((time % (60 * 60 * 1000)) / 60 / 1000);
    var s = parseInt((time % (60 * 1000)) / 1000);
    blog_running_days.innerHTML = d;
    blog_running_hours.innerHTML = h;
    blog_running_mins.innerHTML = m;
    blog_running_secs.innerHTML = s;
}
refresh_blog_running_time();
if (typeof bottomTimeIntervalHasSet == "undefined") {
    var bottomTimeIntervalHasSet = true;
    setInterval(function() {
        refresh_blog_running_time();
    }, 500);
}

// 监听 PJAX 请求完成事件
document.addEventListener("pjax:complete", function() {
    // 重新获取 DOM 元素
    blog_running_days = document.getElementById("blog_running_days");
    blog_running_hours = document.getElementById("blog_running_hours");
    blog_running_mins = document.getElementById("blog_running_mins");
    blog_running_secs = document.getElementById("blog_running_secs");

    // 重新初始化计时器
    refresh_blog_running_time();
});