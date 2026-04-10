import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/categories", label: "Tests" },
    { to: "/adulterants", label: "Common Adulterants" },
    { to: "/pledge", label: "Take Pledge" },
    { to: "/awareness", label: "Contact" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header>
      {/* Top logo bar */}
      <div style={{ background: "#0d1b3e" }} className="py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: FSSAI + Govt emblem */}
          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/b5/FSSAI_logo.png"
              alt="FSSAI"
              style={{ height: 48, width: "auto", objectFit: "contain" }}
              onError={(e) => {
                e.target.outerHTML = `<div style="color:#ef5350;font-weight:900;font-size:22px;font-style:italic;letter-spacing:-1px">fssai</div>`;
              }}
            />
            <div style={{ width: 1, height: 40, background: "#4a5568", margin: "0 4px" }} />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Govt of India"
              style={{ height: 48, width: "auto", objectFit: "contain" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          {/* Center: DART Logo */}
          <div className="flex items-center gap-3">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" fill="#1a5c36"/>
              <path d="M28 10 C22 10 17 16 17 24 C17 33 28 46 28 46 C28 46 39 33 39 24 C39 16 34 10 28 10Z" fill="#2e9d58" opacity="0.8"/>
              <circle cx="28" cy="24" r="7" fill="white" opacity="0.15"/>
              <rect x="20" y="22" width="3" height="9" rx="1.5" fill="white"/>
              <rect x="26" y="18" width="3" height="13" rx="1.5" fill="white"/>
              <rect x="32" y="20" width="3" height="11" rx="1.5" fill="white"/>
              <path d="M15 36 Q28 42 41 36" stroke="#4caf50" strokeWidth="1.5" fill="none"/>
            </svg>
            <div>
              <div style={{ color: "white", fontWeight: 900, fontSize: 28, letterSpacing: 2, lineHeight: 1 }}>DART</div>
              <div style={{ color: "#4caf50", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, lineHeight: 1.4 }}>DETECT ADULTERATION</div>
              <div style={{ color: "#4caf50", fontSize: 9, fontWeight: 700, letterSpacing: 1.5 }}>WITH RAPID TEST</div>
            </div>
          </div>

          {/* Right: Eat Right India */}
          <div className="flex items-center gap-3">
            <svg width="58" height="58" viewBox="0 0 58 58">
              <circle cx="29" cy="29" r="28" fill="white"/>
              <path d="M29 2 A27 27 0 0 1 56 29 L29 29 Z" fill="#4CAF50"/>
              <path d="M56 29 A27 27 0 0 1 29 56 L29 29 Z" fill="#FFC107"/>
              <path d="M29 56 A27 27 0 0 1 2 29 L29 29 Z" fill="#2196F3"/>
              <path d="M2 29 A27 27 0 0 1 29 2 L29 29 Z" fill="#FF5722"/>
              <circle cx="29" cy="29" r="15" fill="white"/>
              <circle cx="29" cy="24" r="5" fill="#4CAF50" opacity="0.8"/>
              <path d="M22 35 Q29 28 36 35" stroke="#4CAF50" strokeWidth="2" fill="none"/>
            </svg>
            <div>
              <div style={{ color: "white", fontWeight: 800, fontSize: 20, lineHeight: 1.1 }}>Eat Right</div>
              <div style={{ color: "#FFC107", fontWeight: 800, fontSize: 20, lineHeight: 1.1 }}>India</div>
              <div style={{ color: "#9ca3af", fontSize: 11 }}>सही भोजन, बेहतर जीवन</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav style={{ background: "#1e2d5a" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={isActive(l.to) ? { background: "#2563eb", color: "white" } : { color: "#d1d5db" }}
                  className="px-5 py-4 text-sm font-medium transition-all hover:text-white hover:bg-white hover:bg-opacity-10"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              to="/categories"
              className="hidden md:flex items-center gap-2 my-2 px-4 py-2 text-sm rounded text-white hover:bg-white hover:bg-opacity-10 transition-colors"
              style={{ border: "1px solid #6b7280" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              View Data
            </Link>
            <button className="md:hidden text-white p-3" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
          {menuOpen && (
            <div className="md:hidden pb-3 border-t pt-2" style={{ borderColor: "#2d3f7a" }}>
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium"
                  style={isActive(l.to) ? { background: "#2563eb", color: "white" } : { color: "#d1d5db" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
