import { useSession } from "next-auth/react";
import Button from "./Button";
import React, { useState, useLayoutEffect, useRef, useCallback } from "react";
import type { FormEvent } from "react";

import ProfileImage from "./ProfileImage";
import { api } from "~/utils/api";

function updateTextAreaSize(textarea: HTMLTextAreaElement | null) {
  if (!textarea) {
    return;
  }
  textarea.style.height = "0";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

export default function NewTweetForm() {
  const session = useSession();
  if (session?.status !== "authenticated") {
    return null;
  }

  return <Form />;
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const inputRef = useCallback((textArea: HTMLTextAreaElement | null) => {
    updateTextAreaSize(textArea);
  }, []);

  useLayoutEffect(() => {
    if (textAreaRef.current) {
      updateTextAreaSize(textAreaRef.current);
    }
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      console.log(newTweet);
      setInputValue("");
    },
  });

  if (session?.status !== "authenticated") {
    return null;
  }

  //   handlesubit
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createTweet.mutate({ content: inputValue });
  }

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4 ">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder=" que pedo"
        />
      </div>
      <Button className="self-end"> Tweet</Button>
    </form>
  );
}
