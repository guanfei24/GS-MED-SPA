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
        const visibles = entries
            .filter((e) => e.isIntersecting)
            .map((e) => e.target);

        visibles.forEach((el, idx) => {
            el.style.transitionDelay = `${idx * 90}ms`;
            el.classList.add("appear");
            observer.unobserve(el);
        });
    }, observerOptions);

    document.querySelectorAll("[data-animate]").forEach((el) => {
        observer.observe(el);
    });

    // 3. 导航栏效果 - 用 class 切换（更丝滑）
    const navbar = document.querySelector(".navbar");
    const onScroll = () => {
        if (!navbar) return;
        navbar.classList.toggle("is-scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 4. Hero 背景轻微视差（可选）
    const heroBg = document.querySelector("[data-parallax]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (heroBg && !reduceMotion) {
        const parallax = () => {
            const y = window.scrollY || 0;
            heroBg.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        };
        window.addEventListener("scroll", parallax, { passive: true });
        parallax();
    }
});
