import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion"; 
import { useRef } from "react";

interface RevealTextProps {
  text: string;
  className?: string;
}

const RevealText = ({ text, className }: RevealTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Explicitly typing the variants object
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1] as any 
      }
    },
  };

  return (
    <motion.h1
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "center",
        color: "inherit" 
      }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          style={{ marginRight: "0.25em", display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default RevealText;