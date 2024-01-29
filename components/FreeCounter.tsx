"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  CloudLightningIcon,
  LucideCloudLightning,
  StarIcon,
  StarsIcon,
  Zap,
} from "lucide-react";
import ProModal from "./ProModal";
import { useProModal } from "@/Hooks/useProModal";

function FreeCounter({
  apiCount = 0,
  maxCount,
}: {
  apiCount: number;
  maxCount: number;
}) {
  const [isMounted, setIsMounted] = useState(false);

  const proModal = useProModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card
      className={cn(
        "relative bg-black border-white/5 flex items-center justify-center hover:shadow-md transition cursor-pointer group"
      )}>
      <div
        className={cn(
          "absolute inset-[-0.05rem] rounded-xl bg-gradient-to-br from-violet-700 to-pink-700 blur-sm group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-pink-500 group-hover:blur-md transition "
        )}></div>
      <div className="flex items-center justify-center relative bg-black w-full rounded-xl">
        <CardContent className="text-white p-6 text-center flex flex-col gap-4">
          <div className="">
            <p className="text-[13px] font-mono tracking-tighter">
              {apiCount} / {maxCount} Free Generations
            </p>
          </div>
          <Progress
            value={(apiCount / maxCount) * 100}
            className="relative w-[200px]"
          />
          <Button
            onClick={proModal.onOpen}
            className="flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-700 to-pink-700 rounded-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-600 hover:scale-105 transition-all ease-in mt-2">
            Upgrade
            <Zap className="fill-white" />
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}

export default FreeCounter;
