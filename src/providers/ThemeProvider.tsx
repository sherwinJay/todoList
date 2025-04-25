'use client'

import { InputForm } from '@/components';
import ProjectForm from '@/components/form/ProjectForm';
import { useAddTaskStore } from '@/stores/formDialogStore';
import { useAddProjectStore } from '@/stores/projectFormDialogStore';
import { Geist, Geist_Mono } from 'next/font/google';
import React, { ReactNode, useEffect, useState, createContext } from 'react'

export const ThemeContext = createContext({
  theme: '',
  setTheme: (_theme: 'dark' | 'light') => { }
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const DefaultTheme = 'dark'
  const [theme, setTheme] = useState<'dark' | 'light'>(DefaultTheme)
  // * ADD TASK/TODOS
  const isShowAddForm = useAddTaskStore(state => state.addForm)
  const closeForm = useAddTaskStore(state => state.closeAddForm)

  // * ADD PROJECT
  const isShowProjectForm = useAddProjectStore(state => state.addProject)
  const closeProjectForm = useAddProjectStore(state => state.closeAddProject)

  useEffect(() => {
    const storedMode = localStorage.getItem('theme')
    const value = storedMode ? JSON.parse(storedMode) : 'dark';
    setTheme(value)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <body className={`${geistSans.variable} ${geistMono.variable} relative antialiased ${theme}`}>
        <div onClick={() => {
          isShowAddForm && closeForm()
          isShowProjectForm && closeProjectForm()
        }}>
          {children}
        </div>
        {isShowAddForm && (
          <div className='lg:w-[520px] absolute top-[200px] left-[10%] md:left-[20%] lg:left-[37%] z-10'>
            <div className='rounded-xl border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shadow-gray-300 dark:shadow-slate-800'>
              <InputForm hideModal={closeForm} />
            </div>
          </div>
        )}
        {isShowProjectForm && (
          <div className='lg:w-[520px] absolute top-[200px] left-[10%] md:left-[20%] lg:left-[35%] z-10'>
            <div className='rounded-xl border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shadow-gray-300 dark:shadow-slate-800'>
              <ProjectForm hideModal={closeProjectForm} />
            </div>
          </div>
        )}
      </body>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider