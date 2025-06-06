import { Plus } from 'lucide-react'
import { FC } from 'react'
import { Button } from '../ui/button'
import { AddTaskButtonProps } from '@/types/types'

const AddTaskButton: FC<AddTaskButtonProps> = ({ showModal, title, isCompleted }) => {
  return (
    <Button
      className='flex items-center justify-center gap-2 text-center pl-2 flex-mt-2 flex-1 cursor-pointer hover:[&>svg]:bg-[#f39c16] hover:text-[#f39c16] hover:[&>svg]:text-white  hover:[&>svg]:rounded-full'
      onClick={showModal}
      disabled={isCompleted}
      variant={null}
    >
      <Plus className='w-4 h-4 text-[#f39c16]' />
      <h3 className='text-base font-light tracking-tight '>
        {title}
      </h3>
    </Button>
  )
}

export default AddTaskButton