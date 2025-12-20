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
      const mm = gsap.matchMedia();
      const cardElements = gsap.utils.toArray<HTMLDivElement>(".card");

      if (cardElements.length === 0) return;

      // DESKTOP & TABLET ANIMATIONS
      mm.add("(min-width: 901px)", () => {
        // Outro pin (The Intro section stays while cards scroll)
        ScrollTrigger.create({
          trigger: cardElements[0],
          start: "top 35%",
          endTrigger: cardElements[cardElements.length - 1],
          end: "top 30%",
          pin: ".stack-intro",
          pinSpacing: false,
        });

        // Animate stack logic
        cardElements.forEach((card, index) => {
          const isLastCard = index === cardElements.length - 1;
          const cardInner = card.querySelector<HTMLDivElement>(".card-inner");

          if (!isLastCard) {
            ScrollTrigger.create({
              trigger: card,
              start: "top 25%",
              endTrigger: ".stack-outro",
              end: "top 65%",
              pin: true,
              pinSpacing: false,
              // anticipatePin: 1, // Smooths out the start of the pin
            });

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
      });

      // MOBILE ANIMATIONS (Fade in instead of pinning to prevent glitches)
      mm.add("(max-width: 900px)", () => {
        cardElements.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.8, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <div className="app" ref={container} style={{ overflowX: "hidden" }}>
      <section className="stack-intro w-full min-h-screen flex items-center px-10 gap-12">
        <div className="w-1/2 intro-img-container">
          <div className="w-full h-[450px] overflow-hidden rounded-3xl">
            <img
              src={img.ajith}
              alt="intro visual"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        <div className="right-text">
          <TextAnimation animateOnScroll blockColor="#fff">
            <h1 className="quote-heading">“कर्म करो, फल की चिंता मत करो”</h1>
          </TextAnimation>
        </div>
      </section>

      <section className="cards">
        {cards.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </section>

      <section className="stack-outro">
        <TextAnimation animateOnScroll blockColor="#b300ff">
          <h1 className="outro-text">Let's build something that will be remembered.</h1>
        </TextAnimation>
      </section>
    </div>
  );
};

export default CardStack;