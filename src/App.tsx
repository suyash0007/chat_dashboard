import { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import ChatDashboard from './components/ChatDashboard';
import { ChatSessionProvider } from './context/ChatSessionContext';
import { Menu, X } from 'lucide-react'; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visible by default
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true); 
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ChatSessionProvider>
      <div className="flex h-screen">
        {isMobile && isSidebarOpen && (
          <div
            className={`fixed inset-0 z-40 bg-white shadow-md transition-transform transform duration-3000 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <SideBar onClose={toggleSidebar} />
            <div className="absolute top-4 right-4">
              <button onClick={toggleSidebar} className="p-2">
                <X size={24} /> 
              </button>
            </div>
          </div>
        )}
        {/* Sidebar for desktop */}
        {!isMobile && (
          <div className="w-full sm:w-80 lg:w-2/5 flex-shrink-0 mr-10">
            <SideBar onClose={toggleSidebar}/>
          </div>
        )}
        <div className="flex-grow overflow-hidden">
          {/* Hamburger Menu for mobile */}
          {isMobile && (
            <div className="flex items-center justify-between p-4 bg-white shadow-md z-50">
              <button onClick={toggleSidebar}>
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />} 
              </button>
              <h1 className="text-lg font-semibold">Chat Dashboard</h1>
            </div>
          )}
          {/* Always show the Chat Dashboard */}
          <ChatDashboard />
        </div>
      </div>
    </ChatSessionProvider>
  );
}

export default App;
