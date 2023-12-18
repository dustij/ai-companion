"use client"

import { UserButton } from "@clerk/nextjs"
import { Menu, Sparkles } from "lucide-react"
import { Poppins } from "next/font/google"
import Link from "next/link"
import type { FC } from "react"
import { cn } from "~/lib/utils"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
})

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <Menu className="block md:hidden" />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button size="sm" variant="premium">
          Upgrade
          <Sparkles className="h-4 w-4 fill-white ml-2 text-white" />
        </Button>
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
