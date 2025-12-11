"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProjectsPage = pathname === "/projects";
  const isAdminLoginPage = pathname === "/admin/login";
  const headerHeight = useHeaderHeight();

  if (isHomePage || isAdminLoginPage) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Header isFixed={true} />
      {isProjectsPage ? (
        <div className="wrapper">
          {children}
        </div>
      ) : (
        <div className="wrapper" style={{ paddingTop: `${headerHeight}px` }}>
          {children}
        </div>
      )}
      <Footer isFixed={isProjectsPage} />
    </>
  );
}
