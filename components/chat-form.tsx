"use client"

import type { FC } from "react"

import { ChatRequestOptions } from "ai"
import { SendHorizonal } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface ChatFormProps {
  isLoading: boolean
  input: string
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void
}

const ChatForm: FC<ChatFormProps> = ({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-x-2 border-t border-primary/10 py-4"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  )
}

export default ChatForm
