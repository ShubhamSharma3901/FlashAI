import { OpenAI } from "openai";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
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
          "You are an AI Helper. You will be given code snippets with bugs. You have to debug the code snippet and use comments for explanation. Return the right code in markdown format.",
      },
      ...message,
    ],
    model: "gpt-3.5-turbo",
  });

  await increaseApiLimit();

  return NextResponse.json({ res: response.choices[0].message });
}
