"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import Sidebar from "./Sidebar";

function SideBarMobile() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="laptop:hidden text-neutral-400">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-black overflow-scroll">
        <div className="overflow-scroll">
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideBarMobile;
