import { relations } from "drizzle-orm"
import {
  char,
  mysqlEnum,
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
  seed: text("seed"),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),

  categoryId: char("category_id", { length: NANO_ID_LENGTH }).notNull(),
})

export const companionRelations = relations(companion, ({ one, many }) => ({
  category: one(category, {
    fields: [companion.categoryId],
    references: [category.id],
  }),
  messages: many(message),
}))

export const message = mysqlTable("message", {
  id: char("id", { length: NANO_ID_LENGTH })
    .$defaultFn(generateNanoId)
    .primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["user", "system"]).notNull(),
  content: text("content"),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),

  companionId: char("companion_id", { length: NANO_ID_LENGTH }).notNull(),
})

export const messageRelations = relations(message, ({ one }) => ({
  companion: one(companion, {
    fields: [message.companionId],
    references: [companion.id],
  }),
}))
