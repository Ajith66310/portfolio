import React, { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export interface AnimationProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
}

const TextAnimation: React.FC<AnimationProps> = ({
  children,
  animateOnScroll = false,
  delay = 0,
  blockColor = "#aaff00",
  stagger = 0.1,
  duration = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitRefs = useRef<any[]>([]);
  const lines = useRef<HTMLElement[]>([]);
  const blocks = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRefs.current = [];
      lines.current = [];
      blocks.current = [];

      let elements: HTMLElement[] = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "block-line++",
          lineThreshold: 0.1,
        });

        splitRefs.current.push(split);

        split.lines.forEach((line) => {
          const node = line as HTMLElement; 
          const parent = node.parentNode as HTMLElement;

          const wrapper = document.createElement("div");
          wrapper.className = "block-line-wrapper";

          parent.insertBefore(wrapper, node);
          wrapper.appendChild(node);

          const block = document.createElement("div");
          block.className = "block-revealer";
          block.style.backgroundColor = blockColor;
          wrapper.appendChild(block);

          lines.current.push(node);
          blocks.current.push(block);
        });

      });

      gsap.set(lines.current, { opacity: 0 });
      gsap.set(blocks.current, { scaleX: 0, transformOrigin: "left center" });

      const createBlockRevealAnimation = (
        block: HTMLElement,
        line: HTMLElement,
        index: number
      ) => {
        const tl = gsap.timeline({
          delay: delay + index * stagger,
        });

        tl.to(block, {
          scaleX: 1,
          duration,
          ease: "power4.inOut",
        })
          .set(line, { opacity: 1 })
          .set(block, { transformOrigin: "right center" })
          .to(block, {
            scaleX: 0,
            duration,
            ease: "power4.inOut",
          });

        return tl;
      };

      if (animateOnScroll) {
        blocks.current.forEach((block, index) => {
          const tl = createBlockRevealAnimation(
            block,
            lines.current[index],
            index
          );

          tl.pause();

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
            onEnter: () => tl.play(),
          });
        });
      } else {
        blocks.current.forEach((block, index) => {
          createBlockRevealAnimation(
            block,
            lines.current[index],
            index
          );
        });
      }

      return () => {
        splitRefs.current.forEach((split) => split?.revert?.());

        const wrappers = containerRef.current?.querySelectorAll(
          ".block-line-wrapper"
        );

        wrappers?.forEach((wrapper) => {
          const w = wrapper as HTMLElement;
          const first = w.firstChild as HTMLElement | null;
          if (first && w.parentNode) {
            w.parentNode.insertBefore(first, w);
            w.remove();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, blockColor, stagger, duration],
    }
  );

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default TextAnimation;
