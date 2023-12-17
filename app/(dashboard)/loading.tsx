import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="h-screen w-screen">
      <Loader2 className="animate-spin h-full w-full" />
    </div>
  );
}

export default Loading;
