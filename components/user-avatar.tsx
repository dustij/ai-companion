"use client"

import type { FC } from "react"

import { useUser } from "@clerk/nextjs"

import { Avatar, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {}

const UserAvatar: FC<UserAvatarProps> = () => {
  const { user } = useUser()

  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  )
}

export default UserAvatar
