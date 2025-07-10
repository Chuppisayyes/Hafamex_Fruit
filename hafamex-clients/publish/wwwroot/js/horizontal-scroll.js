window.aboutScroll = {
    init: function () {
        const container = document.querySelector(".about-scroll-container");
        const sections = gsap.utils.toArray(".about-scroll-container section");
        const texts = gsap.utils.toArray(".anim");
        const mask = document.querySelector(".mask");

        if (!container || sections.length === 0 || !mask) {
            console.warn("About Scroll: DOM not ready or missing elements");
            return;
        }

        let scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".about-scroll-container",
                pin: true,
                scrub: 1,
                end: "+=3000",
                markers: true,
            }
        });

        gsap.to(mask, {
            width: "100%",
            scrollTrigger: {
                trigger: ".wrapper-scroll",
                start: "top left",
                scrub: 1
            }
        });

        sections.forEach((section) => {
            let text = section.querySelectorAll(".anim");
            if (text.length === 0) return;

            gsap.from(text, {
                y: -130,
                opacity: 0,
                duration: 2,
                ease: "elastic",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: section,
                    containerAnimation: scrollTween,
                    start: "left center",
                    markers: true
                }
            });
        });

        console.log("✅ aboutScroll initialized");
    }
};
