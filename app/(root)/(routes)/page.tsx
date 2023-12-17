import { UserButton } from "@clerk/nextjs"
import { NextPage } from "next"

interface Props {}

const RootPage: NextPage<Props> = ({}) => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default RootPage
