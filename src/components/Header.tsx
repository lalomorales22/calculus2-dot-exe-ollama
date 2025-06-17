import React from 'react';
import { Calculator, Cpu, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="retro-border m-2 bg-black p-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Calculator className="w-6 h-6 text-green-400" />
          <div>
            <h1 className="text-green-400 font-bold text-xl">CALCULUS2.EXE</h1>
            <p className="text-green-300 text-xs">8-BIT LEARNING SYSTEM v2.0</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-xs">
          <Cpu className="w-4 h-4 text-orange-400" />
          <span className="text-orange-400">CPU: LEARNING</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Zap className="w-4 h-4 text-red-400" />
          <span className="text-red-400">STATUS: ACTIVE</span>
        </div>
        <div className="w-3 h-3 bg-green-400 rounded-full blink"></div>
      </div>
    </header>
  );
}