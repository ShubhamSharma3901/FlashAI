import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { Menu } from "lucide-react";
import SideBarMobile from "./sidebar-mobile";

function Navbar() {
  return (
    <div className="flex items-center p-4 bg-transparent">
      <SideBarMobile />
      <div className="flex w-full justify-end ">
        <UserButton afterSignOutUrl="/dashboard" />
      </div>
    </div>
  );
}

export default Navbar;
