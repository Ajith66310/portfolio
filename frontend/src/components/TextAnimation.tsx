import React, { useRef, useState, useEffect } from "react";
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

  const splitRefs = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);
  const blocks = useRef<HTMLElement[]>([]);
  const triggers = useRef<ScrollTrigger[]>([]);

  const [ready, setReady] = useState(false);

  // ✅ Wait until ScreenWarning is gone
  useEffect(() => {
    if ((window as any).__INTRO_BLOCKED__) {
      const handler = () => {
        window.removeEventListener("intro-unblocked", handler);
        setReady(true);
      };
      window.addEventListener("intro-unblocked", handler);
    } else {
      setReady(true);
    }
  }, []);

  useGSAP(
    async () => {
      if (!ready) return; // DO NOT initialize animations until ready
      const container = containerRef.current;
      if (!container) return;

      if (document.fonts) await document.fonts.ready;

      // RESET
      splitRefs.current = [];
      lines.current = [];
      blocks.current = [];
      triggers.current = [];

      const elements = Array.from(container.children) as HTMLElement[];

      elements.forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "block-line",
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
      gsap.set(blocks.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const playLine = (
        block: HTMLElement,
        line: HTMLElement,
        index: number
      ) => {
        return gsap
          .timeline({ delay: delay + index * stagger })
          .to(block, { scaleX: 1, duration, ease: "power4.inOut" })
          .set(line, { opacity: 1 })
          .set(block, { transformOrigin: "right center" })
          .to(block, { scaleX: 0, duration, ease: "power4.inOut" });
      };

      if (animateOnScroll) {
        const master = gsap.timeline({ paused: true });
        blocks.current.forEach((block, i) => master.add(playLine(block, lines.current[i], i), 0));

        const trigger = ScrollTrigger.create({
          trigger: container,
          start: "top 85%",
          once: true,
          onEnter: () => master.play(),
        });

        triggers.current.push(trigger);
      } else {
        blocks.current.forEach((block, i) => playLine(block, lines.current[i], i));
      }

      return () => {
        triggers.current.forEach((t) => t.kill());
        splitRefs.current.forEach((s) => s.revert());
        container.querySelectorAll(".block-line-wrapper").forEach((wrapper) => {
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
      dependencies: [ready, animateOnScroll, delay, blockColor, stagger, duration],
    }
  );

  return <div ref={containerRef}>{children}</div>;
};

export default TextAnimation;
