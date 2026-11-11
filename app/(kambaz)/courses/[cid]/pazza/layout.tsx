"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "./pazza.css";
import PazzaNavBar from "./components/PazzaNavBar";
import FolderFilters from "./components/FolderFilters";
import PostListSidebar from "./components/PostListSidebar";

export default function PazzaLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname() ?? "";
  const isManageClass = pathname.includes("/manage-class");

  return (
    <div id="wd-pazza" className="wd-pazza">
      <PazzaNavBar />
      {isManageClass ? (
        <main id="wd-pazza-manage-class" className="wd-pazza-manage-class">
          {children}
        </main>
      ) : (
        <>
          <FolderFilters />
          <div className="wd-pazza-qa-body">
            <PostListSidebar />
            <main id="wd-pazza-post-screen" className="wd-pazza-post-screen">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  );
}
