gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".section"),
    nav = gsap.utils.toArray("nav div"),
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
  trigger: ".wrapper-scroll",
  pin: true,
  scrub: 1,
  snap: {snapTo: directionalSnap(tl), duration: 0.5},
  end: () => "+=" + maxWidth / scrollSpeed,
  invalidateOnRefresh: true
});


function init() {
  gsap.set(sections, {x: 0});
  maxWidth = getMaxWidth();
  let position = 0,
      distance = maxWidth - window.innerWidth;
  // add a label for each section to the timeline (for "labelsDirectional" functionality):
  tl.add("label0", 0);
  sections.forEach((section, i) => {
    let progress = position;
    position += section.offsetWidth / distance;
    tl.add("label" + (i+1), position);
    nav[i].onclick = () => { // link clicks should trigger a scroll tween to the appropriate spot
      snapProgress = progress; // save the current progress so that if we can return it in the directionalSnap() when called right after the scrollTo tween is done (because ScrollTrigger would normally look at the velocity and snap, causing it to overshoot to the next section)
      lastScrollTween = Date.now(); // for checking in the directionalSnap() if there was a recent scrollTo that finished, in which case we'd skip the snapping (well, return the current snapProgress)
      gsap.to(window, {scrollTo: maxWidth / scrollSpeed * progress, duration: 1, overwrite: "auto"});
    };
  });
}

init();
ScrollTrigger.addEventListener("refreshInit", init); // on resize, things must be recalculated








// a helper function for doing "labelsDirectional" snapping, but we can't use that directly since we're doing some special things with scrollTo tweens, and we need a way to skip the snap if a scrollTo recently finished (otherwise it'll overshoot to the next section)
function directionalSnap(timeline) {
		return (value, st) => {
      if (Date.now() - lastScrollTween < 1650) { // recently finished doing a tweened scroll (clicked link), so don't do any snapping.
        return snapProgress;
      }
      let a = [],
        labels = timeline.labels,
        duration = timeline.duration(),
        p, i;
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