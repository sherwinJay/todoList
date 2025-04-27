import Placeholder from '@tiptap/extension-placeholder'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FC } from 'react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { cn } from '@/lib/utils'
import { customEditorButtonItems } from '@/data/customEditorButton'

interface CustomEditorProps {
  testData: string
  onChange?: (value: React.ReactNode) => void;
}

const CustomEditor: FC<CustomEditorProps> = ({ testData, onChange }) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: "description",
      }),
    ],
    content: testData,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className='w-full dark:bg-slate-900 py-1 px-3 rounded-lg'>
      {editor && <BubbleMenu className="bubble-menu bg-slate-200 dark:bg-slate-600 p-1 rounded-sm flex gap-1 items-center" tippyOptions={{ duration: 100 }} editor={editor}>
        {customEditorButtonItems.map((item) => (
          <button
            key={item.id}
            onClick={(e) => item.clickHandler(e, editor)}
            className={cn('hover:bg-slate-400! dark:hover:bg-slate-900!', editor.isActive(item.className, { level: item?.headingLevel }) ? 'is-active bg-slate-400! dark:bg-slate-900!' : '')}
          >
            {item.icon}
          </button>
        ))}
      </BubbleMenu>}
      <EditorContent className='tiptap_editor text-left!' editor={editor} placeholder="description" />
    </div>
  )
}

export default CustomEditor