import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { modules } from '../data/modules';
import { GraphingCanvas } from './GraphingCanvas';
import { FormulaBox } from './MathRenderer';

interface ModuleListProps {
  expandedModule: number | null;
  setExpandedModule: (moduleId: number | null) => void;
}

export function ModuleList({ expandedModule, setExpandedModule }: ModuleListProps) {
  const toggleModule = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="p-4 space-y-2">
      {modules.map((module) => (
        <div key={module.id} className="fade-in">
          <div
            className={`chunk-header flex items-center justify-between ${
              module.id === 1 ? 'text-green-400 border-green-400' :
              module.id === 2 ? 'text-orange-400 border-orange-400' :
              module.id === 3 ? 'text-red-400 border-red-400' :
              module.id === 4 ? 'text-green-400 border-green-400' :
              module.id === 5 ? 'text-orange-400 border-orange-400' :
              module.id === 6 ? 'text-red-400 border-red-400' :
              module.id === 7 ? 'text-green-400 border-green-400' :
              'text-orange-400 border-orange-400'
            }`}
            onClick={() => toggleModule(module.id)}
          >
            <span className="font-medium">
              CHUNK {module.id}: {module.title}
            </span>
            {expandedModule === module.id ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </div>
          
          {expandedModule === module.id && (
            <div className={`mt-2 retro-border bg-gray-900 fade-in ${
              module.id === 1 ? 'border-green-400' :
              module.id === 2 ? 'border-orange-400' :
              module.id === 3 ? 'border-red-400' :
              module.id === 4 ? 'border-green-400' :
              module.id === 5 ? 'border-orange-400' :
              module.id === 6 ? 'border-red-400' :
              module.id === 7 ? 'border-green-400' :
              'border-orange-400'
            }`}>
              {module.id === 8 ? (
                <GraphingCanvas isVisible={true} />
              ) : (
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Core Concepts:</h4>
                    <div className="space-y-3">
                      {module.concepts.map((concept, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 mt-1">▸</span>
                            <span className="text-sm text-gray-300 font-medium">{concept}</span>
                          </div>
                          <div className="ml-4 p-2 bg-gray-800 rounded border-l-2 border-blue-400">
                            <p className="text-xs text-blue-200 leading-relaxed">
                              {module.conceptDescriptions[index]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Key Formulas:</h4>
                    <div className="space-y-3">
                      {module.formulas.map((formula, index) => (
                        <FormulaBox 
                          key={index} 
                          formula={formula}
                          className="text-center"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Applications:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {module.applications.map((app, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-400">→</span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}