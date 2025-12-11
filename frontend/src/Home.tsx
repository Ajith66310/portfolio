import { useEffect } from 'react';
import img from './assets/assest.ts'
import './home.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import TextAnimation from './components/TextAnimation.tsx';
import Project from './components/Project.tsx';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    })
    gsap.ticker.lagSmoothing(0);

    const path = document.getElementById("stroke-path");

    if (path instanceof SVGPathElement) {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength} ${pathLength}`;
      path.style.strokeDashoffset = `${pathLength}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".spotlight",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      })
    }
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, [])



  return (
    <>
      <section className='hero'>
        <TextAnimation animateOnScroll>
        <h1>
          Hi, I'm Ajith K V — I build digital products that feel effortless, look modern, and scale without drama.
        </h1>
        </TextAnimation>
      </section>

      <section className='spotlight'>

        <div className="rows">
          <div className='img'>
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
          <div className='img'>
            <img src={img.img4} alt="Cloud deployment visual" />
          </div>
        </div>

        <div className="svg-path">
<svg width="1414" height="3651" viewBox="0 0 1414 3651" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
   id='stroke-path'
   d="M637.575 96.337C637.575 96.337 17.0751 -42.6631 97.0754 981.337C177.076 2005.34 977.074 885.337 1289.08 1989.34C1601.08 3093.34 -301.925 2947.34 234.075 2083.34C770.075 1219.34 695.075 2992.34 839.075 3560.34" stroke="#F6D3BD" stroke-width="180" stroke-linecap="round"/>
</svg>
        </div>

      </section>

      <section className='outro'>
        <TextAnimation animateOnScroll  blockColor="#F6D3BD" >
        <h1>
          Whether you need a product built from scratch or a system engineered for scale —  
          I'm here to bring clarity, structure, and sharp execution to every line of code.
        </h1>
        </TextAnimation>
      </section>


    <section id='work'>
<Project/>
    </section>

    </>
  )
}

export default Home;
