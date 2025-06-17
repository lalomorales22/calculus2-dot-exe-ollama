import React from 'react';

export function SystemInfo() {
  return (
    <div className="retro-border bg-blue-900 p-3 m-2 mt-0">
      <h3 className="text-blue-300 font-bold text-sm mb-2">SYSTEM INFO</h3>
      <ul className="text-xs text-blue-200 space-y-1">
        <li>• Click chunk headers to expand content</li>
        <li>• Use AI assistant for personalized help</li>
        <li>• All formulas rendered with LaTeX</li>
        <li>• Drag the sidebar divider to resize</li>
        <li>• Upload images to AI for problem analysis</li>
      </ul>
    </div>
  );
}