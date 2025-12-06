import Link from '@/components/ui/Link';

export default function Footer() {
  return (
    <footer className="relative bg-[#2a2a2a] py-10 px-5 text-center z-10">
      <div className="flex justify-center gap-[30px] mb-5">
        <Link
          href="#"
          external
          noBaseStyles
          aria-label="Behance"
          className="text-white no-underline text-2xl w-[50px] h-[50px] flex items-center justify-center border-2 border-white rounded-full transition-all hover:bg-white hover:text-[#2a2a2a]"
        >
          Be
        </Link>
        <Link
          href="#"
          external
          noBaseStyles
          aria-label="Facebook"
          className="text-white no-underline text-2xl w-[50px] h-[50px] flex items-center justify-center border-2 border-white rounded-full transition-all hover:bg-white hover:text-[#2a2a2a]"
        >
          f
        </Link>
        <Link
          href="#"
          external
          noBaseStyles
          aria-label="Instagram"
          className="text-white no-underline text-2xl w-[50px] h-[50px] flex items-center justify-center border-2 border-white rounded-full transition-all hover:bg-white hover:text-[#2a2a2a]"
        >
          📷
        </Link>
      </div>
    </footer>
  );
}

