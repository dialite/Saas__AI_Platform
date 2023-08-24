import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
// const { Configuration, OpenAIApi } = require("openai");
// import {Configuration, OpenAIApi} from "openai";
// import OpenAIApi from "openai";
import OpenAI from "openai";

interface ChatCompletionRequestMessage {
  role: string;
  content: string;
}
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internatl error", { status: 500 });
  }
}
