// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// const wrapper = document.querySelector(".about-wrapper");
// const sections = gsap.utils.toArray(".about-section");
// const nav = gsap.utils.toArray(".about-nav div");

// let scrollSpeed = 2;
// let snapProgress = 0;
// let lastScrollTween = Date.now();

// // Đảm bảo các section được hiển thị ngang
// gsap.set(wrapper, { display: "flex", flexDirection: "row" });
// gsap.set(sections, { minWidth: "100vw" }); // mỗi section chiếm đủ chiều ngang

// let tl = gsap.timeline({ defaults: { ease: "none" } });
// let maxWidth;

// function getMaxWidth() {
//   return sections.reduce((total, section) => total + section.offsetWidth, 0);
// }

// function buildTimeline() {
//   maxWidth = getMaxWidth();
//   tl.clear();
//   tl.to(sections, {
//     x: () => window.innerWidth - maxWidth,
//     duration: 1
//   });

//   // Add label snap points
//   let position = 0;
//   let distance = maxWidth - window.innerWidth;

//   sections.forEach((section, i) => {
//     const label = "label" + i;
//     tl.add(label, position);
//     const progress = position;
//     position += section.offsetWidth / distance;

//     // Nav click handler
//     if (nav[i]) {
//       nav[i].onclick = () => {
//         snapProgress = progress;
//         lastScrollTween = Date.now();
//         gsap.to(window, {
//           scrollTo: maxWidth / scrollSpeed * progress,
//           duration: 1,
//           overwrite: "auto"
//         });
//       };
//     }
//   });
// }

// // Snap theo chiều cuộn
// function directionalSnap(timeline) {
//   return (value, st) => {
//     if (Date.now() - lastScrollTween < 1500) return snapProgress;

//     let points = Object.values(timeline.labels).map(p => p / timeline.duration());
//     points.sort((a, b) => a - b);

//     if (st.direction > 0) {
//       return points.find(p => p >= value) ?? points.at(-1);
//     } else {
//       for (let i = points.length - 1; i >= 0; i--) {
//         if (points[i] <= value) return points[i];
//       }
//     }
//     return points[0];
//   };
// }

// // Tạo ScrollTrigger
// ScrollTrigger.create({
//   animation: tl,
//   trigger: ".about-wrapper",
//   pin: true,
//   scrub: 0.5,
//   snap: {
//     snapTo: directionalSnap(tl),
//     duration: 0.4,
//     ease: "power1.inOut"
//   },
//   end: () => "+=" + getMaxWidth() / scrollSpeed,
//   invalidateOnRefresh: true
// });

// buildTimeline();
// ScrollTrigger.addEventListener("refreshInit", buildTimeline);
