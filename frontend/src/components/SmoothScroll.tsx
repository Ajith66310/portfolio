import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
  smoothWheel: true,
  duration: 1.1,
  easing: (t: number) => 1 - Math.pow(1 - t, 3),
});
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
requestAnimationFrame(() => ScrollTrigger.refresh());


ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
});
