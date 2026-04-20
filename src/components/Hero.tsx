
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from './AnimatedText';
import { cvData } from '../data/cv';
import cv from '../data/cv.pdf';
const Hero = () => {
    const { hero } = cvData;

    return (
        <section id="home" className="h-screen p-4 md:p-6 relative">
            <div className="w-full h-full relative rounded-2xl md:rounded-4xl overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" type="video/mp4" />
                </video>

                {/* Overlays */}
                <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60" />

                {/* Navbar */}
                <nav className="absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 z-20 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
                    {hero.navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-[10px] sm:text-xs md:text-sm transition-colors duration-300"
                            style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#E1E0CC'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
                    <div className="grid grid-cols-12 items-end gap-6">
                        <div className="col-span-12 lg:col-span-8">
                            <h1 className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]">
                                <WordsPullUp text={hero.displayName} showAsterisk />
                            </h1>
                        </div>

                        <div className="col-span-12 lg:col-span-4 flex flex-col items-start gap-6 lg:pb-8">
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] max-w-sm"
                            >
                                {hero.subtitle}
                            </motion.p>

                            <motion.a
                                href={cv}
                                download="CV NGUYEN VU LUAN.pdf"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="group flex items-center gap-2 bg-primary text-black px-1 py-1 pr-1 pl-6 rounded-full font-medium transition-all hover:gap-3"

                            >

                                <span className="text-sm sm:text-base">{hero.ctaLabel}</span>
                                <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                                    <ArrowRight size={20} className="text-primary" />
                                </div>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;