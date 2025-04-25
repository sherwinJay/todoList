import { FC } from 'react'
import { Button } from '../ui/button'
import { InputForm } from '../'
import { Doc, Id } from '../../../convex/_generated/dataModel'

interface AddTaskFormWrapperProps {
  hideModal: () => void
  projectId?: Id<"projects">
  parentTask?: Doc<"todos">
}

const AddTaskFormWrapper: FC<AddTaskFormWrapperProps> = ({ hideModal, projectId, parentTask }) => {
  return (
    <>
      <InputForm hideModal={hideModal} parentTask={parentTask} />
    </>
  )
}

export default AddTaskFormWrapper