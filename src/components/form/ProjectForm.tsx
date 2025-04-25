'use client'

import { useMutation } from 'convex/react'
import { FC } from 'react'
import { api } from '../../../convex/_generated/api'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProjectFormSchema, projectFormSchema } from '@/schema/todoSchema'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'

interface ProjectFormProps {
  hideModal: () => void
}

const ProjectForm: FC<ProjectFormProps> = ({ hideModal }) => {

  const defaultValues = {
    name: ''
  }

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues
  })

  const createAProjectMutation = useMutation(api.projects.createAProject)
  function onSubmit(data: ProjectFormSchema) {
    const { name } = data

    const projectMutation = createAProjectMutation({ name })

    // console.log('project: ', projectMutation)

    if (projectMutation !== undefined) {
      toast('🗂️ Created a project')
      form.reset({ ...defaultValues })
      hideModal()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 border-1 p-2 my-2 rounded-xl px-3 pt-4"
      >
        <h3 className='font-bold text-md mb-2'>Add Project</h3>
        <Separator />
        <Label className='mt-6'>Name</Label>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input
                  id="name"
                  type="text"
                  // placeholder="Enter your Project name"
                  {...field}
                  required
                  className="font-semibold text-lg focus-visible:ring-0 shadow-none border-[1px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* <Separator /> */}
        <CardFooter className="flex flex-col lg:flex-row lg:justify-end mt-5 px-0! gap-2 pb-3">
          <div className='flex gap-2'>
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
              Add Project
            </Button>
          </div>
        </CardFooter>
      </form>
    </Form>
  )
}

export default ProjectForm