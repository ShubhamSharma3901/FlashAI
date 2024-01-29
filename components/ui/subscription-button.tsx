"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "./use-toast";
import { cn } from "@/lib/utils";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        title: "Something went wrong during payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={onClick}
      className={cn(
        "bg-gradient-to-br from-slate-100 via-slate-300 to-slate-400 text-black hover:scale-105 transition",
        !isPro &&
          "bg-gradient-to-br from-indigo-500 to-pink-500 text-white via-none"
      )}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
