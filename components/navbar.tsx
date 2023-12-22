"use client"

import type { FC } from "react"

import { Poppins } from "next/font/google"
import Link from "next/link"

import { Menu, Sparkles } from "lucide-react"

import { UserButton } from "@clerk/nextjs"

import { cn } from "~/lib/utils"

import MobileSidebar from "./mobile-sidebar"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
})

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              "hidden text-xl font-bold text-primary md:block md:text-3xl",
              font.className,
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button size="sm" variant="premium">
          Upgrade
          <Sparkles className="ml-2 h-4 w-4 fill-white text-white" />
        </Button>
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar
