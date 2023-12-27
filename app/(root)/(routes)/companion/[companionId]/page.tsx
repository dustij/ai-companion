import { NextPage } from "next"

import { auth, redirectToSignIn } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { AlertTriangle } from "lucide-react"

import { db } from "~/db"
import { category, companion } from "~/db/schema"

import CompanionForm from "./components/companion-form"

interface Props {
  params: { companionId: string }
}

const CompanionIdPage: NextPage<Props> = async ({ params }) => {
  const { userId } = auth()
  // TODO: Check subscription status

  if (!userId) {
    return redirectToSignIn()
  }

  const creatorId = await db
    .select({ creatorId: companion.userId })
    .from(companion)
    .where(eq(companion.id, params.companionId))

  if (creatorId[0].creatorId !== userId) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <AlertTriangle className="h-12 w-12" />
        <p>Only the creator can edit this companion.</p>
      </div>
    )
  }

  const companions = await db
    .select()
    .from(companion)
    .where(
      and(eq(companion.id, params.companionId), eq(companion.userId, userId)),
    )

  const categories = await db.select().from(category)

  return <CompanionForm initialData={companions[0]} categories={categories} />
}

export default CompanionIdPage
