import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { Menu } from "lucide-react";
import SideBarMobile from "./sidebar-mobile";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

async function Navbar() {
  const apiCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="flex items-center p-4 bg-transparent">
      <SideBarMobile
        apiCount={apiCount}
        maxCount={Number(process.env.MAX_COUNT)}
        isPro={isPro}
      />
      <div className="flex w-full justify-end ">
        <UserButton afterSignOutUrl="/dashboard" />
      </div>
    </div>
  );
}

export default Navbar;
