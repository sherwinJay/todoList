'use client'
import { MainHeader, MainSidebar, TodoList } from "@/components"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function Page({ params }: { params: { userId: string } }) {
  // const user = useQuery(api.users.getUserById, {
  //   clerkId: params.userId,
  // });

  // console.log('params:', user?._id)

  return (
    <div className="p-4 relative">
      <TodoList />
    </div>
  )
}
