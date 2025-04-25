import { Editor } from "@tiptap/react";
import { Bold, Calendar, CalendarDays, Grid2X2, Heading1, Heading2, Inbox, Italic, List, ListOrdered } from "lucide-react";

export const customEditorButtonItems = [
  {
    id: "buttonBold",
    clickHandler: (e: { preventDefault: () => void; }, editor: Editor) => {
      e.preventDefault()
      return editor.chain().focus().toggleBold().run()
    },
    className: 'bold',
    icon: <Bold width={16} height={16} />,
    headingLevel: undefined,
  },
  {
    id: "buttonItalic",
    clickHandler: (e: { preventDefault: () => void; }, editor: Editor) => {
      e.preventDefault()
      return editor.chain().focus().toggleItalic().run()
    },
    className: 'italic',
    icon: <Italic width={16} height={16} />,
    headingLevel: undefined,
  },
  {
    id: "buttonHeading1",
    clickHandler: (e: { preventDefault: () => void; }, editor: Editor) => {
      e.preventDefault()
      return editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
    className: 'heading',
    icon: <Heading1 width={16} height={16} />,
    headingLevel: 1,
  },
  {
    id: "buttonHeading2",
    clickHandler: (e: { preventDefault: () => void; }, editor: Editor) => {
      e.preventDefault()
      return editor.chain().focus().toggleHeading({ level: 2 }).run()
    },
    className: 'heading',
    icon: <Heading2 width={16} height={16} />,
    headingLevel: 2,
  },
  {
    id: "unorderedList",
    clickHandler: (e: { preventDefault: () => void; }, editor: Editor) => {
      e.preventDefault()
      return editor.chain().focus().toggleBulletList().run()
    },
    className: 'bulletList',
    icon: <List width={16} height={16} />,
    headingLevel: undefined,
  },
  {
    id: "orderedList",
    clickHandler: (e: { preventDefault: () => void; }, editor: Editor) => {
      e.preventDefault()
      return editor.chain().focus().toggleOrderedList().run()
    },
    className: 'orderedList',
    icon: <ListOrdered width={16} height={16} />,
    headingLevel: undefined,
  },
]
