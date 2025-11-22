export default function Footer() {
  return (
    <footer className="relative bg-[#2a2a2a] py-10 px-5 text-center z-10">
      <div className="flex justify-center gap-[30px] mb-5">
        <a
          href="#"
          aria-label="Behance"
          className="text-white no-underline text-2xl w-[50px] h-[50px] flex items-center justify-center border-2 border-white rounded-full transition-all hover:bg-white hover:text-[#2a2a2a]"
        >
          Be
        </a>
        <a
          href="#"
          aria-label="Facebook"
          className="text-white no-underline text-2xl w-[50px] h-[50px] flex items-center justify-center border-2 border-white rounded-full transition-all hover:bg-white hover:text-[#2a2a2a]"
        >
          f
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="text-white no-underline text-2xl w-[50px] h-[50px] flex items-center justify-center border-2 border-white rounded-full transition-all hover:bg-white hover:text-[#2a2a2a]"
        >
          📷
        </a>
      </div>
    </footer>
  );
}

