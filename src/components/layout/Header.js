import Link from '@/components/ui/Link';
import { Search } from 'lucide-react';

export default function Header({ isFixed = false }) {
  const positionClasses = isFixed 
    ? "fixed top-0 left-0 right-0 z-50" 
    : "relative z-50";
  
  return (
    <header className={`w-full bg-background shadow-md ${positionClasses}`}>
      <div className="w-full px-[50px] py-5 flex items-center md:px-5 md:py-4">
        <Link href="/" noBaseStyles className="flex items-center w-1/2">
          <img
            src="/assets/logo.png"
            alt="OLY Logo"
            className="h-auto"
          />
        </Link>

        <div className="w-1/2 flex items-center justify-evenly">
          <nav className="flex items-center gap-10 md:gap-4">
            <Link href="/projects" className="text-xs font-normal md:text-[10px] text-foreground">
              Project
            </Link>
            <Link href="#product" className="text-xs font-normal md:text-[10px] text-foreground">
              Product
            </Link>
            <Link href="#about" className="text-xs font-normal md:text-[10px] text-foreground">
              About
            </Link>
            <Link href="#contact" className="text-xs font-normal md:text-[10px] text-foreground">
              Contact
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Search"
            className="text-foreground hover:text-[#666] transition-colors"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            className="text-sm text-foreground hover:text-[#666] transition-colors md:text-xs"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

