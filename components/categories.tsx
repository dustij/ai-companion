"use client"

import type { FC } from "react"

import { useRouter, useSearchParams } from "next/navigation"

import qs from "query-string"

import { cn } from "~/lib/utils"

interface CategoriesProps {
  data: ICategory[]
}

const Categories: FC<CategoriesProps> = ({ data }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get("categoryId")

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id }
    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true },
    )
    router.push(url)
  }

  return (
    <div className="flex w-full space-x-2 overflow-x-auto p-1">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          "flex items-center rounded-md bg-primary/10 px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm",
          !categoryId && "bg-primary/20",
        )}
      >
        Newest
      </button>
      {data.map((item) => (
        <button
          onClick={() => onClick(item.id)}
          key={item.id}
          className={cn(
            "flex items-center rounded-md bg-primary/10 px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm",
            item.id === categoryId && "bg-primary/20",
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}

export default Categories
