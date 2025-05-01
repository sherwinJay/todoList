'use client'

import { FC, useState } from 'react'
import AddTaskButton from './AddTaskButton'
import InputForm from '../form/InputForm'
import { AddTaskWrapperProps } from '@/types/types'


const AddTaskWrapper: FC<AddTaskWrapperProps> = ({ parentTask }) => {
  // ! try to improve the logic of this component
  //  ! - try to add project id hre, make it optional

  const [inputForm, setInputForm] = useState(false)
  // const { _id, isCompleted } = parentTask

  return (
    <div className='py-4'>
      {inputForm ? (
        <InputForm hideModal={() => setInputForm(false)} parentTask={parentTask} />
      ) : (
        <AddTaskButton showModal={() => setInputForm(true)} isCompleted={parentTask?.isCompleted} title={parentTask?._id ? 'Add Subtask' : 'Add task'} />
      )}
    </div>

  )
}

export default AddTaskWrapper