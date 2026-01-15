"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "PROJECTS", path: "/projects" },
  { label: "CONTACT", path: "/contact" },
];

export default function GameMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Để biết đang ở trang nào

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Animation mở/đóng Menu
  useGSAP(
    () => {
      if (isOpen) {
        // Hiệu ứng mở
        gsap.to(".menu-overlay", {
          autoAlpha: 1,
          duration: 0.1,
        });

        gsap.fromTo(
          ".menu-box",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.fromTo(
          ".menu-link",
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.1 }
        );
      } else {
        // Hiệu ứng đóng
        gsap.to(".menu-overlay", {
          autoAlpha: 0,
          duration: 0.2,
        });
      }
    },
    { scope: menuRef, dependencies: [isOpen] }
  );

  // Bắt sự kiện phím ESC để mở/đóng
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div ref={menuRef} className="font-pixel relative z-[9999]">
      {/* Nút Hamburger (Góc phải trên cùng) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[100] bg-black border-2 border-white text-white w-12 h-12 flex flex-col items-center justify-center gap-1 hover:bg-gray-800 transition-colors shadow-[4px_4px_0_#555] active:translate-y-1 active:shadow-none"
      >
        {isOpen ? (
          <span className="text-xl font-bold">X</span>
        ) : (
          <>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </>
        )}
      </button>

      {/* Overlay Menu */}
      <div className="menu-overlay fixed inset-0 bg-black/90 invisible flex items-center justify-center backdrop-blur-sm">
        {/* Hộp Menu chính */}
        <div className="menu-box bg-[#00008b] border-4 border-white p-2 shadow-[0_0_50px_rgba(0,0,255,0.5)] max-w-sm w-full mx-4">
          <div className="border-2 border-dashed border-gray-400 p-6 flex flex-col items-center text-center">
            <h2 className="text-yellow-400 text-2xl mb-8 border-b-4 border-yellow-400 pb-2 w-full">
              PAUSE MENU
            </h2>

            <nav className="flex flex-col gap-6 w-full">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className={`menu-link group text-lg md:text-xl uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center justify-center gap-3 ${
                      isActive ? "text-green-400" : "text-white"
                    }`}
                  >
                    {/* Icon bàn tay chỉ hiện khi hover hoặc active */}
                    <span
                      className={`opacity-0 group-hover:opacity-100 ${
                        isActive ? "opacity-100" : ""
                      } transition-opacity`}
                    >
                      👉
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 text-[10px] text-gray-400">
              PRESS [ESC] TO RESUME
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Import font nếu cần, nhưng thường đã có trong layout rồi */
        .font-pixel {
          font-family: "Press Start 2P", cursive;
        }
      `}</style>
    </div>
  );
}
