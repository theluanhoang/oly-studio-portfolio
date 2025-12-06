export default function PageHeader({ 
  title, 
  subtitle, 
  className = '' 
}) {
  return (
    <div className={`mb-8 ${className}`}>
      {title && (
        <h1 className="text-4xl font-normal tracking-[3px] uppercase text-[#333] mb-2 md:text-2xl">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-sm text-[#666] tracking-[1px] uppercase">
          {subtitle}
        </p>
      )}
    </div>
  );
}

