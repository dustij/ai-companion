import type { FC } from "react"

import { Menu } from "lucide-react"

import Sidebar from "./sidebar"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

interface MobileSidebarProps {}

const MobileSidebar: FC<MobileSidebarProps> = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-32 bg-secondary p-0 pt-10">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
