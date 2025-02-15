$(document).on('pjax:complete', function() {
    // 移除旧的ClustrMaps脚本
    $('#clstr_globe').remove();

    // 重新插入ClustrMaps脚本
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'clstr_globe';
    script.src = '//clustrmaps.com/globe.js?d=xb6WYzUtwVE16HTX8X35e5GGpkywy7EXJKy_fFWi-2g';
    document.body.appendChild(script);
});