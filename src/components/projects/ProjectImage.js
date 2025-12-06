import Link from '@/components/ui/Link';
import { useState } from 'react';

const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e0e0e0" width="800" height="600"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="18"%3EImage not found%3C/text%3E%3C/svg%3E';

export default function ProjectImage({ src, alt, gridPosition, slug }) {
  const [imageSrc, setImageSrc] = useState(src || placeholderImage);
  const [hasError, setHasError] = useState(false);
  const href = slug ? `/projects/${slug}` : '#';

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(placeholderImage);
    }
  };

  return (
    <Link 
      href={href} 
      noBaseStyles
      className={`project relative overflow-hidden cursor-pointer hover:z-10 block ${gridPosition}`}
    >
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onError={handleError}
        className="w-full h-full object-cover grayscale transition-all duration-300 hover:grayscale-0 hover:scale-[1.02]"
      />
    </Link>
  );
}

