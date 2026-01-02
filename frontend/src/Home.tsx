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
// import ScreenWarning from "./components/ScreenWarning";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // 2. Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // 3. Setup SVG Animation
    const isMobile = window.matchMedia("(max-width: 1000px)").matches;
    const pathId = isMobile ? "stroke-path-mobile" : "stroke-path-desktop";
    const path = document.getElementById(pathId);

    if (path instanceof SVGPathElement) {
      const pathLength = path.getTotalLength();

      // Initial state
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
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true, // Recalculates if window resizes
        },
      });
    }

    // 4. Force a refresh after a small delay to ensure layout is painted
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // 5. Cleanup
    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Recalculate ScrollTrigger on full page load (important for mobile images)
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleLoad);
    };
  }, []);

  return (
    <>
      {/* <ScreenWarning /> */}
      <a href={img.cv} download className="btn-download">
        Download CV
      </a>

      <button
        className="btn-scroll-top animate-bounce"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FiArrowUp size={24} />
      </button>

      <section className="hero">
        <TextAnimation animateOnScroll>
          <h1>
            Hi, I'm Ajith K V — I build digital products that feel effortless,
            look modern, and scale without drama.
          </h1>
        </TextAnimation>
      </section>

      <section className="spotlight">
        <div className="rows">
          <div className="img">
            <img src={img.img1} alt="Database concept visual" />
          </div>
        </div>

        <div className="rows">
          <div className="col">
            <div className="card">
              <h2>Backend That Adapts as Your App Grows</h2>
              <p>
                As a MERN + TypeScript developer, I design APIs and database
                structures that stay predictable, scalable, and easy to maintain.
                Every model, controller, and service is written with TypeScript accuracy,
                ensuring fewer bugs and smoother development as your project expands.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="img">
              <img src={img.img3} alt="Backend API illustration" />
            </div>
          </div>
        </div>

        <div className="rows">
          <div className="col">
            <div className="img">
              <img src={img.img2} alt="Frontend UI concept" />
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h2>Frontends That Feel Smooth, Fast, and Typed</h2>
              <p>
                I build modern React interfaces powered by TypeScript, clean component
                patterns, and reusable UI logic. From state management to animations,
                every interaction is crafted to feel fast, consistent, and reliable —
                giving users an experience that feels naturally intuitive.
              </p>
            </div>
          </div>
        </div>

        <div className="rows">
          <div className="img">
            <img src={img.img4} alt="Cloud deployment visual" />
          </div>
        </div>

        <div className="svg-path">
          {/* Desktop SVG */}
          <svg
            className="svg-desktop"
            width="1554"
            height="3791"
            viewBox="0 0 1554 3791"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="stroke-path-desktop"
              d="M707.54 166.337C707.54 166.337 87.0399 27.3369 167.04 1051.34C247.041 2075.34 1047.04 955.337 1359.04 2059.34C1671.04 3163.34 -227.58 3009.5 308.42 2145.5C844.42 1281.5 909.04 3630.34 909.04 3630.34"
              stroke="#F6D3BD"
              strokeWidth="320"
              strokeLinecap="round"
            />
          </svg>
          {/* Mobile SVG */}
          <svg className="svg-mobile"
            width="1554" height="5776" viewBox="0 0 1554 5776" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="stroke-path-mobile"
              d="M707.54 166.337C707.54 166.337 87.0399 27.3369 167.04 1051.34C247.041 2075.34 1047.04 955.337 1359.04 2059.34C1671.04 3163.34 -227.58 3009.5 308.42 2145.5C844.42 1281.5 707.54 5616 707.54 5616" stroke="#F6D3BD" stroke-width="320" stroke-linecap="round" />
          </svg>


        </div>
      </section>

      <section className="outro">
        <TextAnimation animateOnScroll blockColor="#F6D3BD">
          <h1>
            Whether you need a product built from scratch or a system engineered
            for scale — I'm here to bring clarity, structure, and sharp execution
            to every line of code.
          </h1>
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