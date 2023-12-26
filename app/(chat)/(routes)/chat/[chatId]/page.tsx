import { NextPage } from "next"
import { redirect } from "next/navigation"

import { auth, redirectToSignIn } from "@clerk/nextjs"
import { and, asc, count, eq, sql } from "drizzle-orm"

import { db } from "~/db"
import { companion, message } from "~/db/schema"

import ChatClient from "./components/client"

interface Props {
  params: {
    chatId: string
  }
}

const ChatIdPage: NextPage<Props> = async ({ params }) => {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const companions = (await db
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
      messages: sql`JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', ${message.id},
          'userId', ${message.userId}, 
          'role', ${message.role}, 
          'content', ${message.content},
          'companionId', ${message.companionId},
          'createdAt', ${message.createdAt},
          'updatedAt', ${message.updatedAt}
        ))`,
    })
    .from(companion)
    .leftJoin(
      message,
      and(eq(companion.id, message.companionId), eq(message.userId, userId)),
    )
    .where(eq(companion.id, params.chatId))
    .orderBy(asc(message.createdAt))) as (ICompanion & {
    messageCount: number
    messages: IMessage[] | null
  })[]

  if (!companions[0]) {
    return redirect("/")
  }

  console.log("\nstart\n", companions[0], "\nend\n")

  return <ChatClient companion={companions[0]} />
}

export default ChatIdPage
