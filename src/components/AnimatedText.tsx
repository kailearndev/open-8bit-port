import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordProps {
    text: string;
    showAsterisk?: boolean;
}

export const WordsPullUp = ({ text, showAsterisk }: WordProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const words = text.split(" ");

    return (
        <div ref={ref} className="flex flex-wrap">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="relative inline-block mr-[0.2em]"
                >
                    {word}
                    {showAsterisk && i === words.length - 1 && (
                        <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
                    )}
                </motion.span>
            ))}
        </div>
    );
};

interface MultiStyleSegment {
    text: string;
    className?: string;
}

export const WordsPullUpMultiStyle = ({ segments }: { segments: MultiStyleSegment[] }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    let wordIndex = 0;

    return (
        <div ref={ref} className="inline-flex flex-wrap justify-center text-center">
            {segments.map((segment, sIdx) => {
                const words = segment.text.split(" ");
                return words.map((word, wIdx) => {
                    const currentIdx = wordIndex++;
                    return (
                        <motion.span
                            key={`${sIdx}-${wIdx}`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: currentIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className={`${segment.className} inline-block mr-[0.25em]`}
                        >
                            {word}
                        </motion.span>
                    );
                });
            })}
        </div>
    );
};