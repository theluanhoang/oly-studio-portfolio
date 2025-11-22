export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 px-[50px] py-5 flex justify-between items-center z-50 shadow-[0_2px_10px_rgba(0,0,0,0.1)] md:px-5 md:py-4">
      <nav className="flex gap-20 items-center w-full justify-center md:gap-8">
        <a href="#projects" className="no-underline text-[#333] text-sm tracking-[2px] uppercase transition-colors hover:text-[#666] md:text-xs">
          PROJECT
        </a>
        <div className="text-2xl font-bold tracking-[3px] px-5 py-2 border-2 border-[#333] text-[#333] md:text-lg md:px-4 md:py-1.5">
          OLY
        </div>
        <a href="#about" className="no-underline text-[#333] text-sm tracking-[2px] uppercase transition-colors hover:text-[#666] md:text-xs">
          ABOUT
        </a>
      </nav>
    </header>
  );
}

