import { motion, MotionValue, useTransform } from "framer-motion";

const AnimatedLetter = ({ char, index, total, progress }: { char: string, index: number, total: number, progress: MotionValue<number> }) => {
    const start = index / total;
    const end = start + 0.05;
    const opacity = useTransform(progress, [start, end], [0.2, 1]);

    return <motion.span style={{ opacity }} className="inline-block whitespace-pre">{char}</motion.span>;
};

export default AnimatedLetter;