import { useEffect } from 'react';
import { FiArrowUp } from "react-icons/fi";
import img from './assets/assest.ts';
import './home.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import TextAnimation from './components/TextAnimation.tsx';
import Project from './components/Project.tsx';
import CardStack from './components/CardStack.tsx';
import "./components/SmoothScroll.tsx";
import ScreenWarning from "./components/ScreenWarning";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // SVG Logic Fix
    const isMobile = window.matchMedia("(max-width: 1000px)").matches;
    const pathId = isMobile ? "stroke-path-mobile" : "stroke-path-desktop";
    const path = document.getElementById(pathId);

    if (path instanceof SVGPathElement) {
      // Ensure we get the fresh length
      const pathLength = path.getTotalLength();
      
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".spotlight",
          start: "top top",
          // Push end slightly further for mobile to ensure "fullness"
          end: isMobile ? "bottom+=5% bottom" : "bottom bottom",
          scrub: 0.5, // Added slight smoothing for mobile jitter
          invalidateOnRefresh: true,
        },
      });
    }

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleLoad);
    };
  }, []);

  return (
    <>
      <ScreenWarning />
      <a href={img.cv} download className="btn-download">Download CV</a>

      <button
        className="btn-scroll-top animate-bounce"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FiArrowUp size={24} />
      </button>

      <section className="hero">
        <TextAnimation animateOnScroll>
          <h1>Hi, I'm Ajith K V — I build digital products that feel effortless, look modern, and scale without drama.</h1>
        </TextAnimation>
      </section>

      <section className="spotlight">
        <div className="rows">
          <div className="img">
            <img src={img.img1} alt="Database" />
          </div>
        </div>

        <div className="rows">
          <div className="col">
            <div className="card">
              <h2>Backend That Adapts</h2>
              <p>As a MERN + TypeScript developer, I design APIs and database structures that stay predictable.</p>
            </div>
          </div>
          <div className="col">
            <div className="img"><img src={img.img3} alt="API" /></div>
          </div>
        </div>

        <div className="rows">
          <div className="col">
            <div className="img"><img src={img.img2} alt="Frontend" /></div>
          </div>
          <div className="col">
            <div className="card">
              <h2>Frontends That Feel Smooth</h2>
              <p>I build modern React interfaces powered by TypeScript and clean patterns.</p>
            </div>
          </div>
        </div>

        <div className="rows">
          <div className="img">
            <img src={img.img4} alt="Cloud" />
          </div>
        </div>

        <div className="svg-path">
          <svg className="svg-desktop" width="1554" height="3791" viewBox="0 0 1554 3791" fill="none">
            <path id="stroke-path-desktop" d="M707.54 166.337C707.54 166.337 87.0399 27.3369 167.04 1051.34C247.041 2075.34 1047.04 955.337 1359.04 2059.34C1671.04 3163.34 -227.58 3009.5 308.42 2145.5C844.42 1281.5 909.04 3630.34 909.04 3630.34" stroke="#F6D3BD" strokeWidth="320" strokeLinecap="round" />
          </svg>

          <svg className="svg-mobile" width="1554" height="5040" viewBox="0 0 1554 5040" fill="none">
            <path id="stroke-path-mobile" d="M707.54 166.337C707.54 166.337 87.0399 27.3369 167.04 1051.34C247.041 2075.34 1047.04 955.337 1359.04 2059.34C1671.04 3163.34 -227.58 3009.5 308.42 2145.5C844.42 1281.5 829.92 4880 829.92 4880" stroke="#F6D3BD" strokeWidth="320" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      <section className="outro">
        <TextAnimation animateOnScroll blockColor="#F6D3BD">
          <h1>Clarity, structure, and sharp execution to every line of code.</h1>
        </TextAnimation>
      </section>

      <section className="stack-cards">
        <CardStack />
      </section>

      <section id="work">
        <Project />
      </section>
    </>
  );
};

export default Home;