'use client'

import { Dispatch, FC, SetStateAction } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { EllipsisIcon, Trash2 } from 'lucide-react'

interface CustomDropdownDeleteProps {
  handleConfirmDelete: () => void
  title: string
  disabled?: boolean
}

const CustomDropdownDelete: FC<CustomDropdownDeleteProps> = ({ handleConfirmDelete, title, disabled }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} className='disabled:opacity-40'>
        <EllipsisIcon className='w-5 h-5 text-foreground cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <button
            className='flex items-center gap-1 cursor-pointer'
            onClick={handleConfirmDelete}
            disabled={disabled}
          >
            <Trash2 className='w-4 h-4' />
            <span>{title}</span>
          </button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CustomDropdownDelete