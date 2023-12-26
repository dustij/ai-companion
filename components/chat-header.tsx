"use client"

import type { FC } from "react"

import { useRouter } from "next/navigation"

import { useUser } from "@clerk/nextjs"
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react"

import * as action from "~/db/actions"

import BotAvatar from "./bot-avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useToast } from "./ui/use-toast"

interface ChatHeaderProps {
  companion: ICompanion & { messageCount: number; messages: IMessage[] | null }
}

const ChatHeader: FC<ChatHeaderProps> = ({ companion }) => {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()

  const onDelete = async () => {
    try {
      await action.deleteCompanion(companion.id)
      toast({ description: "Success", variant: "default" })
      router.push("/")
      router.refresh()
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex w-full items-center justify-between border-b border-primary/10 pb-4">
      <div className="flex items-center gap-x-2">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={companion.src!} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="mr-1 h-3 w-3" />
              {companion.messageCount}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {companion.userName}
          </p>
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export default ChatHeader
