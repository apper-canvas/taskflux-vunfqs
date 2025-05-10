import { useState, useEffect } from 'react'
import NavigationMenu from '../components/NavigationMenu'
import MainFeature from '../components/MainFeature'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import getIcon from '../utils/iconUtils'

function Tasks({ darkMode, toggleDarkMode }) {
  const CheckIcon = getIcon('Check')
  const ClipboardListIcon = getIcon('ClipboardList')

  // State for tasks and filters
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('todoos_tasks')
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch (error) {
      console.error('Error loading tasks:', error)
      return []
    }
  })

  // State for projects
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('todoos_projects')
      return savedProjects ? JSON.parse(savedProjects) : [
        { id: '1', name: 'Personal', color: '#3b82f6' },
        { id: '2', name: 'Work', color: '#8b5cf6' },
        { id: '3', name: 'Shopping', color: '#f43f5e' }
      ]
    } catch (error) {
      console.error('Error loading projects:', error)
      return [
        { id: '1', name: 'Personal', color: '#3b82f6' },
        { id: '2', name: 'Work', color: '#8b5cf6' },
        { id: '3', name: 'Shopping', color: '#f43f5e' }
      ]
    }
  })

  // State for categories
  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem('todoos_categories')
      return savedCategories ? JSON.parse(savedCategories) : [
        { id: '1', name: 'Important', icon: 'Star' },
        { id: '2', name: 'Personal', icon: 'User' },
        { id: '3', name: 'Work', icon: 'Briefcase' }
      ]
    } catch (error) {
      console.error('Error loading categories:', error)
      return [
        { id: '1', name: 'Important', icon: 'Star' },
        { id: '2', name: 'Personal', icon: 'User' },
        { id: '3', name: 'Work', icon: 'Briefcase' }
      ]
    }
  })

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todoos_tasks', JSON.stringify(tasks))
  }, [tasks])

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todoos_projects', JSON.stringify(projects))
  }, [projects])

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todoos_categories', JSON.stringify(categories))
  }, [categories])

  const onAddTask = (newTask) => {
    setTasks([...tasks, newTask])
    toast.success("Task added successfully!")
  }

  return (
    <div className="flex min-h-screen">
      <NavigationMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-gradient-header border-b border-surface-200 dark:border-surface-700 sticky top-0 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 sm:px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <ClipboardListIcon className="h-6 w-6 text-primary" />
              Tasks
            </h1>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-4 py-6 sm:px-6">
          <MainFeature 
            tasks={tasks}
            setTasks={setTasks}
            projects={projects}
            setProjects={setProjects}
            categories={categories}
            setCategories={setCategories}
            view="tasks"
            onAddTask={onAddTask}
            onUpdateTask={(id, updatedTask) => {
              setTasks(tasks.map(task => task.id === id ? updatedTask : task));
              toast.success("Task updated successfully!");
            }}
            onDeleteTask={(id) => {
              setTasks(tasks.filter(task => task.id !== id));
              toast.success("Task deleted successfully!");
            }}
            onToggleComplete={(id) => {
              setTasks(tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task));
            }}
        </main>

        <footer className="text-center text-surface-500 dark:text-surface-400 py-6 text-sm border-t border-surface-200 dark:border-surface-700">
          <p>© {new Date().getFullYear()} Todoo's. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default Tasks