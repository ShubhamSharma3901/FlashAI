"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("cf25e599-2e44-4971-8691-3dd3678e44ea");
  });

  return null;
};

export default CrispChat;
