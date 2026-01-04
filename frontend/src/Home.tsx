import { useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import img from "./assets/assest.ts";
import "./home.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./components/SmoothScroll.tsx";
import TextAnimation from "./components/TextAnimation.tsx";
import Project from "./components/Project.tsx";
import CardStack from "./components/CardStack.tsx";
import SvgScrollAnimation from "./components/SvgScrollAnimation.tsx";
import ScreenWarning from "./components/ScreenWarning";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    let resizeTimeout: number | undefined;

    const refreshST = () => ScrollTrigger.refresh();

    // Initial sync after layout + Lenis settle
    requestAnimationFrame(refreshST);

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(refreshST, 200);
    };

    window.addEventListener("load", refreshST);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", refreshST);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <>

      <div>
        <ScreenWarning />
      </div>

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

      <SvgScrollAnimation />

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

      <footer>
        <p>Developed by Ajith k v</p>
        <p>All rights reserved © 2026</p>
      </footer>
    </>
  );
};

export default Home;
