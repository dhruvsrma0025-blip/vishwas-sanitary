import { motion, useReducedMotion } from 'framer-motion';

/** Wraps a section so it fades and slides in the first time it enters view. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = 'div',
  amount = 0.18,
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.62,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
