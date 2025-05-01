import { cn } from '@/lib/utils'
import { totalTodosProps } from '@/types/types'
import { CircleCheck } from 'lucide-react'
import { FC } from 'react'

const TotalTodos: FC<totalTodosProps> = ({ title, textColor, iconColor, totalTodos }) => {
  return (
    <div className={cn('text-sm flex items-center gap-1.5 py-4',
      textColor
    )}>
      <CircleCheck color={iconColor} width={15} height={15} />
      <p>{`${totalTodos} ${title}`}</p>
    </div>
  )
}

export default TotalTodos