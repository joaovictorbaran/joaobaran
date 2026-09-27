"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
};

const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: revealEase,
      delay: delay / 1000,
    },
  }),
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const classes = ["reveal", className].filter(Boolean).join(" ");

  return (
    <motion.div
      className={classes}
      style={style}
      custom={delay}
      variants={revealVariants}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
