import { OpenAI } from "openai";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message } = body;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("User Not Authenticated", { status: 401 });
  }
  if (!message) {
    return new NextResponse("Message Not Sent", { status: 400 });
  }
  if (!openai.apiKey) {
    return new NextResponse("API Key Not Configured", { status: 500 });
  }

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an code interpreter bot which will help developers by interpreting the code snippets provided to you by them. Automatically Determine The Programming Language and respond briefly in maximum of 600 characters ",
      },
      ...message,
    ],
    model: "gpt-3.5-turbo",
  });
  return NextResponse.json({ res: response.choices[0].message });
}
