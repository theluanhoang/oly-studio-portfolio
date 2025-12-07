import Link from '@/components/ui/Link';

export default function Footer({ isFixed = false }) {
  const positionClasses = isFixed 
    ? "fixed bottom-0 left-0 right-0 z-10" 
    : "relative z-10";
  
  return (
    <footer className={`${positionClasses} bg-background py-8 px-5 shadow-md`}>
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-gray-300">
          {/* Left - Contact Info */}
          <div className="text-foreground">
            <p className="text-sm mb-2">
              With Oily Studio you&apos;ll get the touch you are looking for, drop us a line.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <a 
                href="mailto:info@oilystudio.vn" 
                className="text-foreground hover:text-gray-600 transition-colors underline"
              >
                info@oilystudio.vn
              </a>
              <span className="hidden sm:inline text-gray-400">|</span>
              <a 
                href="tel:0900000000" 
                className="text-foreground hover:text-gray-600 transition-colors"
              >
                Hotline: 0900 000 000
              </a>
            </div>
          </div>

          {/* Right - Contact Button */}
          <button className="px-6 py-2 border border-black text-black text-sm hover:bg-black hover:text-white transition-all whitespace-nowrap">
            CONTACT FOR CONSULTATION
          </button>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-foreground text-xs">
          {/* Address */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            <span>Address:</span>
            <span>Office</span>
            <span>Facebook</span>
            <span>Instagram</span>
          </div>

          {/* Location Details */}
          <div className="text-gray-600">
            <p>Office: 90/18*Tân Định Phú, W.16 (NH Thanh)</p>
            <p>TP.HCM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}