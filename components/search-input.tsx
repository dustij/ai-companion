"use client"

import { type FC, useState, useEffect } from "react"

import { useRouter, useSearchParams } from "next/navigation"

import { Search } from "lucide-react"
import qs from "query-string"

import { useDebounce } from "~/hooks/use-debounce"

import { Input } from "./ui/input"

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get("categoryId")
  const name = searchParams.get("name")

  const [value, setValue] = useState(name ?? "")
  const debouncedValue = useDebounce<string>(value, 500)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true },
    )

    router.push(url)
  }, [debouncedValue, categoryId, router])

  return (
    <div className="relative">
      <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={onChange}
        value={value}
        placeholder="Search..."
        className="bg-primary/10 pl-10"
      />
    </div>
  )
}

export default SearchInput
