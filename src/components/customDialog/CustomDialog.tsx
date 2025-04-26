import { FC } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

interface customDialogProps {
  taskName: string
  setShowConfirmDelete: () => void
  handleDelete: () => void
  title: string
}

const CustomDialog: FC<customDialogProps> = ({ taskName, setShowConfirmDelete, handleDelete, title }) => {
  return (
    <div className='bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[220px] md:top-[280px] left-[50%] md:left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border p-6 shadow-lg duration-200 sm:max-w-md px-5 py-4 md:min-w-[400px]'>
      <h3 className='font-bold text-md mb-2'>{`${title}?`}</h3>
      <Separator />
      <p className='mt-5 mb-8 text-sm text-gray-500 dark:text-gray-300'><span className='font-bold'>{taskName}</span> will be permanently deleted.</p>
      <div className='flex items-center justify-end gap-2'>

        <Button
          className='px-6 border-orange-400! hover:bg-orange-200! hover:border-orange-200! dark:hover:text-black cursor-pointer text-xs'
          onClick={setShowConfirmDelete}
          variant={'outline'}
        >
          Cancel
        </Button>

        <Button
          className='px-6 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer text-xs'
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default CustomDialog