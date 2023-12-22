import { NextPage } from "next"

import Categories from "~/components/categories"
import SearchInput from "~/components/search-input"
import { db } from "~/db"
import { category } from "~/db/schema"

interface Props {}

const RootPage: NextPage<Props> = async ({}) => {
  const categories = await db.select().from(category)
  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
    </div>
  )
}

export default RootPage
