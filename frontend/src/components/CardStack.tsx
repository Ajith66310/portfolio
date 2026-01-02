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
      const cardElements = gsap.utils.toArray<HTMLDivElement>(".card");

      if (cardElements.length === 0) return;

      cardElements.forEach((card, index) => {
        const isLastCard = index === cardElements.length - 1;
        const cardInner = card.querySelector(".card-inner");

        // UNIVERSAL PINNING (Works on Desktop & Mobile)
        ScrollTrigger.create({
          trigger: card,
          start: "top top", // Pins when the card hits the very top
          endTrigger: ".stack-outro",
          end: "top 100%",
          pin: true,
          pinSpacing: false, // Allows the next card to roll over it
          invalidateOnRefresh: true,
        });

        // Effect for the card being covered
        if (!isLastCard) {
          gsap.to(cardInner, {
            scale: 0.9,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: cardElements[index + 1], // Start effect when NEXT card arrives
              start: "top 100%",
              end: "top top",
              scrub: true,
            },
          });
        }
      });

      return () => ScrollTrigger.getAll().forEach(st => st.kill());
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