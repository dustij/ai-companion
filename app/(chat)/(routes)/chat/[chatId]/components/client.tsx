"use client"

import { type FC, useState } from "react"

import { useRouter } from "next/navigation"

import { useCompletion } from "ai/react"

import ChatForm from "~/components/chat-form"
import ChatHeader from "~/components/chat-header"
import ChatMessages from "~/components/chat-messages"

interface ChatClientProps {
  companion: ICompanion & { messageCount: number; messages: IMessage[] | null }
}

const ChatClient: FC<ChatClientProps> = ({ companion }) => {
  const router = useRouter()
  const [messages, setMessages] = useState<IMessage[]>(companion.messages || [])

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_, completion) {
        const systemMessage = {
          role: "system",
          content: completion,
        } as IMessage

        setMessages((curr) => [...curr, systemMessage])
        setInput("")

        router.refresh()
      },
    })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: "user",
      content: input,
    } as IMessage

    setMessages((curr) => [...curr, userMessage])
    handleSubmit(e)
  }

  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        messages={messages}
        isLoading={isLoading}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ChatClient
