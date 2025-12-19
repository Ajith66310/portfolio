import "./cardstack.css";
import img, { cards } from "../assets/assest";
import type { Cards } from "../assets/assest";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import TextAnimation from "./TextAnimation";

gsap.registerPlugin(ScrollTrigger);

interface CardProps extends Cards {
  index: number;
}

const Card: React.FC<CardProps> = ({ title, copy, index }) => {
  return (
    <div className="card-block">

      <div className="card" id={`card-${index + 1}`}>
        <div className="card-inner">
          <div className="card-content">
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: copy || "" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardStack: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);

useGSAP(
  () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Disable animations on mobile
    if (isMobile) {
      ScrollTrigger.getAll().forEach(t => t.kill());
      return;
    }

    const cardElements = gsap.utils.toArray<HTMLDivElement>(".card");
    if (!cardElements.length) return;

    ScrollTrigger.create({
      trigger: cardElements[0],
      start: "top 35%",
      endTrigger: cardElements[cardElements.length - 1],
      end: "top 30%",
      pin: ".stack-intro",
      pinSpacing: false,
    });

    cardElements.forEach((card, index) => {
      const isLast = index === cardElements.length - 1;
      const cardInner = card.querySelector(".card-inner");

      ScrollTrigger.create({
        trigger: card,
        start: "top 25%",
        pin: true,
        pinSpacing: false,
      });

      if (!isLast && cardInner) {
        gsap.to(cardInner, {
          y: `-${(cardElements.length - index) * 5}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 35%",
            endTrigger: ".stack-outro",
            end: "top 65%",
            scrub: true,
          },
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  },
  { scope: container }
);


  return (
    <>
      <div className="app" ref={container}>

        <section className="stack-intro w-full min-h-screen flex items-center px-10 gap-12">

          {/* LEFT IMAGE */}
          <div className="w-1/2">
            <div className="w-full h-[450px] overflow-hidden rounded-3xl">
              <img
                src={img.ajith}
                alt="intro visual"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* RIGHT TEXT */}

          <div className="right-text">
            <TextAnimation animateOnScroll blockColor="#fff">
              <h1 className="quote-heading">
                “कर्म करो, फल की चिंता मत करो”
                {/* <span className="quote-author"></span> */}
              </h1>
            </TextAnimation>
          </div>

        </section>


        <section className="cards">
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} />
          ))}
        </section>

        <section className="stack-outro ">
          <TextAnimation animateOnScroll blockColor="#b300ff" >

            <h1>Let's build something that will be remembered.</h1>
          </TextAnimation>
        </section>
      </div>
    </>
  );
};

export default CardStack;
