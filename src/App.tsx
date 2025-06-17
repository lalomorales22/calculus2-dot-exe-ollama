import React, { useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { ModuleList } from './components/ModuleList';
import { AIAssistant } from './components/AIAssistant';
import { SystemInfo } from './components/SystemInfo';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const dragRef = useRef<number>(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = e.clientX;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = dragRef.current - e.clientX;
    const newWidth = Math.max(300, Math.min(600, sidebarWidth + deltaX));
    setSidebarWidth(newWidth);
    dragRef.current = e.clientX;
  }, [isDragging, sidebarWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="h-screen bg-black text-green-400 flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div 
          className="flex-1 flex flex-col overflow-hidden"
          style={{ width: `calc(100% - ${sidebarWidth}px)` }}
        >
          <div className="retro-border m-2 flex-1 flex flex-col overflow-hidden">
            <div className="bg-black p-4 border-b-2 border-green-400 flex-shrink-0">
              <h2 className="text-green-400 text-lg font-bold mb-1">
                CALCULUS REFERENCE SYSTEM
              </h2>
              <p className="text-green-300 text-sm">
                Complete formulas, theorems, and concepts for all 8 chunks
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-custom">
              <ModuleList 
                expandedModule={expandedModule}
                setExpandedModule={setExpandedModule}
              />
            </div>
            
            <div className="flex-shrink-0">
              <SystemInfo />
            </div>
          </div>
        </div>

        {/* Drag Handle */}
        <div
          className="w-1 bg-green-400 drag-handle cursor-col-resize flex-shrink-0"
          onMouseDown={handleMouseDown}
        />

        {/* AI Assistant Sidebar */}
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{ width: `${sidebarWidth}px` }}
        >
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}

export default App;