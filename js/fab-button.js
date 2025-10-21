(() => {
    const html = document.documentElement;
    /* 本地存储读写小工具 */
    const store = {
        get: k => localStorage.getItem(k),
        set: (k, v) => localStorage.setItem(k, v)
    };

    /* 内置动作集合：key = data-fab-action 的值 */
    const fabActions = {
        /* 1. 返回顶部 */
        top() {
            const isTop = window.scrollY < 10; // 阈值可自行调
            const destination = isTop ?
                document.body.scrollHeight // 去底部
                :
                0; // 回顶部
            window.scrollTo({
                top: destination,
                behavior: 'smooth'
            });
        },

        /* 2. 主题切换 */
        theme(btn) {
            //const icon = btn.querySelector('.fab-icon');
            const icon = btn.querySelector('#theme-icon'); // <i> 标签
            const isNight = html.getAttribute('theme') === 'night';
            const newTheme = isNight ? 'day' : 'night';
            html.setAttribute('theme', newTheme);
            // 切换图标类
            //icon.textContent = isNight ? '☀️' : '🌙';
            icon.classList.toggle('fa-moon', !isNight);
            icon.classList.toggle('fa-sun', isNight);
            store.set('theme', newTheme);
        },

        /* 3. 示例：下载（占位，可删） */
        download() {
            console.log('【下载】动作触发，在这里写你的下载逻辑');
        }
    };

    /* ----------  监听滚动，动态切换「↑ / ↓」 ---------- */
    const topBtn = document.querySelector('.fab[data-fab-action="top"]');
    if (topBtn) {
        const icon = topBtn.querySelector('.fab-icon');
        const toggleIcon = () => {
            const isTop = window.scrollY < 10;
            icon.textContent = isTop ? '↓' : '↑';
            topBtn.setAttribute('aria-label', isTop ? '滑动到底部' : '返回顶部');
        };
        toggleIcon(); // 初始状态
        window.addEventListener('scroll', toggleIcon, {
            passive: true
        });
    }

    /* 初始化主题 */ 
    (() => {
        const saved = store.get('theme');
        const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
        const initial = saved || defaultTheme;
        html.setAttribute('theme', initial);
        const themeBtn = document.querySelector('[data-fab-action="theme"]');
        //if (themeBtn) themeBtn.querySelector('.fab-icon').textContent = initial === 'night' ? '🌙' : '☀️';
        if (themeBtn) {
            const icon = themeBtn.querySelector('#theme-icon');
            icon.classList.toggle('fa-sun', initial !== 'night');
            icon.classList.toggle('fa-moon', initial === 'night');
        }
    })();

    /* 给所有 .fab 按钮一次性绑定点击 */
    document.querySelectorAll('.fab[data-fab-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.fabAction;
            if (fabActions[action]) fabActions[action](btn);
            else console.warn(`未定义的动作: ${action}`);
        });
    });
})();