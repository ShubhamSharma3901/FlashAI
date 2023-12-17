import React from "react";
import Image from "next/image";
import vec from "@/public/Animation - 1702546837163.json";
import Lottie from "lottie-react";
function Empty() {
  return (
    <div className="flex items-center justify-center flex-col ">
      <Lottie animationData={vec} loop={true} />
      <p className="text-muted-foreground font-extralight text-sm text-center">
        Nothing To Show Yet !
      </p>
    </div>
  );
}

export default Empty;
