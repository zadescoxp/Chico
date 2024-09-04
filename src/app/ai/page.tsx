"use client";

import { chats } from "./data";
import { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Converter } from "./coverter";

export default function AI() {
  // State Variables

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // Parser

  const parser = new DOMParser();

  // Google Gen AI Model Defined

  const genAI = new GoogleGenerativeAI(
    "AIzaSyAv5gowkEKoHFU_qaZrwt_ysM74XMy3gco"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Prompt Handler

  const handlePrompt = async (prompt: string) => {
    setLoading(true);
    const res = await model.generateContent(prompt);
    chats.push({
      type: "Chico",
      message: Converter({ text: res.response.text() }),
    });
    setLoading(false);
  };

  // Auto Scroll to Bottom

  const ref = useRef<HTMLDivElement>(null);
  const scroll = () => {
    const { offsetHeight, scrollTop, scrollHeight } = ref.current as HTMLDivElement;
    if (offsetHeight + scrollTop >= scrollHeight) {
      ref.current?.scrollTo(0, scrollHeight + 200)
    }
  };

  useEffect(() => {
    scroll();
  }, [chats]);

  return (
    <div className="bg-white w-screen h-screen flex justify-center items-center overflow-hidden max-sm:h-full">
      {/* Chat Container */}
      <div className="relative w-[550px] h-full border-x-[lightgray] border-x-[1px] max-sm:w-full max-sm:border-x-0">
        {/* Header */}
        <header className="leading-tight p-4 px-7 mt-6 max-sm:mt-1">
          <h1 className="text-4xl font-bold">Google Gen AI Chat</h1>
          <p className="text-[17px] text-[#444]">
            This is a Chat Bot built with Google Gen AI and Next JS. It can
            repond to your text inputs.
          </p>
        </header>

        {/* Chat Area */}
        <div
          ref={ref}
          id="promptArea"
          className="overflow-x-hidden px-4 overflow-scroll flex flex-col h-[600px] pb-10 max-sm:pb-24"
        >
          {chats.map((data, index) => (
            <div
              className="px-4 py-2 flex flex-col justify-center items-start rounded-full"
              key={index}
            >
              <p className="font-bold">{data.type}</p>
              {data.type === "Chico" ? (
                <p>
                  {
                    parser.parseFromString(data.message, "text/html")
                      .documentElement.textContent
                  }
                </p>
              ) : (
                <p>{data.message}</p>
              )}
              {/* <p id="message">{data.message}</p> */}
            </div>
          ))}
          {loading ? (
            <SkeletonTheme baseColor="#eee" highlightColor="#fff">
              <p className="px-4">
                <Skeleton count={2} />
              </p>
            </SkeletonTheme>
          ) : null}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 flex flex-col justify-center w-full p-4 bg-[rgba(255,255,255,0.75)]">
          <input
            type="text"
            className="relative h-full p-3 w-full outline-0 border-[1px] border-[lightgray] rounded-full"
            placeholder="What's up ?"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
                chats.push({ type: "Guest", message: prompt });
                handlePrompt(prompt);
                setPrompt("");
              }
            }}
          />
          <p className="text-sm text-[#444] px-3 mt-2">Press Enter to Submit</p>
        </div>
      </div>
    </div>
  );
}
