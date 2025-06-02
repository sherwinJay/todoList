'use client'

import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { EllipsisIcon, PencilLine, Trash2 } from 'lucide-react'
import { CustomDropdownProps } from '@/types/types'

const CustomDropdown: FC<CustomDropdownProps> = ({ handleConfirmDelete, title, disabled, showEdit, showProjectForm }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='disabled:opacity-40'>
        <EllipsisIcon className='w-5 h-5 text-foreground cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {showEdit && (
          <DropdownMenuItem>
            <button
              className='flex items-center gap-1 cursor-pointer'
              onClick={showProjectForm}
              disabled={disabled}
            >
              <PencilLine className='w-4 h-4 text-black dark:text-white' />
              <span>Edit Project Name</span>
            </button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <button
            className='flex items-center gap-1 cursor-pointer'
            onClick={handleConfirmDelete}
            disabled={disabled}
          >
            <Trash2 className='w-4 h-4 text-black dark:text-white' />
            <span>{title}</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CustomDropdown