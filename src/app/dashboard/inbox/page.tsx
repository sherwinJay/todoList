import InboxTodos from "@/features/todos/inboxTodos"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox – Todolist",
};

export default function Page() {
  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
        </div>
        {/* <TodoList /> */}
        <InboxTodos />
      </div>
    </div>
  )
}
