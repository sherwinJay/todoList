'use client'

import { useMutation, useQuery } from 'convex/react'
import { FC } from 'react'
import { api } from '../../../convex/_generated/api'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TodoFormSchema, todoFormSchema } from '@/schema/todoSchema'
import moment from 'moment'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import CustomEditor from './CustomEditor'
import { Popover } from '@radix-ui/react-popover'
import { PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { checkIsSubTodo, cn } from '@/lib/utils'
import { CalendarIcon, Flag, Text as TextLucide } from "lucide-react"
import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { priorityData } from "@/data/data"
import { Separator } from '../ui/separator'
import { CardFooter } from '../ui/card'

interface UpdateTaskFormProps {
  parentTask: Doc<'todos'> | Doc<"subtodos">,
  hideModal: () => void
}

const UpdateTaskForm: FC<UpdateTaskFormProps> = ({ parentTask, hideModal }) => {

  const currentDate = new Date()
  const todayMidnight = new Date(currentDate.setHours(0, 0, 0, 0))
  const parentId = parentTask?._id as Id<"todos">// !parentId make? sure to appear
  const { taskName, description, projectId, labelId } = parentTask
  const stringPriority = parentTask?.priority?.toString()
  const updateTask = useMutation(api.todos.updateATodo)
  const updateSubTask = useMutation(api.subTodos.updateASubTodo)
  const labels = useQuery(api.labels.getLabels) ?? []
  const projects = useQuery(api.projects.getProjects) ?? []
  const isSubTodo = checkIsSubTodo(parentTask)

  const defaultValues = {
    taskName,
    description,
    priority: stringPriority,
    dueDate: new Date(parentTask.dueDate),
    projectId,
    labelId,
  }

  const form = useForm<z.infer<typeof todoFormSchema>>({
    resolver: zodResolver(todoFormSchema),
    defaultValues
  })

  function onSubmit(data: TodoFormSchema) {
    const { taskName, description, priority, dueDate, projectId, labelId } = data
    if (projectId) {
      // * check if it has parentId then it's a subTodo
      console.log(priority)
      if (isSubTodo) {
        const mutationSubId = updateSubTask({
          taskName,
          description,
          priority: Number(priority),
          labelId: labelId as Id<"labels">,
          projectId: projectId as Id<"projects">,
          dueDate: moment(dueDate).valueOf(),
          subTaskId: parentTask._id as Id<"subtodos">,
        })

        if (mutationSubId !== undefined) {
          toast('✏️ Updated a sub task')
          form.reset({ ...defaultValues })
          hideModal()
        }
      } else {
        const mutationId = updateTask({
          taskId: parentId,
          taskName,
          description,
          priority: Number(priority),
          labelId: labelId as Id<"labels">,
          projectId: projectId as Id<"projects">,
          dueDate: moment(dueDate).valueOf()
        })

        if (mutationId !== undefined) {
          toast('✏️ Updated a task')
          form.reset({ ...defaultValues })
          hideModal()
        }
      }
    }
  }

  if (projectId === undefined || labelId === undefined) {
    return <p>Loading...</p>
  }

  const handleFormSubmit = (data: TodoFormSchema) => {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-3 border-1 p-2 my-2 rounded-xl px-3 pt-4"
      >
        <FormField
          control={form.control}
          name="taskName"
          render={({ field }) => (
            <FormItem className="border-b-[1px] border-gray-200 dark:border-gray-700">
              <FormControl>
                <Input
                  id="taskName"
                  type="text"
                  placeholder="Enter your Task name"
                  {...field}
                  required
                  className="border-0 font-semibold text-lg focus-visible:ring-0 shadow-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-start mb-2">
                  <TextLucide className="ml-auto h-4 w-4 opacity-50" />
                  <CustomEditor {...field} testData={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {// * hide other fields for subtask form
          !isSubTodo && (
            <>
              <div className="flex md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              color="orange"
                              className={cn(
                                "flex gap-2 font-normal text-left! border-gray-200 dark:border-gray-700 text-xs",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(field.value, "MMM dd")
                              ) : (
                                <span>Pick a date</span>
                              )}

                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < todayMidnight
                            }
                          // initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={stringPriority}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 dark:border-gray-700 text-xs">
                            <SelectValue placeholder="Select a priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorityData.map((item, idx) => (
                            <SelectItem key={idx} value={item.priority} className='text-xs'>
                              <Flag color={item.color} />
                              {`Priority ${item.priority}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="labelId"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={labelId || field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 dark:border-gray-700 text-xs">
                            <SelectValue placeholder="Select a label" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {labels.map((label: Doc<"labels">) => (
                            <SelectItem key={label._id} value={label._id} className='text-xs'>{label.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </>
          )
        }
        <Separator />
        <CardFooter className={cn("flex flex-col lg:flex-row lg:justify-between gap-2 items-center px-0 pb-2",
          isSubTodo && 'lg:justify-end')
        }>

          {/* remove project field in subtasks */}
          {!isSubTodo && (<FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem className="form_select_project text-xs">
                <Select onValueChange={field.onChange} defaultValue={projectId || field.value}>
                  <FormControl>
                    <SelectTrigger className="border-gray-200 dark:border-gray-700 text-xs">
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map((project: Doc<"projects">) => (
                      <SelectItem key={project._id} value={project._id} className='text-xs'>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />)}
          <div className='flex gap-3'>
            <Button
              className='px-6 border-orange-400! hover:bg-orange-200! hover:border-orange-200! dark:hover:text-black cursor-pointer text-xs'
              variant={'outline'}
              onClick={hideModal}
            >
              Cancel
            </Button>
            <Button
              className='px-6 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer text-xs'
              type='submit'
            >
              {isSubTodo ? 'Update Sub Task' : 'Update Task'}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Form >
  )
}

export default UpdateTaskForm