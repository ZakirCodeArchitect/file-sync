import "../globals.css";
import { SideNav } from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto pt-12 px-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sidebar stays to the left */}
        <SideNav />

        {/* Content area to the right */}
        <div className="flex flex-col w-full gap-4">
          {children}
        </div>
      </div>
    </main>
  );
}
