import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const FeatureCard = ({ children, index, title, num, icon, href, className = "" }: { children: React.ReactNode; index: number; title?: string; num?: string; icon?: string; href?: string; className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: index * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`relative bg-[#212121] rounded-3xl overflow-hidden p-8 flex flex-col h-full ${className}`}
        >
            {icon && <img src={icon} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6" />}
            {title && (
                <div className="flex justify-between items-start mb-8">
                    <h3 className="text-xl font-medium max-w-[150px]">{title}</h3>
                    <span className="text-gray-500 text-sm">({num})</span>
                </div>
            )}
            {children}
            {title && (
                <a href={href} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-2 text-primary text-sm hover:underline">
                    Learn more <ArrowRight size={14} className="-rotate-45" />
                </a>
            )}
        </motion.div>
    );
};
export default FeatureCard;