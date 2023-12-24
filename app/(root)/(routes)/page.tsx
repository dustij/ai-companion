import { NextPage } from "next"

import { and, eq, sql } from "drizzle-orm"

import Categories from "~/components/categories"
import SearchInput from "~/components/search-input"
import { db } from "~/db"
import { category, companion } from "~/db/schema"

interface Props {
  searchParams: {
    categoryId: string
    name: string
  }
}

const RootPage: NextPage<Props> = async ({ searchParams }) => {
  let data
  if (searchParams && searchParams.categoryId && !searchParams.name) {
    data = await db
      .select()
      .from(companion)
      .where(eq(companion.categoryId, searchParams.categoryId))
  } else if (searchParams && searchParams.name && !searchParams.categoryId) {
    data = await db
      .select()
      .from(companion)
      .where(
        sql`MATCH (name) AGAINST (${searchParams.name} IN NATURAL LANGUAGE MODE)`,
      )
  } else if (searchParams && searchParams.name && searchParams.categoryId) {
    data = await db
      .select()
      .from(companion)
      .where(
        and(
          sql`MATCH (name) AGAINST (${searchParams.name} IN NATURAL LANGUAGE MODE)`,
          eq(companion.categoryId, searchParams.categoryId),
        ),
      )
  } else {
    data = await db.select().from(companion)
  }

  const categories = await db.select().from(category)

  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
    </div>
  )
}

export default RootPage
