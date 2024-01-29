"use client";
import Navbar from "@/components/ui/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  VideoIcon,
  SparklesIcon,
  ScanEyeIcon,
  CheckCircle,
  Terminal,
  Loader2,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import { useProModal } from "@/Hooks/useProModal";
const tools = [
  {
    label: "Code Interpretation",
    icon: ScanEyeIcon,
    color: "text-violet-500",
    bgcolor: "bg-violet-500/20",
    href: "/interpret_code",
  },
  {
    label: "Fix Code",
    icon: CheckCircle,
    color: "text-emerald-500",
    bgcolor: "bg-emerald-500/20",
    href: "/fix_code",
  },
  {
    label: "Commands",
    icon: Terminal,
    color: "text-pink-700",
    bgcolor: "bg-pink-700/20",
    href: "/commands",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgcolor: "bg-green-700/20",
    href: "/code",
  },
  {
    label: "Settings",
    icon: Settings,
    color: "text-sky-400",
    bgcolor: "bg-sky-400/20",
    href: "/settings",
  },
];
export default function Dashboard() {
  const proModal = useProModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (isLoaded === false) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin h-auto w-[10%] text-white" />
      </div>
    );
  }
  return (
    <>
      <m.div
        className="z-[100] flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}>
        <div className="mb-10 w-full flex justify-center items-center">
          <Heading
            heading=" Explore the Power of AI"
            content="Chat with the Smartest AI - Experience the power of AI"
          />
        </div>
        <div className=" w-[70%] phone:w-[80%] grid grid-cols-1 gap-7">
          {tools.map((tool, index) => {
            return (
              <Card
                onClick={() => {
                  if (tool.label === "Upgrade") {
                    proModal.onOpen();
                    return;
                  }
                  router.push(tool.href as string);
                }}
                key={tool.href}
                className={cn(
                  "relative bg-black border-white/5 flex items-center justify-between hover:shadow-md transition cursor-pointer group"
                )}>
                <div
                  className={cn(
                    "absolute inset-[-0.05rem]  rounded-xl ",
                    tool.label === "Upgrade"
                      ? "bg-gradient-to-br from-violet-700 to-pink-700 blur-sm group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-pink-500 group-hover:blur-md transition "
                      : "bg-gradient-to-br from-[rgba(228,227,249,0.3)] to-white/5 group-hover:bg-gradient-to-br group-hover:from-[rgba(228,227,249,0.6)] group-hover:to-white/20 transition delay-100"
                  )}></div>
                <div className="flex items-center gap-x-4 relative bg-black w-full rounded-xl p-4">
                  <div className={cn("w-fit rounded-md p-2", tool.bgcolor)}>
                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                  </div>
                  <div className="font-semibold text-white">{tool.label}</div>
                </div>
                <ArrowRight
                  className="w-5 h-5 absolute right-5"
                  color="white"
                />
              </Card>
            );
          })}
        </div>
      </m.div>
    </>
  );
}
