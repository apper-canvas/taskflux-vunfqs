import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import NavigationMenu from '../components/NavigationMenu'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import getIcon from '../utils/iconUtils'
    <div className="min-h-screen">
      <NavigationMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <MainFeature darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
    const saved = localStorage.getItem('taskflux-categories')
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Personal', color: '#3b82f6' },
      { id: '2', name: 'Work', color: '#f43f5e' },
      { id: '3', name: 'Learning', color: '#8b5cf6' },
    ]
  })
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskflux-tasks')
    return saved ? JSON.parse(saved) : []
  })
  
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('taskflux-projects')
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Inbox', color: '#3498db' },
      { id: '2', name: 'Website Redesign', color: '#e74c3c' },
      { id: '3', name: 'Mobile App', color: '#2ecc71' },
    ]
  })
  
  const [selectedProject, setSelectedProject] = useState('all')
  
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  useEffect(() => {
    localStorage.setItem('taskflux-tasks', JSON.stringify(tasks))
  }, [tasks])
  
  useEffect(() => {
    localStorage.setItem('taskflux-categories', JSON.stringify(categories))
  }, [categories])
  
  useEffect(() => {
    localStorage.setItem('taskflux-projects', JSON.stringify(projects))
  }, [projects])

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory])
    toast.success(`Category "${newCategory.name}" created!`)
  }

  const removeCategory = (id) => {
    // Remove category and all associated tasks
    setCategories(categories.filter(cat => cat.id !== id))
    setTasks(tasks.filter(task => task.categoryId !== id))
    toast.info("Category and related tasks removed")
  }
  
  const addProject = (newProject) => {
    setProjects([...projects, newProject])
    toast.success(`Project "${newProject.name}" created!`)
  }
  
  const removeProject = (id) => {
    // Remove project and set associated tasks to default project
    setProjects(projects.filter(proj => proj.id !== id))
    setTasks(tasks.map(task => 
      task.projectId === id ? { ...task, projectId: projects[0].id } : task
    ))
    toast.info("Project removed")
  }

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
    toast.success("Task added successfully!")
  }

  const updateTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    ))
    toast.info("Task updated")
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    toast.info("Task deleted")
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, isCompleted: !task.isCompleted }
        if (updatedTask.isCompleted) {
          toast.success("Task completed! 🎉")
        }
        return updatedTask
      }
      return task
    }))
  }
  
  // Filter tasks based on selected category
  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : selectedProject !== 'all'
    ? tasks.filter(task => task.categoryId === selectedCategory && task.projectId === selectedProject)
    : selectedProject === 'all' && selectedCategory !== 'all'
    ? tasks.filter(task => task.categoryId === selectedCategory)
    : tasks.filter(task => task.categoryId === selectedCategory)
  
  // Calculate stats
  const completedTasks = tasks.filter(task => task.isCompleted).length
  const pendingTasks = tasks.length - completedTasks
  const completionRate = tasks.length > 0 
    ? Math.round((completedTasks / tasks.length) * 100) 
    : 0
  
  // Icon components
  const MoonIcon = getIcon('Moon')
  const SunIcon = getIcon('Sun')
  const CheckCircleIcon = getIcon('CheckCircle')
  const ClockIcon = getIcon('Clock')
  const ListTodoIcon = getIcon('ListTodo')
  const ChevronDownIcon = getIcon('ChevronDown')

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodoIcon className="w-6 h-6 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-primary dark:text-primary-light">TaskFlux</h1>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="card mb-6">
              <h2 className="text-lg font-semibold mb-4">Task Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                <div className="flex items-center gap-3 bg-surface-50 dark:bg-surface-700/30 p-3 rounded-xl">
                  <ListTodoIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-surface-500">Total Tasks</p>
                    <p className="font-semibold">{tasks.length}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-surface-50 dark:bg-surface-700/30 p-3 rounded-xl">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-surface-500">Completed</p>
                    <p className="font-semibold">{completedTasks}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-surface-50 dark:bg-surface-700/30 p-3 rounded-xl">
                  <ClockIcon className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-surface-500">Pending</p>
                    <p className="font-semibold">{pendingTasks}</p>
                  </div>
                </div>
              </div>
              
              {tasks.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-surface-500">Completion</span>
                    <span className="text-sm font-medium">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                    <motion.div 
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${completionRate}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Categories</h2>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm uppercase font-semibold text-surface-500 tracking-wider mt-4 mb-2">
                  Projects
                </h3>
                
                <button
                  onClick={() => {
                    setSelectedProject('all')
                    if (selectedCategory === 'all') {
                      // Show all tasks
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors
                    ${selectedProject === 'all' && selectedCategory === 'all'
                      ? 'bg-primary text-white' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                >
                  <ListTodoIcon className="w-4 h-4" />
                  <span>All Projects</span>
                </button>
                
                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project.id)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors
                      ${selectedProject === project.id
                        ? 'bg-primary text-white' 
                        : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                      }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <span>{project.name}</span>
                  </button>
                ))}
                
                <h3 className="text-sm uppercase font-semibold text-surface-500 tracking-wider mt-4 mb-2">Categories</h3>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors
                    ${selectedCategory === 'all' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                >
                  <ListTodoIcon className="w-4 h-4" />
                  <span>All Tasks</span>
                </button>
                
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors
                      ${selectedCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                      }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-full lg:w-3/4">
            <MainFeature 
              tasks={filteredTasks} 
              categories={categories}
              projects={projects}
              selectedCategory={selectedCategory}
              selectedProject={selectedProject}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onToggleComplete={toggleTaskCompletion}
              onAddProject={addProject}
              onAddCategory={addCategory}
            />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto border-t border-surface-200 dark:border-surface-700 py-4">
        <div className="container mx-auto px-4 text-center text-surface-500 text-sm">
          TaskFlux &copy; {new Date().getFullYear()} — Simple and efficient task management
        </div>
      </footer>
    </div>
  )
}

export default Home