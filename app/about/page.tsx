"use client";

import { aboutData } from "@/db/about";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    profile,
    skills,
    certificates,
    workExperience: experience,
    education, // experience, certificates
  } = aboutData;
  // --- DỮ LIỆU ---

  // 1. Skills
  // const skills = [
  //   { name: "NEXT.JS", level: "90%", color: "bg-cyan-400" },
  //   { name: "React", level: "85%", color: "bg-pink-500" },
  //   { name: "NODE.JS", level: "70%", color: "bg-yellow-400" },
  //   { name: "NestJS", level: "80%", color: "bg-green-400" },
  //   { name: "TypeScript", level: "75%", color: "bg-blue-400" },
  //   { name: "Python", level: "25%", color: "bg-purple-400" },
  // ];

  // 2. Kinh nghiệm (Quest History)
  // const experience = [
  //   {
  //     year: "2024 - PRESENT",
  //     role: "SENIOR FRONTEND",
  //     company: "TECH CORP",
  //     desc: "Leader team, optimize performance, build system architecture.",
  //     active: true,
  //   },
  //   {
  //     year: "2022 - 2023",
  //     role: "WEB DEVELOPER",
  //     company: "FREELANCE",
  //     desc: "Developed 10+ websites for global clients using React & GSAP.",
  //     active: false,
  //   },
  //   {
  //     year: "2020 - 2022",
  //     role: "JUNIOR CODER",
  //     company: "STARTUP INC.",
  //     desc: "Maintained legacy code and implemented new UI features.",
  //     active: false,
  //   },
  // ];

  // // 3. [MỚI] Học vấn (Knowledge Base)
  // const education = [
  //   {
  //     year: "2016 - 2020",
  //     degree: "BS COMPUTER SCIENCE",
  //     school: "UNIVERSITY OF TECH",
  //     desc: "GPA: 3.8/4.0 - Specialized in Software Engineering.",
  //   },
  // ];

  // // 4. [MỚI] Chứng chỉ (Achievements)
  // const certificates = [
  //   {
  //     name: "AWS SOLUTION ARCHITECT",
  //     issuer: "AMAZON",
  //     date: "2023",
  //     icon: "☁️",
  //   },
  //   {
  //     name: "META FRONTEND DEV",
  //     issuer: "COURSERA",
  //     date: "2022",
  //     icon: "📜",
  //   },
  //   {
  //     name: "IELTS 7.5",
  //     issuer: "BRITISH COUNCIL",
  //     date: "2021",
  //     icon: "🗣️",
  //   },
  // ];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // PHASE 1: Mở TV
      tl.fromTo(
        container.current,
        { scaleX: 0, scaleY: 0.005, background: "#fff", autoAlpha: 1 },
        { scaleX: 1, duration: 0.3, ease: "power2.out" }
      ).to(container.current, {
        scaleY: 1,
        background: "#050505",
        duration: 0.3,
        ease: "power2.out",
      });

      // PHASE 2: Load nội dung
      tl.to(contentRef.current, { autoAlpha: 1, duration: 0.1 });

      // Avatar + Info trái
      tl.from(".left-panel-item", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // Text chạy (Bio)
      tl.to(".bio-text", {
        duration: 1,
        text: "LOADING DATA... \nName: Kai   \nCLASS: DEV",
        ease: "none",
      });

      // [MỚI] Animate Học vấn (Edu items)
      tl.from(
        ".edu-item",
        {
          x: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Animate Skills
      tl.from(
        ".skill-bar-fill",
        {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "-=0.5"
      );

      // [MỚI] Animate Chứng chỉ (Cert items) - Hiệu ứng rơi xuống
      tl.from(
        ".cert-item",
        {
          y: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "bounce.out",
        },
        "-=0.5"
      );

      // Animate Experience
      tl.from(
        ".exp-item",
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );
    },
    { scope: container }
  );

  const handleBack = () => {
    const tl = gsap.timeline({ onComplete: () => router.push("/") });
    tl.to(container.current, { scaleY: 0.005, duration: 0.2 });
    tl.to(container.current, { scaleX: 0, duration: 0.2 });
  };
  const handleNext = () => {
    const tl = gsap.timeline({ onComplete: () => router.push("/projects") });
    tl.to(container.current, { scaleY: 0.005, duration: 0.2 });
    tl.to(container.current, { scaleX: 0, duration: 0.2 });
  };

  return (
    <div
      ref={container}
      className="min-h-screen w-full bg-[#050505] overflow-y-auto scroll-smooth relative invisible font-pixel text-white selection:bg-pink-500 selection:text-black"
    >
      {/* Scanlines & Vignette */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-scanlines opacity-20" />
      <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />

      {/* Buttons Navigation */}
      <button
        onClick={handleBack}
        className="hidden md:absolute top-6 left-6 z-50 text-red-500 text-xs hover:bg-red-900/30 px-3 py-1 border border-red-500 transition-colors"
      >
        [ ESC ] BACK
      </button>
      <button
        onClick={handleNext}
        className="hidden md:absolute top-6 right-6 z-50 text-green-500 text-xs hover:bg-green-900/30 px-3 py-1 border border-green-500 transition-colors"
      >
        [ GO ] PROJECTS
      </button>

      <div
        ref={contentRef}
        className="container mx-auto h-screen flex flex-col md:flex-row p-6 pt-20 gap-8 opacity-0"
      >
        {/* --- CỘT TRÁI (CỐ ĐỊNH) --- */}
        <div className="w-full md:w-1/3 flex flex-col items-center border-r-2 border-dashed border-gray-800 pr-6">
          <div className="left-panel-item relative mb-6">
            <div className="w-48 h-48 border-4 border-cyan-400 bg-gray-900 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center justify-center">
              <Image
                src={profile.avatarUrl}
                alt="Avatar"
                width={192}
                height={192}
                className=" bg-cyan-600 animate-bounce-pixel "
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-black border border-cyan-400 px-2 text-cyan-400 text-xs">
              LVL.{profile.level}
            </div>
          </div>
          <div className="left-panel-item text-center space-y-2 mb-8">
            <h1 className="text-3xl text-yellow-400 drop-shadow-md">
              {profile.name}
            </h1>
            <p className="text-gray-500 text-xs">/// {profile.role}</p>
          </div>
          <button className="left-panel-item w-full py-3 bg-pink-600 border-b-4 border-pink-900 hover:translate-y-1 hover:border-b-0 transition-all text-xs tracking-widest uppercase mb-4">
            DOWNLOAD DATA [CV]
          </button>
          <div className="left-panel-item w-full bg-gray-900 p-3 text-[10px] space-y-2 border border-gray-700 font-mono">
            <div className="flex justify-between text-green-400">
              <span>HP</span>
              <span>{profile.hp}/100</span>
            </div>
            <div className="flex justify-between text-blue-400">
              <span>MP</span>
              <span>{profile.mp}/100</span>
            </div>
            <div className="flex justify-between text-purple-400">
              <span>EXP</span>
              <span>{profile.level}</span>
            </div>
          </div>
        </div>

        {/* --- CỘT PHẢI (CUỘN ĐƯỢC) --- */}
        <div ref={rightPanelRef} className="w-full md:w-2/3 h-full pr-2 pb-20">
          {/* 1. Bio Section */}
          <div className="mb-10">
            <h2 className="text-xl text-green-400 mb-4 border-b border-gray-800 pb-2">
              &gt;ENTITY
            </h2>
            <div className="bg-black/40 p-4 border-l-2 border-green-500 font-mono text-sm leading-relaxed text-gray-300 min-h-[80px]">
              <p className="bio-text whitespace-pre-line">{profile.bio}</p>
            </div>
          </div>

          {/* [MỚI] 2. Education Section (Knowledge Base) */}
          <div className="mb-10">
            <h2 className="text-xl text-yellow-400 mb-4 border-b border-gray-800 pb-2">
              &gt; SKILLS
            </h2>
            <div className="space-y-8 font-mono">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{s.name}</span>
                    <span>{s.level}</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-none overflow-hidden">
                    <div
                      className={`skill-bar-fill h-full ${s.color}`}
                      style={{ width: s.level }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Skills Section */}

          {/* [MỚI] 4. Certificates Section (Inventory/Achievements) */}

          {/* 5. Work Experience (Quest History) */}
          <div className="mb-10">
            <h2 className="text-xl text-pink-500 mb-6 border-b border-gray-800 pb-2 flex justify-between items-center">
              <span>&gt; QUEST HISTORY</span>
              <span className="text-[10px] animate-pulse">SYNCED</span>
            </h2>
            <div className="space-y-6 relative border-l border-gray-800 ml-2 pl-6 md:pl-8">
              {experience.map((exp, i) => (
                <div key={i} className="exp-item relative">
                  <div
                    className={`absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full border-2 border-black ${
                      exp.isActive
                        ? "bg-green-500 animate-pulse"
                        : "bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`p-4 border ${
                      exp.isActive
                        ? "border-green-500/50 bg-green-900/10"
                        : "border-gray-800 bg-gray-900/30"
                    } hover:bg-gray-800 transition-colors group`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h3
                        className={`text-sm md:text-base ${
                          exp.isActive ? "text-green-400" : "text-white"
                        }`}
                      >
                        {exp.position}{" "}
                        <span className="text-gray-500">@ {exp.company}</span>
                      </h3>
                      <span className="text-[10px] font-mono bg-black px-2 py-1 border border-gray-700 text-gray-400">
                        {exp.year}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-gray-400 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-10">
            <h2 className="text-xl text-blue-400 mb-4 border-b border-gray-800 pb-2">
              &gt; EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="edu-item flex flex-col md:flex-row gap-4 bg-gray-900/50 p-4 border border-blue-900/50 hover:border-blue-500 transition-colors"
                >
                  <div className="min-w-[120px] text-xs font-mono text-blue-300 border-r border-gray-700 pr-4 flex items-center">
                    [{edu.year}]
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-bold">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {edu.institution}
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono mt-2">
                      {edu.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-10">
            <h2 className="text-xl text-orange-400 mb-4 border-b border-gray-800 pb-2 flex justify-between">
              <span>&gt; CERTIFICATES</span>
              <span className="text-[10px] text-gray-500">
                [{certificates.length} ITEMS]
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert, i) => (
                <div
                  key={i}
                  className="cert-item bg-black border-2 border-gray-700 p-3 flex items-center gap-3 hover:border-orange-400 hover:bg-orange-900/10 transition-colors cursor-default group"
                >
                  <div className="w-10 h-10 bg-gray-800 flex items-center justify-center text-xl border border-gray-600 group-hover:border-orange-400">
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs text-white truncate group-hover:text-orange-300">
                      {cert.title}
                    </h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[9px] text-gray-500 uppercase">
                        {cert.issuer}
                      </span>
                      <span className="text-[9px] font-mono text-gray-400 border border-gray-800 px-1">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-[10px] text-gray-600">END OF RECORD ///</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
        .font-pixel {
          font-family: "Press Start 2P", cursive;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border: 1px solid #555;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.2)
          );
          background-size: 100% 4px;
        }
        .animate-bounce-pixel {
          animation: bounce 2s steps(4) infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
