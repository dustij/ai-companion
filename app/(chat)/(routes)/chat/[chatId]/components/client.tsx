import type { FC } from "react"

interface ChatClientProps {
  companion: ICompanion & { messageCount: number; messages: IMessage[] | null }
}

const ChatClient: FC<ChatClientProps> = ({ companion }) => {
  return <div></div>
}

export default ChatClient
