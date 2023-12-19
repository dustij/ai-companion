import type { FC } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Sidebar from "./sidebar"

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
