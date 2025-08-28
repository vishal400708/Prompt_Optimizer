import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Brain, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Database, 
  BookOpen, 
  Activity,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Prompt Analyzer', href: '/analyzer', icon: Brain },
    { name: 'Optimization Engine', href: '/optimization', icon: Zap },
    { name: 'Feedback Collection', href: '/feedback', icon: MessageSquare },
    { name: 'Performance Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Model Management', href: '/models', icon: Database },
    { name: 'API Documentation', href: '/api', icon: BookOpen },
    { name: 'System Monitoring', href: '/monitoring', icon: Activity },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">PromptOptim AI</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="ml-3">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center ${isOpen ? 'space-x-3' : 'justify-center'}`}>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">AD</span>
            </div>
            {isOpen && (
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@promptoptim.ai</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;