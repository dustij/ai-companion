import { relations } from "drizzle-orm"
import {
  char,
  mysqlTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { customAlphabet } from "nanoid"

const NANO_ID_LENGTH = 12

function generateNanoId() {
  const nanoid = customAlphabet(
    "0123456789abcdefghijklmnopqrstuvwxyz",
    NANO_ID_LENGTH,
  )
  return nanoid()
}

// https://orm.drizzle.team/docs/goodies#multi-project-schema
export const mysqlTable = mysqlTableCreator((name) => `ai-companion_${name}`)

export const category = mysqlTable("category", {
  id: char("id", { length: NANO_ID_LENGTH })
    .$defaultFn(generateNanoId)
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
})

export const categoryRelations = relations(category, ({ many }) => ({
  companions: many(companion),
}))

export const companion = mysqlTable("companion", {
  id: char("id", { length: NANO_ID_LENGTH })
    .$defaultFn(generateNanoId)
    .primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  src: varchar("src", { length: 255 }),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  instructions: text("instructions"),
  seed: varchar("seed", { length: 255 }),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),

  categoryId: char("category_id", { length: NANO_ID_LENGTH }).notNull(),
})

export const companionRelations = relations(companion, ({ one }) => ({
  category: one(category, {
    fields: [companion.categoryId],
    references: [category.id],
  }),
}))
