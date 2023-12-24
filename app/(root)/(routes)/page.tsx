import { NextPage } from "next"

import { and, count, eq, sql } from "drizzle-orm"

import Categories from "~/components/categories"
import SearchInput from "~/components/search-input"
import { db } from "~/db"
import { category, companion, message } from "~/db/schema"

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
      .select({
        id: companion.id,
        userId: companion.userId,
        userName: companion.userName,
        src: companion.src,
        name: companion.name,
        description: companion.description,
        instructions: companion.instructions,
        seed: companion.seed,
        createdAt: companion.createdAt,
        updatedAt: companion.updatedAt,
        categoryId: companion.categoryId,
        messageCount: count(message.id),
      })
      .from(companion)
      .leftJoin(message, eq(companion.id, message.companionId))
      .groupBy(companion.id)
      .where(eq(companion.categoryId, searchParams.categoryId))
      .orderBy(companion.createdAt)
  } else if (searchParams && searchParams.name && !searchParams.categoryId) {
    data = await db
      .select({
        id: companion.id,
        userId: companion.userId,
        userName: companion.userName,
        src: companion.src,
        name: companion.name,
        description: companion.description,
        instructions: companion.instructions,
        seed: companion.seed,
        createdAt: companion.createdAt,
        updatedAt: companion.updatedAt,
        categoryId: companion.categoryId,
        messageCount: count(message.id),
      })
      .from(companion)
      .leftJoin(message, eq(companion.id, message.companionId))
      .groupBy(companion.id)
      .where(
        sql`MATCH (name) AGAINST (${searchParams.name} IN NATURAL LANGUAGE MODE)`,
      )
      .orderBy(companion.createdAt)
  } else if (searchParams && searchParams.name && searchParams.categoryId) {
    data = await db
      .select({
        id: companion.id,
        userId: companion.userId,
        userName: companion.userName,
        src: companion.src,
        name: companion.name,
        description: companion.description,
        instructions: companion.instructions,
        seed: companion.seed,
        createdAt: companion.createdAt,
        updatedAt: companion.updatedAt,
        categoryId: companion.categoryId,
        messageCount: count(message.id),
      })
      .from(companion)
      .leftJoin(message, eq(companion.id, message.companionId))
      .groupBy(companion.id)
      .where(
        and(
          sql`MATCH (name) AGAINST (${searchParams.name} IN NATURAL LANGUAGE MODE)`,
          eq(companion.categoryId, searchParams.categoryId),
        ),
      )
      .orderBy(companion.createdAt)
  } else {
    data = await db
      .select({
        id: companion.id,
        userId: companion.userId,
        userName: companion.userName,
        src: companion.src,
        name: companion.name,
        description: companion.description,
        instructions: companion.instructions,
        seed: companion.seed,
        createdAt: companion.createdAt,
        updatedAt: companion.updatedAt,
        categoryId: companion.categoryId,
        messageCount: count(message.id),
      })
      .from(companion)
      .leftJoin(message, eq(companion.id, message.companionId))
      .groupBy(companion.id)
      .orderBy(companion.createdAt)
  }

  console.log(data)

  const categories = await db.select().from(category)

  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
    </div>
  )
}

export default RootPage
