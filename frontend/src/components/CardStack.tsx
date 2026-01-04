import "./cardstack.css";
import img, { cards } from "../assets/assest";
import type { Cards } from "../assets/assest";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import GitHubGraph from "./GitHubGraph";
import RevealText from "./RevealText";

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

        // PIN IN CENTER
        ScrollTrigger.create({
          trigger: card,
          start: "center center",
          endTrigger: ".stack-outro",
          end: "top 100%",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        if (!isLastCard) {
          gsap.to(cardInner, {
            scale: 0.9,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: cardElements[index + 1],
              start: "top 100%",
              end: "center center",
              scrub: true,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: container }
  );

  return (
    <div className="app" ref={container} style={{ overflowX: "hidden" }}>
      <section className="stack-intro w-full min-h-screen flex items-center px-10 gap-12 ">
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
          <RevealText
            className="quote-heading"
            text="Every great developer was once a beginner who refused to give up today."
          />
        </div>
      </section>


      <section className="github-contributions">
        <GitHubGraph />
      </section>

      <section className="cards">
        {cards.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </section>

      <section className="stack-outro">
        <RevealText className="outro-text" text="Let's build something that will be remembered."/>  
      </section>
    </div>
  );
};

export default CardStack;