/*建站时间js*/
var blog_running_years = document.getElementById("blog_running_years");
var blog_running_months = document.getElementById("blog_running_months");
var blog_running_days = document.getElementById("blog_running_days");
var blog_running_hours = document.getElementById("blog_running_hours");
var blog_running_mins = document.getElementById("blog_running_mins");
var blog_running_secs = document.getElementById("blog_running_secs");

function refresh_blog_running_time() {
    var start = new Date(2022, 9, 01, 0, 0, 0); // 建站日期
    var now = new Date();
    var time = now - start;
    var years = parseInt(time / (365 * 24 * 60 * 60 * 1000));
    var months = parseInt((time % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
    var days = parseInt((time % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    var hours = parseInt((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    var minutes = parseInt((time % (60 * 60 * 1000)) / (60 * 1000));
    var seconds = parseInt((time % (60 * 1000)) / 1000);

    blog_running_years.innerHTML = years;
    blog_running_months.innerHTML = months;
    blog_running_days.innerHTML = days;
    blog_running_hours.innerHTML = hours;
    blog_running_mins.innerHTML = minutes;
    blog_running_secs.innerHTML = seconds;
}
refresh_blog_running_time();
if (typeof bottomTimeIntervalHasSet == "undefined") {
    var bottomTimeIntervalHasSet = true;
    setInterval(function() {
        refresh_blog_running_time();
    }, 500);
}
