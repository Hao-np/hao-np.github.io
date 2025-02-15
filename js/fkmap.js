function loadClustrMapsScript() {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//clustrmaps.com/globe.js?d=xb6WYzUtwVE16HTX8X35e5GGpkywy7EXJKy_fFWi-2g';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

$(document).on('pjax:complete', function() {
    loadClustrMapsScript().then(() => {
        console.log('ClustrMaps script loaded successfully');
    }).catch(() => {
        console.error('Failed to load ClustrMaps script');
    });
});
