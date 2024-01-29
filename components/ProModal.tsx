import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import {
  CheckCircle,
  CheckIcon,
  CodeIcon,
  ScanEyeIcon,
  Settings,
  Terminal,
  ZapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useProModal } from "@/Hooks/useProModal";
import axios from "axios";
import { toast, useToast } from "./ui/use-toast";

const routes = [
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
    color: "text-pink-500",
    bg: "bg-pink-700",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-500",
    bg: "bg-green-500",
  },
];

function ProModal() {
  const proModal = useProModal();

  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        title: "Something Went Wrong During Payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-center gap-y-4">
            <div className="flex justify-center items-center py-1 gap-x-2">
              Upgrade to{" "}
              <Badge className="uppercase text-sm py-1 bg-gradient-to-br from-indigo-500 to-pink-500">
                Pro
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          Have Unlimited Access to all the Features with <b>FlashAI Pro</b>
        </DialogDescription>
        <div className="flex flex-col justify-center items-center w-full">
          {routes.map((route, index) => {
            return (
              <>
                <div
                  key={route.href}
                  className={cn(
                    "border text-sm group flex px-2 py-2 my-2 w-[95%] justify-start items-center font-medium cursor-pointer hover:scale-105 hover:bg-white/10 rounded-full transition-all delay-100 ease-linear hover:delay-0"
                  )}>
                  <div className="flex items-center flex-1 ">
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-full p-3 mr-[0.7rem]"
                      )}>
                      <route.icon className={cn(``, route.color)} />
                    </div>
                    {route.label}
                  </div>
                  <CheckIcon className="mr-4 text-indigo-500" />
                </div>
              </>
            );
          })}
        </div>
        <Button
          disabled={loading}
          onClick={onSubscribe}
          className="bg-gradient-to-r from-indigo-500 to-pink-500 flex gap-2 hover:shadow-sm hover:shadow-purple-400 rounded-xl py-4 shadow-lg w-full shadow-purple-400 transition">
          Upgrade
          <ZapIcon className="fill-white" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ProModal;
