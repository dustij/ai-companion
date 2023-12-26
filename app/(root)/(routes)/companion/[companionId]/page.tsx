import { NextPage } from "next"

import { eq } from "drizzle-orm"

import { db } from "~/db"
import { category, companion } from "~/db/schema"

import CompanionForm from "./components/companion-form"

interface Props {
  params: { companionId: string }
}

const CompanionIdPage: NextPage<Props> = async ({ params }) => {
  // TODO: Check subscription status

  const companions = await db
    .select()
    .from(companion)
    .where(eq(companion.id, params.companionId))

  const categories = await db.select().from(category)

  return <CompanionForm initialData={companions[0]} categories={categories} />
}

export default CompanionIdPage
