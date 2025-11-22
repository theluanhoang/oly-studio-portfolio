export default function HeroImage({ src, alt }) {
  return (
    <div className="w-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
        loading="eager"
      />
    </div>
  );
}

