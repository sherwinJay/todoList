import { create } from "zustand"

type AddProjectStoreType = {
  addProject: boolean
  openAddProject: () => void
  closeAddProject: () => void
  toggleAddProject: () => void
}

export const useAddProjectStore = create<AddProjectStoreType>((set) => ({
  addProject: false,
  openAddProject: () =>
    set((state) => ({
      addProject: (state.addProject = true),
    })),
  closeAddProject: () =>
    set((state) => ({
      addProject: (state.addProject = false),
    })),
  toggleAddProject: () =>
    set((state) => ({
      addProject: (state.addProject = !state.addProject),
    })),
}))
