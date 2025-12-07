"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProjectsPage = pathname === "/projects";
  const headerHeight = useHeaderHeight();

  if (isHomePage) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Header isFixed={true} />
      {isProjectsPage ? (
        children
      ) : (
        <div style={{ paddingTop: `${headerHeight}px` }}>
          {children}
        </div>
      )}
      <Footer isFixed={isProjectsPage} />
    </>
  );
}
