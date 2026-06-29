import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}