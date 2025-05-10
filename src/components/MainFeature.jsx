import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import getIcon from '../utils/iconUtils'

function MainFeature({
  tasks = [], 
  categories = [], 
  projects = [],
  selectedCategory,
  selectedProject,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  onAddProject,
  onAddCategory
}) {
  // States
  const [newTask, setNewTask] = useState({
    title: '',
    description: '', 
    dueDate: '',
    priority: 'medium',
    categoryId: selectedCategory !== 'all' ? selectedCategory : (categories.length > 0 ? categories[0].id : ''),
    projectId: selectedProject !== 'all' ? selectedProject : (projects && projects.length > 0 ? projects[0].id : '')
  })
  
  const [editingTask, setEditingTask] = useState(null)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3b82f6' })
  const [filterPriority, setFilterPriority] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [showCompleted, setShowCompleted] = useState(true)
  
  const taskFormRef = useRef(null)
  
  // Icons
  const PlusIcon = getIcon('Plus')
  const TrashIcon = getIcon('Trash')
  const EditIcon = getIcon('Edit')
  const CheckIcon = getIcon('Check')
  const XIcon = getIcon('X')
  const CalendarIcon = getIcon('Calendar')
  const FlagIcon = getIcon('Flag')
  const LayersIcon = getIcon('Layers')
  const FilterIcon = getIcon('Filter')
  const ArrowDownIcon = getIcon('ArrowDown')
  const ChevronDownIcon = getIcon('ChevronDown')
  const ArrowUpIcon = getIcon('ArrowUp')
  const TagIcon = getIcon('Tag')
  const SaveIcon = getIcon('Save')
  const FolderIcon = getIcon('Folder')
  
  const [newProject, setNewProject] = useState({ name: '', color: '#3498db' })
  // Update newTask.categoryId when selectedCategory changes
  useEffect(() => {
    if (selectedCategory !== 'all') {
      setNewTask(prev => ({ ...prev, categoryId: selectedCategory }))
    } else if (categories.length > 0) {
      setNewTask(prev => ({ ...prev, categoryId: categories[0].id }))
      setNewTask(prev => ({ ...prev, categoryId: categories[0].id }))
    }
  }, [selectedCategory, categories])
  
  // Update newTask.projectId when selectedProject changes
  useEffect(() => {
    if (selectedProject !== 'all') {
      setNewTask(prev => ({ ...prev, projectId: selectedProject }))
    } else if (projects.length > 0) {
      setNewTask(prev => ({ 
        ...prev, projectId: projects[0].id 
      }))
  }, [selectedProject, projects])
  
  // Scroll to task form when editing
  useEffect(() => {
    if (editingTask && taskFormRef.current) {
      taskFormRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [editingTask])
  
  // Task handling functions
  const handleAddTask = (e) => {
    e.preventDefault()
    
    if (!newTask.title || !newTask.title.trim()) {
      toast.error("Task title is required")
      return
    }
    
    const task = {
      id: uuidv4(),
      ...newTask,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    onAddTask(task)
    setNewTask({ 
      title: '', 
      description: '', 
      dueDate: '',
      priority: 'medium',
      categoryId: selectedCategory !== 'all' ? selectedCategory : (categories.length > 0 ? categories[0].id : ''),
      projectId: selectedProject !== 'all' ? selectedProject : (projects && projects.length > 0 ? projects[0].id : '')
    })
  }
  
  const handleUpdateTask = (e) => {
    e.preventDefault()
    
    if (!editingTask.title.trim()) {
      toast.error("Task title is required")
      return
    }
    
    onUpdateTask(editingTask.id, {
      ...editingTask,
      updatedAt: new Date().toISOString()
    })
    
    setEditingTask(null)
  }
  
  const startEditTask = (task) => {
    setEditingTask(task)
  }
  
  const cancelEdit = () => {
    setEditingTask(null)
  }
  
  // Category handling functions
  const handleAddCategory = (e) => {
    e.preventDefault()
    
    if (!newCategory.name.trim()) {
      toast.error("Category name is required")
      return
    }
    
    onAddCategory({
      id: uuidv4(),
      ...newCategory,
      createdAt: new Date().toISOString()
    })

    setNewCategory({ name: '', color: '#3b82f6' });
    setIsAddingCategory(false);
  }

  // Project handling functions
  const handleAddProject = (e) => {
    e.preventDefault()
    
    if (!newProject.name.trim()) {
      toast.error("Project name is required")
      return
    }
    
    onAddProject({ id: uuidv4(), ...newProject, createdAt: new Date().toISOString() })
    setNewProject({ name: '', color: '#3498db' })
    setIsAddingProject(false)
  }

  // Filter and sort functions
  const getFilteredAndSortedTasks = () => {

    
    // Initialize filteredTasks with the tasks prop
    let filteredTasks = [...tasks];
    // Filter by completion status
    if (!showCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.isCompleted)
    }
    
    // Filter by priority
    if (filterPriority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filterPriority)
    }

    // Filter by project if selected
    if (selectedProject !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.projectId === selectedProject)
    }
    
    // Sort
    return filteredTasks.sort((a, b) => {
      if (sortBy === 'dueDate') {
        // Put tasks without due dates at the end
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })
  }
  
  const filteredAndSortedTasks = getFilteredAndSortedTasks()
  
  // Priority styling
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-600 dark:text-red-400',
          border: 'border-red-200 dark:border-red-700'
        }
      case 'medium':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-600 dark:text-yellow-400',
          border: 'border-yellow-200 dark:border-yellow-700'
        }
      case 'low':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-600 dark:text-green-400',
          border: 'border-green-200 dark:border-green-700'
        }
      default:
        return {
          bg: 'bg-surface-100 dark:bg-surface-700',
          text: 'text-surface-600 dark:text-surface-300',
          border: 'border-surface-200 dark:border-surface-600'
        }
    }
  }
  
  // Get category color by ID
  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.color : '#3b82f6'
  }
  
  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : 'Uncategorized'
  }
  
  // Get project details
  const getProjectName = (projectId) => {
    const project = projects && projects.find(p => p.id === projectId)
    return project ? project.name : 'No Project'
  }
  
  return (
    <div className="space-y-6">
      {/* New Project Form */}
      <AnimatePresence>
        {isAddingProject && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">New Project</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectName" className="block text-sm font-medium mb-1">
                      Project Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="projectName"
                      type="text"
                      className="input"
                      placeholder="e.g., Website Redesign, Mobile App..."
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectColor" className="block text-sm font-medium mb-1">
                      Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="projectColor"
                        type="color"
                        className="h-10 w-10 rounded border border-surface-200 dark:border-surface-700"
                        value={newProject.color}
                        onChange={(e) => setNewProject({...newProject, color: e.target.value})}
                      />
                      <input
                        type="text"
                        className="input"
                        value={newProject.color}
                        onChange={(e) => setNewProject({...newProject, color: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    <PlusIcon className="w-4 h-4" /> Create Project
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      

      {/* New Category Form */}
      <AnimatePresence>
        {isAddingCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">New Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="categoryName" className="block text-sm font-medium mb-1">
                      Category Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="categoryName"
                      type="text"
                      className="input"
                      placeholder="e.g., Personal, Work, Study..."
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="categoryColor" className="block text-sm font-medium mb-1">
                      Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="categoryColor"
                        type="color"
                        className="h-10 w-10 rounded border border-surface-200 dark:border-surface-700"
                        value={newCategory.color}
                        onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                      />
                      <input
                        type="text"
                        className="input"
                        value={newCategory.color}
                        onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Categories Tool */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <h2 className="text-xl font-semibold">
          {selectedCategory === 'all' ? 'All Tasks' : `${getCategoryName(selectedCategory)} Tasks`}
        </h2>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setIsAddingCategory(!isAddingCategory)}
            className="btn btn-outline text-sm py-1.5"
          >
            {isAddingCategory ? <XIcon className="w-4 h-4" /> : <TagIcon className="w-4 h-4" />}
            {isAddingCategory ? 'Cancel' : 'Add Category'}
          </button>
          
          <button 
            onClick={() => setIsAddingProject(!isAddingProject)} 
            className="btn btn-outline text-sm py-1.5"
          >
            {isAddingProject ? <XIcon className="w-4 h-4" /> : <FolderIcon className="w-4 h-4" />} {isAddingProject ? 'Cancel' : 'Add Project'}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              className="appearance-none py-1.5 pl-3 pr-8 rounded-lg text-sm bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon className="w-4 h-4 text-surface-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              className="appearance-none py-1.5 pl-3 pr-8 rounded-lg text-sm bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon className="w-4 h-4 text-surface-400" />
            </div>
          </div>
          
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`py-1.5 px-3 rounded-lg text-sm flex items-center gap-1.5
              ${showCompleted 
                ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary dark:from-primary/20 dark:to-primary/10' 
                : 'bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600'
              }`}
          >
            {showCompleted ? <CheckIcon className="w-3.5 h-3.5" /> : null}
            {showCompleted ? 'Showing Completed' : 'Show Completed'}
          </button>
        </div>
      </div>

      {/* Task Form */}
      <div className="card" ref={taskFormRef}>
        <h2 className="text-xl font-semibold mb-4">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h2>
        
        <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} className="space-y-4">
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-medium mb-1">
              Task Title <span className="text-accent">*</span>
            </label>
            <input
              id="taskTitle"
              type="text"
              className="input"
              placeholder="What needs to be done?"
              value={editingTask ? editingTask.title : newTask.title}
              onChange={(e) => editingTask 
                ? setEditingTask({...editingTask, title: e.target.value})
                : setNewTask({...newTask, title: e.target.value})
              }
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label htmlFor="taskCategory" className="block text-sm font-medium mb-1">Category</label>
              <div className="relative">
                <select
                  id="taskCategory"
                  className="input appearance-none pr-10"
                  value={editingTask ? editingTask.categoryId : newTask.categoryId}
                  onChange={(e) => editingTask 
                    ? setEditingTask({...editingTask, categoryId: e.target.value})
                    : setNewTask({...newTask, categoryId: e.target.value})
                  }
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <LayersIcon className="w-5 h-5 text-surface-400" />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <label htmlFor="taskProject" className="block text-sm font-medium mb-1">Project</label>
              <div className="relative">
                <select
                  id="taskProject"
                  className="input appearance-none pr-10"
                  value={editingTask ? editingTask.projectId : newTask.projectId}
                  onChange={(e) => editingTask 
                    ? setEditingTask({...editingTask, projectId: e.target.value})
                    : setNewTask({...newTask, projectId: e.target.value})
                  }
                >
                  {projects && projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FolderIcon className="w-5 h-5 text-surface-400" />
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <label htmlFor="taskPriority" className="block text-sm font-medium mb-1">Priority</label>
              <div className="relative">
                <select
                  id="taskPriority"
                  className="input appearance-none pr-10"
                  value={editingTask ? editingTask.priority : newTask.priority}
                  onChange={(e) => editingTask 
                    ? setEditingTask({...editingTask, priority: e.target.value})
                    : setNewTask({...newTask, priority: e.target.value})
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FlagIcon className="w-5 h-5 text-surface-400" />
                </div>
              </div>
            </div>
          </div>
          
      {/* Task List */}

      <div>
        <label htmlFor="taskDescription" className="block text-sm font-medium mb-1">Description</label>
        <textarea
          id="taskDescription"
          rows="3"
          className="input"
          placeholder="Add some details..."
          value={editingTask ? editingTask.description : newTask.description}
          onChange={(e) => editingTask 
            ? setEditingTask({...editingTask, description: e.target.value})
            : setNewTask({...newTask, description: e.target.value})
          }
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="taskDueDate" className="block text-sm font-medium mb-1">Due Date</label>
        <div className="relative">
          <input
            id="taskDueDate"
            type="date"
            className="input pr-10"
            value={editingTask ? (editingTask.dueDate || '') : (newTask.dueDate || '')}
            onChange={(e) => editingTask 
              ? setEditingTask({...editingTask, dueDate: e.target.value})
              : setNewTask({...newTask, dueDate: e.target.value})
            }
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <CalendarIcon className="w-5 h-5 text-surface-400" />
          </div>
        </div>
      </div>
          
      <div className="flex justify-end gap-2">
        {editingTask && (
          <button
            type="button"
            onClick={cancelEdit}
            className="btn btn-outline"
          >
            <XIcon className="w-4 h-4" />
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
        >
          {editingTask ? (
            <>
              <SaveIcon className="w-4 h-4" />
              Update Task
            </>
          ) : (
            <>
              <PlusIcon className="w-4 h-4" />
              Add Task
            </>
          )}
        </button>
      </div>
    </form>
  </div>
      <div className="space-y-4">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-surface-500 dark:text-surface-400">
              {tasks && tasks.length === 0 
                ? "No tasks yet. Add your first task above!"
                : "No tasks match the current filters."}
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredAndSortedTasks.map((task) => {
              const priorityStyles = getPriorityStyles(task.priority)
              
              return (
                <motion.div 
                  key={task.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }} 
                  className={`task-card ${task.isCompleted ? 'bg-surface-50 dark:bg-surface-800/50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleComplete(task.id)}
                      className={`mt-1 flex-shrink-0 w-5 h-5 rounded-md border transition-colors
                        ${task.isCompleted 
                          ? 'bg-primary/20 border-primary/30 dark:bg-primary/10 dark:border-primary/20' 
                          : 'border-surface-300 dark:border-surface-600'
                        }`}
                    >
                      {task.isCompleted && <CheckIcon className="w-5 h-5 text-primary" />}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 items-center">
                        <h3 className={`text-base font-medium ${task.isCompleted ? 'text-surface-400 dark:text-surface-500 line-through' : ''}`}>
                          {task.title}
                        </h3>
                        
                        <div 
                          className={`bg-gradient-to-r ${priorityStyles.bg} ${priorityStyles.text} text-xs px-2 py-0.5 rounded-full border ${priorityStyles.border}`}
                        >
                          {task.priority}
                        </div>
                        
                        <div 
                          className="text-xs px-2 py-0.5 rounded-full border"
                          style={{
                            background: `linear-gradient(135deg, ${(projects && projects.find(p => p.id === task.projectId)?.color) || '#3498db'}30, ${(projects && projects.find(p => p.id === task.projectId)?.color) || '#3498db'}10)`,
                            borderColor: `${(projects && projects.find(p => p.id === task.projectId)?.color) || '#3498db'}40`
                          }}
                          
                        >
                          <FolderIcon className="w-3 h-3 inline-block mr-1" />
                          <span>{getProjectName(task.projectId)}</span>
                        </div>
                        
                        <div 
                          className="text-xs px-2 py-0.5 rounded-full border"
                          style={{ 
                            background: `linear-gradient(135deg, ${getCategoryColor(task.categoryId)}30, ${getCategoryColor(task.categoryId)}10)`,
                            color: getCategoryColor(task.categoryId),
                            borderColor: `${getCategoryColor(task.categoryId)}40`
                          }}
                        >
                          {getCategoryName(task.categoryId)}
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className={`mt-1 text-sm ${task.isCompleted ? 'text-surface-400 dark:text-surface-500' : 'text-surface-600 dark:text-surface-300'}`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-surface-500">
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>
                              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1">
                          <span>
                            Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-shrink-0 gap-1">
                      <button 
                        onClick={() => startEditTask(task)}
                        className="p-1.5 text-surface-500 hover:text-primary hover:bg-gradient-to-r hover:from-surface-100 hover:to-white dark:hover:from-surface-700 dark:hover:to-surface-800 rounded-lg"
                        aria-label="Edit task"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      
                      <button 
                        onClick={() => onDeleteTask(task.id)} 
                        className="p-1.5 text-surface-500 hover:text-accent hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
                        aria-label="Delete task"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default MainFeature