import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import getIcon from '../utils/iconUtils'

function NotFound() {
  // Icon components
  const AlertCircleIcon = getIcon('AlertCircle')
  const HomeIcon = getIcon('Home')
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-surface-50 to-white dark:from-surface-900 dark:to-surface-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card max-w-md w-full mx-auto text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-surface-100 to-white dark:from-surface-800 dark:to-surface-700 neu-light">
            <AlertCircleIcon className="h-12 w-12 text-accent" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-surface-500 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="btn btn-primary w-full"
        >
          <HomeIcon className="h-5 w-5" />
          Back to Home
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 text-center text-surface-500"
      >
        <p>Lost? <Link to="/" className="text-primary hover:underline">Go back to TaskFlux</Link></p>
      </motion.div>
    </div>
  )
}

export default NotFound