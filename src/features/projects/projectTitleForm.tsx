import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProjectFormSchema, projectFormSchema } from '@/schema/todoSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, X } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { projectTitleFormProps } from '@/types/types'

const ProjectTitleForm: FC<projectTitleFormProps> = ({ name, hideModal, projectId }) => {

  const updateProjectName = useMutation(api.projects.updateAProject)

  const defaultValues = {
    name,
    projectId
  }

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues
  })

  function onSubmit(data: ProjectFormSchema) {
    const { name } = data

    const mutationId = updateProjectName({
      name,
      projectId
    })

    if (mutationId !== undefined) {
      toast('✏️ Updated project name')
      form.reset({ ...defaultValues })
      hideModal()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between border-1 rounded-xl px-3 py-2 w-full mr-2 mb-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  id="name"
                  type="text"
                  // placeholder="Enter your Project name"
                  {...field}
                  required
                  className="font-semibold text-sm md:text-lg focus-visible:ring-0 shadow-none border-0"
                  hasError={!!form.formState.errors.name?.message}
                />
              </FormControl>
              <FormMessage className="text-xs text-nowrap bottom-[-30px] absolute" />
            </FormItem>
          )}
        />
        <div className='flex gap-2'>
          <Button
            className='!px-3 border-orange-400! hover:bg-orange-200! hover:border-orange-200! dark:hover:text-black cursor-pointer text-xs h-8'
            variant={'outline'}
            onClick={hideModal}
          >
            <X className='!w-3 !h-3' />
          </Button>
          <Button
            className='!px-3 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer text-xs h-8'
            type='submit'
          >
            <Send className='!w-3 !h-3' />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProjectTitleForm