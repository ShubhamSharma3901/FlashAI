"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/ui/Loader";

import * as z from "zod";
import { interpretRequestMessagesSchema } from "./constants";

import { Button } from "@/components/ui/button";
import Empty from "@/components/ui/Empty";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/Heading";
import Message from "@/components/ui/message";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

import { motion as m } from "framer-motion";
import { useProModal } from "@/Hooks/useProModal";

function InterPretCode() {
  const proModal = useProModal();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const router = useRouter();

  const form = useForm<z.infer<typeof interpretRequestMessagesSchema>>({
    resolver: zodResolver(interpretRequestMessagesSchema),
    defaultValues: {
      inputCode: "",
    },
  });

  const { register } = form;

  const isLoading = form.formState.isSubmitting;

  const [messages, setMessages] = React.useState<
    ChatCompletionUserMessageParam[]
  >([]);

  const submitHander = async ({
    inputCode,
  }: z.infer<typeof interpretRequestMessagesSchema>) => {
    try {
      if (inputCode === "" || inputCode === null) {
        toast({
          title: "Empty Input",
          description: "Input can't be Empty",
          variant: "destructive",
        });
      }
      const userMessage: ChatCompletionUserMessageParam = {
        role: "user",
        content: inputCode,
      };
      const newMessage = [...messages, userMessage];

      const response = await axios.post("/api/commands", {
        message: newMessage,
      });

      setMessages(() => [...newMessage, response.data?.res]);
    } catch (err: any) {
      console.log(err);
      if (err?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      //* Refetches all the new data in server components like in api limit check
      router.refresh();
    }
  };

  if (isLoaded === false) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin h-auto w-[10%] text-white" />
      </div>
    );
  }

  return (
    <m.div
      className="flex justify-center items-center flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.85 }}>
      <Heading
        heading="Commands"
        content="Using bash, git, powershell? Write what you need and get the command"
      />
      <div className="flex py-[3rem]  gap-[3rem] flex-col justify-center items-center w-[90%]">
        <div className="h-[100%] w-[90%]">
          <form
            {...form}
            onSubmit={form.handleSubmit(submitHander)}
            className="flex flex-col w-full items-center justify-between gap-5">
            <div className="relative group w-full">
              <div
                className={cn(
                  "absolute bg-gradient-to-br from-white/50 to-white/20 -inset-[0.05rem] blur-0 group-focus-within:blur group-focus-within:bg-white/50 group-hover:bg-white/50 transition rounded-lg"
                )}></div>
              <CodeEditor
                {...register("inputCode")}
                disabled={isLoading}
                className="rounded-lg relative"
                language="git"
                placeholder="git command for pushing changes"
                padding={15}
                data-color-mode="dark"
                style={{
                  fontSize: 12,
                  backgroundColor: "black",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
            </div>
            <div className="w-full flex justify-end items-center">
              {isLoading ? (
                <Button
                  disabled
                  className="font-semibold w-full"
                  variant="secondary">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="font-semibold w-full bg-gradient-to-br from-slate-100 via-slate-300 to-slate-400 backdrop-blur-sm text-black shadow-lg  shadow-muted-foreground/30 border border-neutral-600 transition-colors ease-in-out hover:animate-in hover:bg-neutral-600/50"
                  variant="secondary"
                  size="lg">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className="w-[90%]">
          {messages.length === 0 && !isLoading ? (
            <Empty />
          ) : (
            <div className="w-full border border-neutral-600 p-[5%] bg-neutral-950 rounded-xl mt-5">
              {messages.map((mess, index) => {
                return (
                  <div key={mess?.role} className="my-5">
                    <Message
                      role={mess?.role}
                      content={mess?.content?.toString()}
                      feature={"command"}
                    />
                  </div>
                );
              })}
              {isLoading && <Loader />}
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}

export default InterPretCode;
