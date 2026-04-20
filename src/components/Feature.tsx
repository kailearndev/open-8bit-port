import { WordsPullUpMultiStyle } from "./AnimatedText";
import FeatureCard from "./FeatureCard";
import FeatureList from "./FeatureList";
import { cvData } from "../data/cv";

const Features = () => {
    const { features } = cvData;

    return (
        <section id="projects" className="min-h-screen bg-black relative py-24 px-6 overflow-hidden">
            <div id="features" className="absolute -top-20" aria-hidden="true" />
            <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16">
                    <WordsPullUpMultiStyle segments={[
                        { text: features.headingPrimary, className: "text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl block w-full" },
                        { text: features.headingSecondary, className: "text-gray-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl block w-full" }
                    ]} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 lg:h-120">
                    <FeatureCard index={0} className="lg:col-span-1">
                        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                            <source src={features.canvasVideoSrc} type="video/mp4" />
                        </video>
                        <div className="absolute bottom-6 left-6 z-10 text-[#E1E0CC] font-medium">{features.canvasLabel}</div>
                    </FeatureCard>

                    {features.cards.map((card, index) => (
                        <FeatureCard key={card.num} index={index + 1} title={card.title} num={card.num} icon={card.icon} href={card.href}>
                            <FeatureList items={card.items} />
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;