import { OpenAI } from "openai";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message } = body;
  const { userId } = auth();

  const isPro = await checkSubscription();

  if (!userId) {
    return new NextResponse("User Not Authenticated", { status: 401 });
  }
  if (!message) {
    return new NextResponse("Message Not Sent", { status: 400 });
  }
  if (!openai.apiKey) {
    return new NextResponse("API Key Not Configured", { status: 500 });
  }

  const freeTrial = await checkApiLimit();

  if (!freeTrial && !isPro) {
    return new NextResponse("Free Trial has expired", { status: 403 });
  }

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an AI Helper. You will be given a prompt where you will be asked to provide the git/bash/powershell command meeting the requirement of the user. You will only give git/bash/powershell commands nothing else.",
      },
      ...message,
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 2000,
    temperature: 0.7,
  });

  await increaseApiLimit();

  return NextResponse.json({ res: response.choices[0].message });
}
