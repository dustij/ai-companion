import { mysqlTableCreator } from "drizzle-orm/mysql-core"

// https://orm.drizzle.team/docs/goodies#multi-project-schema
export const mysqlTable = mysqlTableCreator((name) => `ai-companion_${name}`)
