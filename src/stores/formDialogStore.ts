import { create } from "zustand"

type AddTaskStoreType = {
  addForm: boolean
  openAddForm: () => void
  closeAddForm: () => void
  toggleAddForm: () => void
}

export const useAddTaskStore = create<AddTaskStoreType>((set) => ({
  addForm: false,
  openAddForm: () =>
    set((state) => ({
      addForm: (state.addForm = true),
    })),
  closeAddForm: () =>
    set((state) => ({
      addForm: (state.addForm = false),
    })),
  toggleAddForm: () =>
    set((state) => ({
      addForm: (state.addForm = !state.addForm),
    })),
}))
