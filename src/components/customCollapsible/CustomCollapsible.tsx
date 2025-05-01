'use client'
import { cn } from '@/lib/utils'
import { CustomCollapsibleProps } from '@/types/types'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { ChevronsDown, ChevronsRight } from 'lucide-react'
import { FC, useState } from 'react'


const CustomCollapsible: FC<CustomCollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Collapsible className="flex flex-col gap-1 py-4" open={isOpen}
      onOpenChange={setIsOpen}>
      <CollapsibleTrigger className={cn('flex items-center gap-0.5',
        !isOpen && 'border-b-[1px] border-gray-200 dark:border-gray-600 pb-2'
      )}>
        {isOpen ? (<ChevronsDown className="h-4 w-4" />) : (<ChevronsRight className='w-4 h-4' />)}
        <h2 className='font-bold text-sm'>{title}</h2>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {/* <Todos items={overdueTodos} /> */}
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CustomCollapsible