import { NextPage } from "next"

interface Props {
  children: React.ReactNode
}

const ChatLayout: NextPage<Props> = ({ children }) => {
  return <div className="mx-auto h-full w-full max-w-4xl">{children}</div>
}

export default ChatLayout
