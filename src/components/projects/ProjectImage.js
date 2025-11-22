import Link from 'next/link';

export default function ProjectImage({ src, alt, gridPosition, slug }) {
  const href = slug ? `/projects/${slug}` : '#';

  return (
    <Link href={href} className={`project relative overflow-hidden cursor-pointer hover:z-10 block ${gridPosition}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover grayscale transition-all duration-300 hover:grayscale-0 hover:scale-[1.02]"
      />
    </Link>
  );
}

