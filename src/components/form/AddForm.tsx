"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Flag, SendHorizonal, Text as TextLucide, X } from "lucide-react"
import { CardFooter } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Doc, Id } from "../../../convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { toast } from 'sonner'
import moment from "moment"
import { TodoFormSchema, todoFormSchema } from "@/schema/todoSchema"
import CustomEditor from "./CustomEditor"
import { priorityData } from "@/data/data"
import { useParams } from "next/navigation"
import { Separator } from "../ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"
import { AddFormType } from "@/types/types"


export default function AddForm({ hideModal, parentTask }: AddFormType) {

  const { projectId: paramsProjectId } = useParams<{ projectId: Id<'projects'> }>()
  const currentDate = new Date()
  const todayMidnight = new Date(currentDate.setHours(0, 0, 0, 0))
  const parentId = parentTask?._id // !parentId make? sure to appear
  const projectId = parentTask?.projectId || paramsProjectId || 'jn78ahv9chhhynkwvpmfnzcx0x7cr2q2'
  const labelId = parentTask?.labelId || ('jh77kbnft40awme48e4h4s3w897crsk4' as Id<"labels">)
  const priority = parentTask?.priority?.toString() || '1'
  // * queries
  const projects = useQuery(api.projects.getProjects) ?? []
  const labels = useQuery(api.labels.getLabels) ?? []
  // * mutations
  const createATodoMutation = useMutation(api.todos.createATodo)
  const createASubTodoMutation = useMutation(api.subTodos.createASubTodo)
  const isMobile = useIsMobile()

  const defaultValues = {
    taskName: '',
    description: '',
    priority,
    dueDate: new Date(),
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
      if (parentId) {
        const mutationSubId = createASubTodoMutation({
          taskName,
          description,
          parentId,
          priority: Number(priority),
          labelId: labelId as Id<"labels">,
          projectId: projectId as Id<"projects">,
          dueDate: moment(dueDate).valueOf()
        })

        if (mutationSubId !== undefined) {
          toast('✅ Created a subtask')
          form.reset({ ...defaultValues })
          hideModal()
        }
      } else {

        const mutationId = createATodoMutation({
          taskName,
          description,
          priority: Number(priority),
          labelId: labelId as Id<"labels">,
          projectId: projectId as Id<"projects">,
          dueDate: moment(dueDate).valueOf()
        })

        if (mutationId !== undefined) {
          toast('✅ Created a task')
          form.reset({ ...defaultValues })
          hideModal()
        }
      }
    }
  }

  if (projectId === undefined || labelId === undefined) {
    return <p>Loading...</p>
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                  className="border-0 font-semibold text-md lg:text-lg focus-visible:ring-0 shadow-none"
                  hasError={!!form.formState.errors.taskName?.message}
                />
              </FormControl>
              <FormMessage className="text-xs pb-2" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-start mb-2 text-left">
                  <TextLucide className="ml-auto h-4 w-4 opacity-50" />
                  <CustomEditor {...field} testData={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {// * hide other fields for subtask form
          !parentId && (
            <>
              <div className="flex flex-col md:flex-row gap-3 md:gap-2">
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
                                "justify-start flex gap-2 font-normal border-gray-200 dark:border-gray-700 text-xs",
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
                      <Select onValueChange={field.onChange} defaultValue={priority}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 dark:border-gray-700 text-xs w-full">
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
                          <SelectTrigger className="border-gray-200 dark:border-gray-700 text-xs w-full">
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
        <CardFooter className={cn('flex justify-between gap-2 items-center px-0 pb-2', parentId && 'justify-end')}>
          {!parentId && (
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem className="form_select_project">
                  <Select onValueChange={field.onChange} defaultValue={projectId || field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-200 dark:border-gray-700 text-xs">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map((project: Doc<"projects">) => (
                        <SelectItem key={project._id} value={project._id} className="text-xs">{project.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className='flex gap-3'>
            <Button
              className='px-6 border-orange-400! hover:bg-orange-200! hover:border-orange-200! dark:hover:text-black cursor-pointer text-xs'
              variant={'outline'}
              onClick={hideModal}
            >
              {isMobile ? <X className="w-4 h-4" /> : 'Cancel'}
              {/* Cancel */}
            </Button>
            <Button
              className='px-6 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer text-xs'
              type='submit'
            >
              {isMobile ? <SendHorizonal /> : parentId ? 'Add Sub Task' : 'Add Task'}
              {/* {parentId ? 'Add Sub Task' : 'Add Task'} */}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Form >
  )
}
