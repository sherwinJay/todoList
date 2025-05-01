import { FC } from 'react'
import { Checkbox } from '../ui/checkbox'
import { cn } from '@/lib/utils'
import { CustomCheckboxProps } from '@/types/types'

const CustomCheckbox: FC<CustomCheckboxProps> = ({ priority, isCompleted, handleOnChange, styles }) => {
  return (
    <Checkbox
      id="todo"
      className={cn('cursor-pointer rounded-full',
        priority === 1 && 'border-red-500',
        priority === 2 && 'border-yellow-500',
        priority === 3 && 'border-blue-500',
        priority === 4 && 'border-gray-400',
        isCompleted && 'opacity-60',
        styles
      )}
      checked={isCompleted}
      onCheckedChange={handleOnChange}
    />
  )
}

export default CustomCheckbox