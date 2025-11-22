import { forwardRef } from 'react';

const ScrollIndicator = forwardRef(function ScrollIndicator(props, ref) {
  return (
    <div
      ref={ref}
      className="fixed bottom-[30px] left-1/2 -translate-x-1/2 text-[#666] text-xs tracking-[2px] z-40 opacity-70"
    >
      SCROLL TO EXPLORE →
    </div>
  );
});

export default ScrollIndicator;

