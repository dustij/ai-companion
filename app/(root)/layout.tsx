import { NextPage } from "next"
import Navbar from "~/components/navbar"

interface Props {
  children: React.ReactNode
}

const RootLayout: NextPage<Props> = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  )
}

export default RootLayout
