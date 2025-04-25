'use client'

import { FC, useContext, useState } from 'react'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { Dialog, DialogContext, InnerDialog, InnerDialogClose, InnerDialogContent, InnerDialogDescription, InnerDialogHeader, InnerDialogTitle, InnerDialogTrigger } from '../ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { AddTaskDialog, AddSubTaskDialog, CustomCheckbox, CustomDialog } from "@/components"
import moment from 'moment'
import { Calendar, FilePenLine, GitBranch, Trash2 } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import TotalSubTodos from '../../features/components/TotalSubTodos'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface TodoItemProps {
  todosData: Doc<'todos'> | Doc<'subtodos'>,
  handleOnChange: () => void
  handleDelete: () => void
}

function isSubTodo(data: Doc<"todos"> | Doc<"subtodos">
): data is Doc<"subtodos"> {
  return "parentId" in data;
}

const TodoItem: FC<TodoItemProps> = ({ todosData, handleOnChange, handleDelete }) => {
  const { taskName, _id, isCompleted, description, priority, dueDate } = todosData
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const taskDate = new Date(dueDate)
  const isTaskOverdue = today > taskDate

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const context = useContext(DialogContext);
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const DialogClose = DialogPrimitive.Close

  const handleConfirmDelete = () => {
    // if ()
    context?.setInnerOpen(false)
  }

  return (
    <>
      <li key={_id} className="items-top list-disc! flex space-x-2 border-b-1 py-3 border-gray-200 dark:border-foreground/20 animate-in fade-in">
        <Dialog>
          <div className="flex gap-2 items-center w-full">
            <div className='flex gap-2 w-full py-[2px] items-center relative '>
              <CustomCheckbox
                priority={priority}
                isCompleted={isCompleted}
                handleOnChange={handleOnChange}
                styles='absolute top-[6px]'
              />
              <DialogTrigger asChild className="flex flex-col items-start pl-6">
                <button className={cn('text-sm font-normal text-left cursor-pointer',
                  isCompleted && 'text-gray-400 line-through',
                )}>
                  <p>{taskName}</p>
                  <p className='text-xs text-gray-400 line-clamp-1 inbox_list bullet_list_style' dangerouslySetInnerHTML={{ __html: description }} />
                  {!isSubTodo(todosData) && (<div className='flex gap-3 items-center mt-1'>
                    <TotalSubTodos isDialog={false} id={_id} />
                    {isTaskOverdue && !isCompleted && (
                      <span className='flex text-xs gap-1 items-center text-red-400'>
                        <Calendar width={12} height={12} />{moment(dueDate).format('DD MMM YYYY')}
                      </span>
                    )}
                  </div>)}
                </button>
              </DialogTrigger>
            </div>
            {isSubTodo(todosData) ? <AddSubTaskDialog subTodosData={todosData} /> : <AddTaskDialog todosData={todosData} handleOnChange={handleOnChange} />}
            {/* {!isSubTodo(todosData) && <AddTaskDialog todosData={todosData} />} */}
          </div>
          {/* <div className='flex flex-row gap-4'>
            <InnerDialog>
              <InnerDialogTrigger asChild>
                <div className='mt-1'>
                  <FilePenLine className='w-4 h-4' />
                </div>
              </InnerDialogTrigger>
              <InnerDialogContent>
                <InnerDialogTitle>Edit task</InnerDialogTitle>
              </InnerDialogContent>
            </InnerDialog>
            <InnerDialog>
              <InnerDialogTrigger asChild>
                <div className='mt-1'>
                  <Trash2 className='w-4 h-4' />
                </div>
              </InnerDialogTrigger>
              <InnerDialogContent className='absolute top-[280px] left-[50%] confirm-delete [&>button]:hidden'>
                <InnerDialogHeader>
                  <InnerDialogTitle>
                    Delete task?
                  </InnerDialogTitle>
                  <InnerDialogDescription className='mt-3 mb-7 darK:text-gray-200'>The <span className='font-bold'>{taskName}</span> task will be permanently deleted.
                  </InnerDialogDescription>
                </InnerDialogHeader>
                <div className='flex items-center justify-end gap-2'>
                  <InnerDialogClose className='px-5 py-1.5 border-[1px] border-orange-400! hover:bg-orange-200! hover:border-orange-200! rounded-lg dark:hover:text-black cursor-pointer text-sm'
                  >
                    Cancel
                  </InnerDialogClose>

                  <button
                    className='px-5 py-1.5 rounded-lg bg-orange-400 text-white hover:bg-orange-500 cursor-pointer text-sm'
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </InnerDialogContent>
            </InnerDialog>
          </div> */}
          <div className='mt-1'>
            <FilePenLine className='w-4 h-4' onClick={() => setShowUpdateForm(true)} />
          </div>
          <div className='mt-1'>
            <Trash2 className='w-4 h-4' onClick={() => setShowConfirmDelete(true)} />
          </div>
        </Dialog>
      </li>
      {showConfirmDelete && (
        // <div className='bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[280px] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg px-5 py-4 min-w-[400px]'>
        //   <h3 className='font-bold text-md'>Delete task?</h3>
        //   <p className='mt-5 mb-8 text-sm text-gray-300'>The <span className='font-bold'>{taskName}</span> task will be permanently deleted.</p>
        //   <div className='flex items-center justify-end gap-2'>

        //     <Button
        //       className='px-5 border-orange-400! hover:bg-orange-200! hover:border-orange-200! dark:hover:text-black cursor-pointer'
        //       onClick={() => setShowConfirmDelete(false)}
        //       variant={'outline'}
        //     >
        //       cancel
        //     </Button>

        //     <Button
        //       className='px-5 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer'
        //       onClick={handleDelete}
        //     >
        //       delete
        //     </Button>
        //   </div>
        // </div>
        <CustomDialog taskName={taskName} setShowConfirmDelete={() => setShowConfirmDelete(false)} handleDelete={handleDelete} />
      )}
    </>
  )
}

export default TodoItem