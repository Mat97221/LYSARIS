import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

// TODO: remplace par une URL de vidéo directe (mp4/webm) — ex. images des
// bassins d'élevage ou de la mise en boîte du caviar. Tant que c'est vide,
// le hero retombe simplement sur le fond navy uni.
const HERO_VIDEO_URL = "";

const NAV_LINKS = ["Accueil", "Boutique", "Notre Maison", "Contact"];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0A1F3D] font-geist">
      {/* Video background */}
      {HERO_VIDEO_URL && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={HERO_VIDEO_URL}
        />
      )}
      <div className="absolute inset-0 bg-[#0A1F3D]/40" />

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-10">
          <span className="text-lg font-semibold tracking-tight text-[#FAF6EF] sm:text-xl">
            MARENOSTRUM
          </span>
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-[#FAF6EF]/80 transition-colors hover:text-[#FAF6EF]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#"
          className="hidden rounded-lg bg-[#FAF6EF] px-5 py-2 text-sm font-medium text-[#0A1F3D] transition-transform hover:scale-105 md:inline-flex"
        >
          Nous contacter
        </a>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
          className="relative z-50 flex h-10 w-10 items-center justify-center text-[#FAF6EF] transition-transform duration-300 active:scale-90 md:hidden"
        >
          <Menu
            size={24}
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            size={24}
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`absolute inset-x-0 top-0 z-20 bg-[#0A1F3D]/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen
            ? "h-screen opacity-100"
            : "pointer-events-none h-0 opacity-0"
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all duration-500 delay-100 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-medium text-[#FAF6EF]/90 hover:text-[#FAF6EF]"
              >
                {link}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 w-fit rounded-full bg-[#FAF6EF] px-8 py-3.5 text-base font-medium text-[#0A1F3D] transition-transform hover:scale-105"
          >
            Nous contacter
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-4 animate-[fadeSlideUp_0.8s_ease_0.2s_both] text-xs text-[#FAF6EF]/90 sm:mb-6 sm:text-sm">
            Éleveur · Affineur
          </p>
          <h1 className="animate-[fadeSlideUp_0.8s_ease_0.4s_both] font-serif-lux text-3xl font-medium leading-[1.1] tracking-tight text-[#FAF6EF] sm:text-5xl md:text-6xl lg:text-7xl">
            L'art du caviar,
            <br />
            sans compromis.
          </h1>
        </div>

        <div>
          <p className="mb-5 max-w-sm animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-sm leading-relaxed text-[#FAF6EF]/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">
            Osciètre, Beluga, Sevruga et Kaluga — élevés et affinés en France,
            livrés en 24-48h dans le respect de la tradition Malossol.
          </p>
          <div className="flex animate-[fadeSlideUp_0.8s_ease_0.9s_both] gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FAF6EF] px-5 py-2.5 text-sm font-medium text-[#0A1F3D] transition-transform hover:scale-105 sm:px-6 sm:py-3"
            >
              Découvrir la boutique
              <ArrowRight size={16} />
            </a>
            <a
              href="#"
              className="rounded-lg border border-[#FAF6EF]/40 px-5 py-2.5 text-sm font-medium text-[#FAF6EF] transition-colors hover:bg-[#FAF6EF]/10 sm:px-6 sm:py-3"
            >
              Notre histoire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
