import { db } from "~/db"
import { category } from "~/db/schema"

export async function main() {
  try {
    await db
      .insert(category)
      .values([
        { name: "Famous People" },
        { name: "Movies & TV" },
        { name: "Musicians" },
        { name: "Games" },
        { name: "Animals" },
        { name: "Philosophy" },
        { name: "Scientists" },
      ])
    console.log("Default categories seeded")
    return process.exit(0)
  } catch (error) {
    console.error("Error seeding default categories", error)
  }
}
