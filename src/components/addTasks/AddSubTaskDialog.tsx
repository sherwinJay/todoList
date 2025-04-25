import { FC } from 'react'
import { InnerDialogContent, InnerDialogDescription, InnerDialogHeader, InnerDialogTitle } from '../ui/dialog'
import { Doc } from '../../../convex/_generated/dataModel'

interface AddSubTaskDialogProps {
  subTodosData: Doc<"subtodos">
}

const AddSubTaskDialog: FC<AddSubTaskDialogProps> = ({ subTodosData }) => {
  return (
    <InnerDialogContent className="max-w-1xl! lg:h-2/6 dark:bg-slate-900">
      <InnerDialogHeader className='w-full relative'>
        <InnerDialogTitle className='text-md font-bold'>{subTodosData.taskName}</InnerDialogTitle>
        <InnerDialogDescription className='text-sm bullet_list_style' dangerouslySetInnerHTML={{ __html: subTodosData.description }} />
      </InnerDialogHeader>
    </InnerDialogContent>

  )
}

export default AddSubTaskDialog