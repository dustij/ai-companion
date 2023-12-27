interface ICategory {
  id: string
  name: string
}

interface ICompanion {
  name: string
  description: string | null
  instructions: string | null
  seed: string | null
  src: string | null
  categoryId: string
  id: string
  userId: string
  userName: string
  createdAt: Date
  updatedAt: Date
}

interface ZCompanion {
  name?: string | undefined
  description?: string | undefined
  instructions?: string | undefined
  seed?: string | undefined
  src?: string | undefined
  categoryId?: string | undefined
}

interface IMessage {
  id?: string
  userId?: string
  role: "user" | "system"
  content: string | null
  companionId?: string
  createdAt?: Date
  updatedAt?: Date
}
