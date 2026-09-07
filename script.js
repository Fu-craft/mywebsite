// ===== 导航栏滚动效果 =====
const navbar = document.getElementById("navbar");

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleScroll, { passive: true });

// ===== 移动端菜单切换 =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// 点击导航链接后关闭菜单
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// ===== 滚动淡入动画 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // 错开动画时间
            setTimeout(() => {
                entry.target.classList.add("visible");
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".feature-card").forEach((card) => {
    observer.observe(card);
});

// ===== 数字计数动画 =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"), 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // 缓动函数
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(easeOut * target);
        element.textContent = current + (target === 100 ? "%" : "");

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll(".stat-number").forEach((stat) => {
    statObserver.observe(stat);
});

// ===== 平滑滚动（兼容处理） =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offsetTop =
                targetElement.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

// ===== 页面加载完成 =====
document.addEventListener("DOMContentLoaded", () => {
    console.log("网站加载完成");
});
