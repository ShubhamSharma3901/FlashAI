import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { Redirect } from "next";
import { redirect } from "next/navigation";

function Landing() {
  const { userId } = auth();

  return (
    <div>
      Authentication Page
      {!userId ? (
        <div>
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Register</Button>
          </Link>
        </div>
      ) : (
        redirect("/dashboard")
      )}
    </div>
  );
}

export default Landing;
