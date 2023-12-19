import { NextPage } from "next"
import SearchInput from "~/components/search-input"

interface Props {}

const RootPage: NextPage<Props> = ({}) => {
  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
    </div>
  )
}

export default RootPage
