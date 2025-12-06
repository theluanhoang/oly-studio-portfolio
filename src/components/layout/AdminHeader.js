import Link from '@/components/ui/Link';

export default function AdminHeader() {
  return (
    <header className="bg-white/95 px-[50px] py-5 border-b border-gray-200 md:px-5 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href="/admin/projects/new" 
          className="text-2xl font-bold tracking-[3px] px-5 py-2 border-2 border-[#333] text-[#333] md:text-lg md:px-4 md:py-1.5 hover:text-[#333]"
        >
          OLY
        </Link>
        <nav className="flex gap-8">
          <Link href="/projects" className="md:text-xs">
            Projects
          </Link>
          <Link href="/admin/projects/new" className="md:text-xs">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

