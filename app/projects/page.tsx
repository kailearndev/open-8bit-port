"use client";

import { projectData } from "@/db/project";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const categories = ["ALL", "FE", "BE", "FULLSTACK"];

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [filter, setFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Lọc dự án
  const filteredProjects =
    filter === "ALL"
      ? projectData
      : projectData.filter((p) => p.tag === filter);

  // Animation logic giữ nguyên
  useGSAP(
    () => {
      const tl = gsap.timeline();
      if (!container.current?.classList.contains("loaded")) {
        tl.fromTo(
          container.current,
          { scaleX: 0, scaleY: 0.005, background: "#fff", autoAlpha: 1 },
          { scaleX: 1, duration: 0.3, ease: "power2.out" }
        ).to(container.current, {
          scaleY: 1,
          background: "#050505",
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => container.current?.classList.add("loaded"),
        });
      }
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.2)",
          overwrite: "auto",
        }
      );
    },
    { scope: container, dependencies: [filter] }
  );

  return (
    // THAY ĐỔI 1: Dùng flex-col và h-dvh (dynamic viewport height) để fix lỗi trên mobile browser
    <div
      ref={container}
      className="flex flex-col h-dvh w-full bg-[#050505] overflow-hidden relative invisible text-white font-pixel"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent shadow-[0_0_10px_#0f0] z-50"></div>

      {/* Header Controls */}
      {/* THAY ĐỔI 2: shrink-0 để header không bị co lại khi nội dung bên dưới dài ra */}
      <div className="relative z-40 p-4 md:p-10 flex flex-col md:flex-row justify-between items-center border-b border-gray-800 bg-black/80 backdrop-blur-sm shrink-0">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl text-green-400 drop-shadow-[2px_2px_0_rgba(255,255,255,0.2)]">
            PROJECTS
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-2 text-[10px] md:text-xs border-2 transition-all transform hover:-translate-y-1 ${
                filter === cat
                  ? "border-yellow-400 bg-yellow-400/20 text-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                  : "border-gray-700 text-gray-500 hover:border-white hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      {/* THAY ĐỔI 3: flex-1 để chiếm toàn bộ không gian còn lại, overflow-y-auto dời vào đây */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 pb-20 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              onClick={() => setSelectedProject(project)}
              className="project-card group relative bg-gray-900 border-4 border-gray-700 cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300 flex flex-col"
            >
              {/* Ảnh Thumbnail */}
              <div className="h-40 md:h-48 w-full bg-gray-800 relative overflow-hidden border-b-4 border-gray-700 group-hover:border-cyan-400 transition-colors shrink-0">
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 z-10 transition-colors"></div>
                <div className="w-full h-full flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="absolute top-2 right-2 bg-black/80 text-[10px] px-2 py-1 border border-white text-white z-20">
                  {project.tag}
                </span>
              </div>

              {/* Nội dung Card */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base md:text-lg text-white mb-2 group-hover:text-cyan-400">
                  {project.title}
                </h3>
                <p className="text-[10px] text-gray-400 line-clamp-2 font-mono mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.slice(0, 4).map((t: string) => (
                    <span
                      key={t}
                      className="text-[9px] bg-gray-800 px-1 py-0.5 text-gray-300 border border-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[9px] text-gray-500 px-1">+More</span>
                  )}
                </div>
              </div>

              <div className="absolute -bottom-1 -right-1 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL (MISSION BRIEFING) --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* THAY ĐỔI 4: Modal Responsive 
              - max-h-[90vh]: Đảm bảo modal không cao hơn màn hình
              - overflow-y-auto: Cho phép cuộn NỘI DUNG bên trong modal
          */}
          <div
            className="bg-black border-4 border-white p-1 max-w-2xl w-full shadow-[0_0_50px_rgba(0,255,0,0.2)] animate-pop-in max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-2 border-dashed border-gray-600 p-4 md:p-6 relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-900 px-2 z-10 bg-black"
              >
                [X]
              </button>

              <h2 className="text-xl md:text-3xl text-yellow-400 mb-6 border-b border-yellow-400/30 pb-4 pr-8 break-words">
                {">"} {selectedProject.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full relative h-48 md:h-auto min-h-[160px] bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xs text-gray-500">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-gray-500 text-xs block mb-1">
                      TITLE:
                    </span>
                    <p className="text-white text-base md:text-lg">
                      {selectedProject.title}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block mb-1">
                      DESCRIPTION:
                    </span>
                    <p className="text-green-400 text-xs font-mono leading-relaxed text-justify">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block mb-1">
                      TECHNOLOGIES:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] bg-blue-900/30 border border-blue-500 px-2 py-1 text-blue-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={selectedProject.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-black py-3 text-center text-xs md:text-sm font-bold hover:bg-green-500 transition-colors border-b-4 border-green-800 active:border-0 active:translate-y-1"
                >
                  INITIATE_DEMO
                </a>
                <a
                  href={selectedProject.repoLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-700 text-white py-3 text-center text-xs md:text-sm font-bold hover:bg-gray-600 transition-colors border-b-4 border-gray-900 active:border-0 active:translate-y-1"
                >
                  VIEW_SOURCE
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
        .font-pixel {
          font-family: "Press Start 2P", cursive;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111;
        }

        @keyframes popIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pop-in {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
}
