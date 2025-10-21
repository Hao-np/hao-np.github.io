document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const navLinks = document.querySelectorAll('nav a');

    // 导航点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 打字效果
    const roles = ['编程', '开源', '创新', '分享'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.querySelector('.typed');
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, newTextDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }

    // 启动打字效果
    setTimeout(type, newTextDelay);
});

//指示器实时更新
/* ========== 可配置项 ========== */
const navLinks = document.querySelectorAll('nav ul li a'); // 导航按钮
const sections = []; // 用来缓存各个区块的信息
const offset = window.innerHeight * 0.4; // 提前 40% 视口高度触发
/* ============================== */

// 初始化：把每个 <a> 的 href 对应的元素缓存起来
function buildSectionsMap() {
    sections.length = 0; // 先清空
    navLinks.forEach(link => {
        const id = link.getAttribute('href'); // "#home" …
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (!el) return;
        sections.push({
            el,
            link
        });
    });
}

// 返回当前应该高亮的那个 <a>
function getCurrentLink() {
    let target = sections[0]?.link; // 默认第一个
    for (const {
            el,
            link
        }
        of sections) {
        const rect = el.getBoundingClientRect();
        // 元素顶部在 offset 之上、底部在视口之内，即认为“当前”
        if (rect.top <= offset && rect.bottom >= 0) {
            target = link;
            break;
        }
    }
    return target;
}

// 更新 active 类
function updateActive() {
    const current = getCurrentLink();
    navLinks.forEach(a => a.classList.toggle('active', a === current));
}

// 初始化 + 绑定事件
buildSectionsMap();
updateActive();
window.addEventListener('scroll', updateActive, {
    passive: true
});
window.addEventListener('resize', () => {
    buildSectionsMap(); // 响应式布局后重新计算
    updateActive();
});


// 设置开始时间（可以修改这个时间为实际开始搭建的时间）
// 格式：年, 月-1, 日, 时, 分, 秒
const startDate = new Date(2025, 8, 20, 0, 0, 0); // 2024年1月1日 00:00:00

// 显示开始时间
//document.getElementById('startTime').textContent =`开始时间：${startDate.toLocaleString('zh-CN')}`;

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    // 计算天数、小时、分钟、秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 更新显示
    document.getElementById('days').textContent = days.toString().padStart(1, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// 立即更新一次
updateTimer();

// 每秒更新一次
setInterval(updateTimer, 1000);