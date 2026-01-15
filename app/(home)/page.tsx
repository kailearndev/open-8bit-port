"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // Hiệu ứng di chuột tạo độ nghiêng 3D (Parallax Tilt)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!screenRef.current) return;

      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // Xoay tối đa 20 độ
      const y = (e.clientY / innerHeight - 0.5) * 20;

      gsap.to(screenRef.current, {
        rotationY: x,
        rotationX: -y,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation Intro & Glitch
  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Mở màn hình (Scale lên)
      tl.from(screenRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
      });

      // 2. Chữ Glitch xuất hiện
      tl.from(".glitch-text", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})", // Hiệu ứng rung
      });

      // 3. Nút Start nhấp nháy neon
      gsap.to(".start-btn", {
        textShadow: "0 0 20px #0f0, 0 0 40px #0f0",
        color: "#fff",
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container }
  );

  // Xử lý chuyển trang: Hiệu ứng tắt TV cũ
  const handleEnter = () => {
    const tl = gsap.timeline({
      onComplete: () => router.push("/about"),
    });

    // Bước 1: Thu nhỏ thành đường ngang
    tl.to(screenRef.current, {
      scaleY: 0.01,
      background: "#fff", // Chớp trắng
      duration: 0.2,
      ease: "power2.in",
    });

    // Bước 2: Thu nhỏ thành điểm giữa rồi biến mất
    tl.to(screenRef.current, {
      scaleX: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main
      ref={container}
      className="min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden perspective-container"
    >
      {/* Background Grid chuyển động */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>

      {/* Màn hình Arcade chính */}
      <div
        ref={screenRef}
        className="relative w-[90vw] max-w-[800px] aspect-video bg-[#111] border-[10px] border-[#333] shadow-[0_0_50px_rgba(0,255,0,0.2)] rounded-lg overflow-hidden flex flex-col items-center justify-center text-center"
      >
        {/* Lớp phủ CRT (Scanlines + Cong góc) */}
        <div className="crt-overlay absolute inset-0 pointer-events-none z-50"></div>

        <h1 className="glitch-text text-sm md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#0f0] to-[#005500] font-pixel mb-4 filter drop-shadow-[4px_4px_0_rgba(255,0,255,0.8)]">
          LUAN VU
          <br />
          PORTFOLIO
        </h1>

        <p className="glitch-text text-[#0f0] text-sm md:text-xl font-mono md:mb-12 tracking-widest">
          // SYSTEM INITIALIZED
        </p>

        <button
          onClick={handleEnter}
          className="start-btn text-sm md:text-3xl text-[#0f0] font-pixel border-2 border-[#0f0] p-2 md:px-8 md:py-4 bg-[#001100] hover:bg-[#0f0] hover:text-black transition-colors cursor-pointer z-40"
        >
          PRESS START
        </button>
      </div>

      <style jsx global>{`
        /* Import Font 8-bit nếu chưa có */
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        .font-pixel {
          font-family: "Press Start 2P", cursive;
        }

        .perspective-container {
          perspective: 1000px; /* Tạo chiều sâu 3D */
        }

        /* Grid Background chạy lùi về sau */
        .grid-bg {
          background-image: linear-gradient(
              rgba(0, 255, 0, 0.2) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          animation: gridMove 2s linear infinite;
        }

        @keyframes gridMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0 50px;
          }
        }

        /* Hiệu ứng màn hình CRT cũ */
        .crt-overlay {
          background: linear-gradient(
              rgba(18, 16, 16, 0) 50%,
              rgba(0, 0, 0, 0.25) 50%
            ),
            linear-gradient(
              90deg,
              rgba(255, 0, 0, 0.06),
              rgba(0, 255, 0, 0.02),
              rgba(0, 0, 255, 0.06)
            );
          background-size: 100% 2px, 3px 100%;
          box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.7); /* Tạo hiệu ứng tối 4 góc */
        }
      `}</style>
    </main>
  );
}
