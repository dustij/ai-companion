import { NextPage } from "next"

interface Props {
  children: React.ReactNode
}

const AuthLayout: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  )
}

export default AuthLayout
