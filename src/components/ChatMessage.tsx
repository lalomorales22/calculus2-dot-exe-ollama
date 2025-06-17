import React from 'react';
import { MathRenderer } from './MathRenderer';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  image?: string;
  timestamp: Date;
}

export function ChatMessage({ text, isUser, image, timestamp }: ChatMessageProps) {
  const formatMathText = (text: string) => {
    // Split text by math delimiters and render accordingly
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        // Block math
        const math = part.slice(2, -2);
        return <MathRenderer key={index} math={math} block={true} />;
      } else if (part.startsWith('$') && part.endsWith('$')) {
        // Inline math
        const math = part.slice(1, -1);
        return <MathRenderer key={index} math={math} block={false} />;
      } else {
        // Regular text with potential formatting
        return (
          <span key={index} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      }
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-2 retro-border text-xs ${
          isUser
            ? 'bg-gray-800 border-orange-400 text-orange-300'
            : 'bg-gray-900 border-green-400 text-green-300'
        }`}
      >
        {image && (
          <div className="mb-2 border border-current p-1">
            <img 
              src={image} 
              alt="Uploaded" 
              className="max-w-full h-auto max-h-32 object-contain"
            />
          </div>
        )}
        <div className="math-content">
          {formatMathText(text)}
        </div>
        <div className="text-[10px] opacity-50 mt-1">
          {timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}