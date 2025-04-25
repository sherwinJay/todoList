'use client'

import { FC, useContext, useState } from 'react'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { checkIsSubTodo, cn } from '@/lib/utils'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { AddTaskDialog, AddSubTaskDialog, CustomCheckbox, CustomDialog, UpdateTaskForm } from "@/components"
import moment from 'moment'
import { Calendar, FilePenLine, GitBranch, PenLine, Trash2 } from 'lucide-react'
import TotalSubTodos from '../../features/components/TotalSubTodos'

interface TodoItemProps {
  todosData: Doc<'todos'> | Doc<'subtodos'>,
  handleOnChange: () => void
  handleDelete: () => void
}


const TodoItem: FC<TodoItemProps> = ({ todosData, handleOnChange, handleDelete }) => {
  const { taskName, _id, isCompleted, description, priority, dueDate } = todosData
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const taskDate = new Date(dueDate)
  const isTaskOverdue = today > taskDate
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const isSubTodo = checkIsSubTodo(todosData)

  return (
    <>
      {showUpdateForm ? (<UpdateTaskForm parentTask={todosData} hideModal={() => setShowUpdateForm(false)} />)
        : (<li key={_id} className="items-top list-disc! flex space-x-2 border-b-1 py-3 border-gray-200 dark:border-foreground/20 animate-in fade-in">
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
                    {!isSubTodo && (<div className='flex gap-3 items-center mt-1'>
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
              {isSubTodo ? <AddSubTaskDialog subTodosData={todosData} /> : <AddTaskDialog todosData={todosData} handleOnChange={handleOnChange} />}
              {/* {!isSubTodo(todosData) && <AddTaskDialog todosData={todosData} />} */}
            </div>
            <div className='flex items-center gap-4'>
              <div className='action-button-wrapper relative mt-1'>
                <p className='action-name bg-slate-600 z-[9999]'>Edit task</p>
                <button className='cursor-pointer' onClick={() => setShowUpdateForm(true)} disabled={isCompleted} >
                  <PenLine className={cn('w-4 h-4', isCompleted && 'text-gray-600')} />
                </button>
              </div>
              <div className='action-button-wrapper relative mt-1'>
                <p className='action-name bg-slate-600'>Delete task</p>
                <button className='cursor-pointer' onClick={() => setShowConfirmDelete(true)}>
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>

            </div>

          </Dialog>
        </li>)}

      {showConfirmDelete && (
        <CustomDialog
          title="Delete Task"
          taskName={taskName}
          setShowConfirmDelete={() => setShowConfirmDelete(false)}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default TodoItem