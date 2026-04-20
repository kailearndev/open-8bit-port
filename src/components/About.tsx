import { useScroll } from "framer-motion";
import { useRef } from "react";
import { WordsPullUpMultiStyle } from "./AnimatedText";
import AnimatedLetter from "./AnimatedLetter";
import { cvData } from "../data/cv";

const About = () => {
    const containerRef = useRef(null);
    const { about } = cvData;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.2"]
    });

    return (
        <section id="about" className="bg-black py-24 px-6">
            <div className="max-w-6xl mx-auto bg-[#101010] rounded-[2rem] p-12 md:p-24 text-center">
                <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8 block">{about.sectionLabel}</span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9] mb-12">
                    <WordsPullUpMultiStyle segments={[
                        { text: about.headingLead, className: "font-normal" },
                        { text: about.headingRole, className: "font-serif italic" },
                        { text: about.headingSkills, className: "font-normal" }
                    ]} />
                </h2>

                <p ref={containerRef} className="text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed flex flex-wrap justify-center">
                    {about.bio.split("").map((char, i) => (
                        <AnimatedLetter key={i} char={char} index={i} total={about.bio.length} progress={scrollYProgress} />
                    ))}
                </p>
            </div>
        </section>
    );
};


export default About;