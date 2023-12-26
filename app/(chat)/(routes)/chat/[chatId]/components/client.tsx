import type { FC } from "react"

import ChatHeader from "~/components/chat-header"

interface ChatClientProps {
  companion: ICompanion & { messageCount: number; messages: IMessage[] | null }
}

const ChatClient: FC<ChatClientProps> = ({ companion }) => {
  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader companion={companion} />
    </div>
  )
}

export default ChatClient
