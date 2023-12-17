import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import React, { Suspense } from "react";
import Loading from "./loading";
import { Loader2 } from "lucide-react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative top-0 z-[1] h-full w-full overflow-x-clip ">
        <div className="z-[-100] absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:19px_25px]"></div>
        <div className="z-[-100] absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb19,#000)]"></div>

        <div className="hidden h-full laptop:w-72 laptop:flex laptop:flex-col laptop:fixed laptop:inset-y-0 z-[80]">
          <Sidebar />
        </div>
        <main className="laptop:pl-72">
          <Navbar />
          {children}
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
