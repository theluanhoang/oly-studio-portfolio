import Link from '@/components/ui/Link';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="w-full px-[50px] py-5 flex items-center justify-between md:px-5 md:py-4">
        <Link href="/" noBaseStyles className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="OLY Logo"
            className="h-auto"
          />
        </Link>

        <nav className="flex items-center gap-10 md:gap-4">
          <Link href="/projects" className="text-xs font-normal md:text-[10px]">
            Project
          </Link>
          <Link href="#product" className="text-xs font-normal md:text-[10px]">
            Product
          </Link>
          <Link href="#about" className="text-xs font-normal md:text-[10px]">
            About
          </Link>
          <Link href="#contact" className="text-xs font-normal md:text-[10px]">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-6 md:gap-4">
          <button
            type="button"
            aria-label="Search"
            className="text-black hover:text-[#666] transition-colors"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="text-sm text-black hover:text-[#666] transition-colors md:text-xs"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

