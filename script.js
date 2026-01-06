document.addEventListener("DOMContentLoaded", () => {
    // 1. 设置页脚年份
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. 滚动出现动画 (Intersection Observer) - 加入 stagger
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // 获取该元素在其父元素中的索引，用于计算延迟
                const index = Array.from(el.parentNode.children).indexOf(el);
                el.style.transitionDelay = `${index * 100}ms`; // 稍微增加延迟时间
                el.classList.add("appear");
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll("[data-animate]").forEach((el) => {
        observer.observe(el);
    });

    // 3. 导航栏效果 - 用 class 切换（更丝滑）
    const navbar = document.querySelector(".navbar");
    const onScroll = () => {
        if (!navbar) return;
        navbar.classList.toggle("is-scrolled", window.scrollY > 30); // 稍微减小触发滚动的距离
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 4. Hero 背景轻微视差（可选）
    const heroBg = document.querySelector("[data-parallax]");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (heroBg && !reduceMotion) {
        const parallax = () => {
            const y = window.scrollY || 0;
            // 使用 translate3d 并只在 Y 轴上移动，性能更好
            heroBg.style.transform = `translate3d(0, ${y * 0.1}px, 0)`; // 稍微增加视差效果
        };
        window.addEventListener("scroll", parallax, { passive: true });
        parallax();
    }
});