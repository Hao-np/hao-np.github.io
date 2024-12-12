document.addEventListener('DOMContentLoaded', function() {
    var posts = [
        'https://haonp.top/2024/12/01/Hexo-Butterfly主题美化记录/',
        'https://haonp.top/2024/11/30/安卓设备Cloudflare内网穿透/',
        // ...其他文章路径
    ];
    var randomPost = posts[Math.floor(Math.random() * posts.length)];
    window.location.href = randomPost;
});
