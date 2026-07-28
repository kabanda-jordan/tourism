"use client";

import { useEffect, useState } from "react";
import { Navbar, MobileBottomNav, Footer } from "@/components/layout";
import { ToastProvider } from "@/components/ui/toast";

function LoadingShell() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <LoadingShell />;

  return (
    <ToastProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomNav />
    </ToastProvider>
  );
}
