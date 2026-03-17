import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Root() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}