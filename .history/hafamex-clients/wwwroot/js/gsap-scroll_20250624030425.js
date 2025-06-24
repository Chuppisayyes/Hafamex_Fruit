gsap.registerPlugin(ScrollTrigger);

// Quan trọng: dùng selector riêng cho About component
let sections = gsap.utils.toArray(".about-section"),
    nav = gsap.utils.toArray(".about-nav div"),
    getMaxWidth = () => sections.reduce((val, section) => val + section.offsetWidth, 0),
    maxWidth = getMaxWidth(),
    scrollSpeed = 4,
    snapProgress,
    lastScrollTween = Date.now(),
    tl = gsap.timeline();

tl.to(sections, {
  x: () => window.innerWidth - maxWidth,
  duration: 1,
  ease: "none"
});

ScrollTrigger.create({
  animation: tl,
  trigger: ".about-wrapper",
  pin: true,
  scrub: 0.3,
  snap: {snapTo: directionalSnap(tl), duration: 0.5},
  end: () => "+=" + maxWidth / scrollSpeed,
  invalidateOnRefresh: true
});

function init() {
  gsap.set(sections, {x: 0});
  maxWidth = getMaxWidth();
  let position = 0,
      distance = maxWidth - window.innerWidth;
  
  tl.add("label0", 0);
  sections.forEach((section, i) => {
    let progress = position;
    position += section.offsetWidth / distance;
    tl.add("label" + (i+1), position);
    nav[i].onclick = () => {
      snapProgress = progress;
      lastScrollTween = Date.now();
      gsap.to(window, {scrollTo: maxWidth / scrollSpeed * progress, duration: 1, overwrite: "auto"});
    };
  });
}

init();
ScrollTrigger.addEventListener("refreshInit", init);

function directionalSnap(timeline) {
  return (value, st) => {
    if (Date.now() - lastScrollTween < 1650) {
      return snapProgress;
    }
    let a = [], labels = timeline.labels, duration = timeline.duration(), p, i;
    for (p in labels) {
      a.push(labels[p] / duration);
    }
    a.sort((a, b) => a - b);
    if (st.direction > 0) {
      for (i = 0; i < a.length; i++) {
        if (a[i] >= value) {
          return a[i];
        }
      }
      return a.pop();
    } else {
      i = a.length;
      while (i--) {
        if (a[i] <= value) {
          return a[i];
        }
      }
    }
    return a[0];
  };
}
