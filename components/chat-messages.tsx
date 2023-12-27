"use client"

import { type FC, useEffect, useRef, useState } from "react"

import ChatMessage from "./chat-message"

interface ChatMessagesProps {
  companion: ICompanion & { messageCount: number; messages: IMessage[] | null }
  messages: IMessage[]
  isLoading: boolean
}

const ChatMessages: FC<ChatMessagesProps> = ({
  companion,
  messages = [],
  isLoading,
}) => {
  const scrollRef = useRef<React.ElementRef<"div">>(null)
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false,
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages.length])

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src!}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map(
        (message) =>
          message.role && (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content ?? undefined}
              src={companion.src!}
            />
          ),
      )}
      {isLoading && (
        <ChatMessage isLoading role="system" src={companion.src!} />
      )}
      <div ref={scrollRef} />
    </div>
  )
}

export default ChatMessages
