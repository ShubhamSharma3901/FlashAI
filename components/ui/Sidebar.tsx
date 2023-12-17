"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  ScanEyeIcon,
  Settings,
  Terminal,
  TerminalSquareIcon,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "700", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    bg: "bg-sky-500",
  },
  {
    label: "Code Interpreter",
    icon: ScanEyeIcon,
    href: "/interpret_code",
    color: "text-violet-500",
    bg: "bg-violet-500 ",
  },
  {
    label: "Fix Code",
    icon: CheckCircle,
    href: "/fix_code",
    color: "text-emerald-500",
    bg: "bg-emerald-500",
  },
  {
    label: "Commands",
    icon: Terminal,
    href: "/commands",
    color: "text-pink-700",
    bg: "bg-pink-700",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-emerald-500",
    bg: "bg-emerald-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-700",
    bg: "bg-green-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col bg-black/20 backdrop-blur-sm text-white h-full  border-white/10 border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-10">
          <div className="relative w-14 h-14 mr-1">
            <Image fill src="/logo.png" alt="Logo-Image" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            flash.ai
          </h1>
        </Link>
        <div className="space-y-3 flex flex-col justify-center items-center">
          {routes.map((route) => {
            return (
              <Link
                href={route.href}
                key={route.href}
                className={cn(
                  "text-sm group flex px-2 py-2 w-[95%] justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-full transition-all delay-100 ease-linear hover:delay-0",
                  pathname === route.href
                    ? "bg-slate-900 hover:bg-slate-900"
                    : "text-zinc-400"
                )}>
                <div className="flex items-center flex-1 ">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full p-3 mr-[0.7rem]",
                      pathname === route.href ? route.bg : "text-zinc-400"
                    )}>
                    <route.icon className={cn("")} />
                  </div>
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
