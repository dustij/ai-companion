"use server"

import { db } from "."
import { currentUser } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"

import { companion } from "./schema"

export async function createCompanion(values: {
  name: string
  description: string
  instructions: string
  seed: string
  src: string
  categoryId: string
}) {
  try {
    const user = await currentUser()

    if (!user || !user.id || !user.firstName) {
      throw new Error("no user found")
    }

    // TODO: Check for subscription

    await db.insert(companion).values({
      ...values,
      userId: user.id,
      userName: user.firstName,
    })

    const companions = await db
      .select()
      .from(companion)
      .where(
        and(
          eq(companion.userId, user.id),
          eq(companion.name, values.name),
          eq(companion.description, values.description),
          eq(companion.instructions, values.instructions),
          eq(companion.seed, values.seed),
          eq(companion.src, values.src),
          eq(companion.categoryId, values.categoryId),
        ),
      )

    return companions[0]
  } catch (e) {
    console.error(e, "error creating companion")
    throw e
  }
}

export async function updateCompanion(
  id: string,
  values: {
    name: string
    description: string
    instructions: string
    seed: string
    src: string
    categoryId: string
  },
) {
  try {
    const user = await currentUser()

    if (!user || !user.id || !user.firstName) {
      throw new Error("no user found")
    }

    // TODO: Check for subscription

    await db
      .insert(companion)
      .values({
        ...values,
        userId: user.id,
        userName: user.firstName,
        id: id,
      })
      .onDuplicateKeyUpdate({ set: values })

    const companions = await db
      .select()
      .from(companion)
      .where(eq(companion.id, id))

    return companions[0]
  } catch (e) {
    console.error(e, "error updating companion")
    throw e
  }
}

export async function deleteCompanion(id: string) {
  try {
    const user = await currentUser()

    if (!user || !user.id || !user.firstName) {
      throw new Error("no user found")
    }

    await db
      .delete(companion)
      .where(and(eq(companion.id, id), eq(companion.userId, user.id)))
  } catch (e) {
    console.error(e, "error deleting companion")
    throw e
  }
}
