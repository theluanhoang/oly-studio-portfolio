export default function LoadingSpinner({ 
  text = 'Đang tải...', 
  className = '' 
}) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-[#f5f5f5] text-[#333] ${className}`}>
      <div className="w-8 h-8 border-2 border-[#333] border-t-transparent rounded-full animate-spin mb-4"></div>
      {text && (
        <p className="text-[#666] tracking-[2px] uppercase text-sm">{text}</p>
      )}
    </div>
  );
}

