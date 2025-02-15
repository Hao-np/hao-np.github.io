$(document).on('pjax:complete', function() {
    // 重新加载 ClustrMaps 脚本
    var clustrMapsScript = document.createElement('script');
    clustrMapsScript.type = 'text/javascript';
    clustrMapsScript.src = '//clustrmaps.com/globe.js?d=xb6WYzUtwVE16HTX8X35e5GGpkywy7EXJKy_fFWi-2g';
    document.body.appendChild(clustrMapsScript);
});
