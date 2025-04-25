'use client'

import {
  LogOut,
  User,
} from "lucide-react"

import Image from 'next/image'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import ThemeSwitch from "../themeSwitch/ThemeSwitch"

const UserProfile = () => {

  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-0'>
        <Image
          src={`${user?.imageUrl}`}
          width='32'
          height='32'
          alt='user profile picture'
          className='rounded-full'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-2 mt-[2px] lg:w-[250px]'>
        <DropdownMenuLabel className='pb-0 text-md'>{user?.fullName}</DropdownMenuLabel>
        <DropdownMenuItem className='pt-0 text-xs text-gray-400'>{user?.emailAddresses[0].emailAddress}</DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className='text-gray-400'> */}
        <div className="py-2 px-2 flex justify-between items-center text-sm">
          <span>Theme</span>
          <ThemeSwitch />
        </div>
        <DropdownMenuSeparator className="mx-2" />
        {/* </DropdownMenuItem> */}
        <SignOutButton>
          <DropdownMenuItem className="flex justify-between px-2 text-sm">
            Sign Out
            <LogOut />
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile