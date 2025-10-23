"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, Settings, LogOut, Search, Bell, User, 
  CheckCircle, FileText, ChevronRight, Menu, X, Sun, Moon, Package, Clock,
  MessageSquare, Edit, CalendarDays, Sparkles, AlertCircle, Wand2, 
  FileSignature, Loader2, ChevronDown, Check, Book
} from 'lucide-react';

// --- Dark Mode Context ---
// A simple context to manage dark mode state across the app
const ThemeContext = createContext<{ darkMode: boolean; setDarkMode: (value: boolean) => void } | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// --- Mock Data ---
const mockTeacher = {
  name: "Dr. Evelyn Reed",
  avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=ER",
  notifications: 3,
};

const mockCourses = [
  { id: 1, title: "Modern Physics", code: "PHYS 301", students: 45, nextClass: "Tomorrow, 10:00 AM" },
  { id: 2, title: "Calculus II", code: "MATH 102", students: 62, nextClass: "Today, 1:00 PM" },
  { id: 3, title: "Intro to Literature", code: "ENGL 110", students: 50, nextClass: "Tomorrow, 2:00 PM" },
];

const mockAssignments = [
  { id: 1, title: "Lab Report 5", course: "Modern Physics", submitted: 30, total: 45, due: "Today, 11:59 PM" },
  { id: 2, title: "Chapter 3 Problems", course: "Calculus II", submitted: 50, total: 62, due: "Yesterday" },
  { id: 3, title: "Essay: The Great Gatsby", course: "Intro to Literature", submitted: 15, total: 50, due: "Next Friday" },
];

const mockUpcomingEvents = [
  { id: 1, type: "exam", title: "Calculus II Midterm", time: "Oct 25, 1:00 PM" },
  { id: 2, type: "meeting", title: "Faculty Meeting", time: "Oct 26, 3:00 PM" },
  { id: 3, type: "reminder", title: "Submit Final Grades", time: "Oct 28, 5:00 PM" },
];

// --- Sidebar Component ---
function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BookOpen, label: "My Courses" },
    { icon: Users, label: "Students" },
    { icon: FileSignature, label: "Grades" },
    { icon: CalendarDays, label: "Calendar" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 z-30 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-xl z-40
                   transform transition-transform duration-300 ease-in-out lg:translate-x-0
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">Teacherly</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800 dark:hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex flex-col justify-between h-[calc(100%-57px)] p-4">
          {/* Top Nav Items */}
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a 
                  href="#" 
                  className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors
                              ${item.active 
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Bottom Logout */}
          <ul>
            <li>
              <a 
                href="#" 
                className="flex items-center gap-3 p-3 rounded-lg font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

// --- Header Component ---
function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        {/* Left Side: Mobile Menu & Search */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden text-gray-600 dark:text-gray-300">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search courses, students..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            <Bell className="w-5 h-5" />
            {mockTeacher.notifications > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {mockTeacher.notifications}
              </span>
            )}
          </button>
          
          <div className="flex items-center gap-3">
            <img
              src={mockTeacher.avatarUrl}
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/E2E8F0/4A5568?text=ER'}
            />
            <div className="hidden md:block">
              <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{mockTeacher.name}</span>
              <p className="text-xs text-gray-500">Teacher</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </div>
        </div>
      </div>
    </header>
  );
}

// --- Main Dashboard Widgets ---

// Widget: StatCard
function StatCard({ icon, label, value, color }: { icon: React.ComponentType<any>; label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300",
    green: "text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-300",
    yellow: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300",
  };
  const Icon = icon;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-full ${colors[color] || colors.blue}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</span>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

// Widget: Assignments to Grade
function AssignmentsWidget({ assignments }: { assignments: any[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm col-span-1 lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Assignments to Grade</h2>
      <div className="space-y-4">
        {assignments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No assignments need grading right now.</p>
        ) : (
          assignments.map((item: any) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.course}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{item.submitted}/{item.total}</span>
                  <p className="text-xs text-gray-500">Submitted</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Grade
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Widget: AI Lesson Planner
function AILessonPlanner() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);

  const generatePlan = () => {
    if (!prompt) return;
    setIsLoading(true);
    setPlan(null);
    // Simulate API call
    setTimeout(() => {
      setPlan(
        `**Topic:** ${prompt}\n\n` +
        "**Objective:** Students will be able to...\n" +
        "1.  Define key terms related to the topic.\n" +
        "2.  Explain the core concepts.\n\n" +
        "**Activities:**\n" +
        "* **Warm-up (10 min):** Quick discussion prompt.\n" +
        "* **Lecture (20 min):** Core concepts presentation.\n" +
        "* **Group Work (15 min):** Apply concepts to a problem.\n" +
        "* **Wrap-up (5 min):** Exit ticket."
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-sm col-span-1">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">AI Lesson Planner</h2>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Describe a topic, and let AI generate a lesson plan for you.
      </p>
      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Introduction to Photosynthesis for 9th Graders'"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700"
        />
        <button
          onClick={generatePlan}
          disabled={isLoading || !prompt}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Wand2 className="w-5 h-5" />
          )}
          <span>{isLoading ? 'Generating...' : 'Generate Plan'}</span>
        </button>
      </div>
      
      {plan && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Generated Plan:</h3>
          {/* Using a simple formatter for the mock markdown */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
          {plan.split('\n\n').map((paragraph: string, i: number) => (
            <p key={i}>
              {paragraph.split('\n').map((line: string, j: number) => (
                <React.Fragment key={j}>
                  {line.startsWith('**') ? <strong>{line.replace(/\*\*/g, '')}</strong> : line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Widget: Upcoming Events
function UpcomingEventsWidget({ events }: { events: any[] }) {
  const eventIcons: Record<string, JSX.Element> = {
    exam: <FileText className="w-5 h-5 text-red-500" />,
    meeting: <Users className="w-5 h-5 text-blue-500" />,
    reminder: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm col-span-1">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Upcoming Events</h2>
      <ul className="space-y-4">
        {events.map((event: any) => (
          <li key={event.id} className="flex items-start gap-4">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-1">
              {eventIcons[event.type] || <CalendarDays className="w-5 h-5 text-gray-500" />}
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">{event.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {event.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Main App Component ---
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const totalStudents = mockCourses.reduce((sum, course) => sum + course.students, 0);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Welcome back, {mockTeacher.name.split(' ')[1]}!</h1>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard icon={BookOpen} label="Active Courses" value={mockCourses.length} color="blue" />
              <StatCard icon={Users} label="Total Students" value={totalStudents} color="green" />
              <StatCard icon={FileSignature} label="Submissions to Grade" value={mockAssignments.filter(a => a.submitted > 0).length} color="yellow" />
            </div>
            
            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (Assignments) */}
              <AssignmentsWidget assignments={mockAssignments} />
              
              {/* Right Column (AI Planner & Upcoming) */}
              <div className="col-span-1 space-y-8">
                <AILessonPlanner />
                <UpcomingEventsWidget events={mockUpcomingEvents} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- App Entry Point ---
export default function App() {
  // We wrap the Dashboard in the ThemeProvider
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

