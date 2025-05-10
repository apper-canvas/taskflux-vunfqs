import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sun, 
  Moon, 
  Bell, 
  BellOff, 
  User, 
  Home, 
  CheckSquare, 
  Settings as SettingsIcon, 
  ChevronRight, 
  LogOut, 
  Palette, 
  Languages, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Save
} from 'lucide-react'
import { toast } from 'react-toastify'

function Settings({ darkMode, toggleDarkMode }) {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [desktopNotifications, setDesktopNotifications] = useState(true)
  const [language, setLanguage] = useState('english')
  const [timeFormat, setTimeFormat] = useState('12h')
  const [userName, setUserName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 hidden md:block p-4 sidebar-card">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-surface-800 dark:text-white">Todoos</h1>
          </Link>
          
          <nav className="space-y-2">
            <Link to="/" className="flex items-center gap-2 p-2 rounded-xl text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white nav-item-gradient">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/tasks" className="flex items-center gap-2 p-2 rounded-xl text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white nav-item-gradient">
              <CheckSquare className="h-5 w-5" />
              <span>Tasks</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-2 p-2 rounded-xl text-primary font-medium bg-surface-100 dark:bg-surface-800">
              <SettingsIcon className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
        
        <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
          <button 
            className="flex items-center gap-2 w-full p-2 rounded-xl text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white nav-item-gradient"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          <div className="flex items-center gap-2 p-2 mt-2 rounded-xl text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white nav-item-gradient cursor-pointer">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 p-4 bg-gradient-header border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="p-2 rounded-lg text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white">
              {userName.charAt(0)}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto max-w-5xl mx-auto w-full">
          <div className="space-y-8">
            {/* Appearance Section */}
            <section className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Appearance
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Switch between light and dark mode</p>
                  </div>
                  
                  <button 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700"
                    onClick={toggleDarkMode}
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>
              </div>
            </section>
            
            {/* Notifications Section */}
            <section className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Receive task reminders via email</p>
                  </div>
                  
                  <button 
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${emailNotifications ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                  >
                    <span 
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} 
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Desktop Notifications</h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Allow browser notifications</p>
                  </div>
                  
                  <button 
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${desktopNotifications ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}
                    onClick={() => setDesktopNotifications(!desktopNotifications)}
                  >
                    <span 
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${desktopNotifications ? 'translate-x-6' : 'translate-x-1'}`} 
                    />
                  </button>
                </div>
              </div>
            </section>
            
            {/* Preferences Section */}
            <section className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Preferences
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Language</label>
                  <select 
                    className="input"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Time Format</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="timeFormat" 
                        value="12h" 
                        checked={timeFormat === "12h"}
                        onChange={() => setTimeFormat("12h")}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span>12-hour (AM/PM)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="timeFormat" 
                        value="24h" 
                        checked={timeFormat === "24h"}
                        onChange={() => setTimeFormat("24h")}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span>24-hour</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="btn btn-primary" onClick={handleSaveSettings}>
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings