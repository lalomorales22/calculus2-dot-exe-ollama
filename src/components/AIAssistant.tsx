import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, RefreshCw, Wifi, WifiOff, ChevronDown, Image, X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  image?: string;
  timestamp: Date;
}

interface OllamaModel {
  name: string;
  size: number;
  digest: string;
  modified_at: string;
}

export function AIAssistant() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [availableModels, setAvailableModels] = useState<OllamaModel[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Calculus II tutor AI powered by Ollama. I'm here to help you understand limits, derivatives, integrals, and all the concepts in your modules. Ask me anything about calculus!\n\nFor mathematical expressions, I'll format them properly. For example:\n- Derivatives: $\\frac{d}{dx}[x^2] = 2x$\n- Integrals: $\\int x^2 dx = \\frac{x^3}{3} + C$\n- Limits: $\\lim_{x \\to \\infty} \\frac{1}{x} = 0$\n\nYou can also upload images or drag and drop them here to analyze mathematical problems, graphs, or diagrams!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkOllamaConnection = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        const data = await response.json();
        setAvailableModels(data.models || []);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ollama connection error:', error);
      return false;
    }
  };

  const loadModels = async () => {
    setIsLoadingModels(true);
    setConnectionError(null);
    
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        const data = await response.json();
        setAvailableModels(data.models || []);
        if (data.models && data.models.length > 0 && !selectedModel) {
          setSelectedModel(data.models[0].name);
        }
      } else {
        throw new Error('Failed to fetch models');
      }
    } catch (error) {
      setConnectionError('Cannot connect to Ollama. Make sure Ollama is running on localhost:11434');
      setAvailableModels([]);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionError(null);
    
    const connected = await checkOllamaConnection();
    if (connected) {
      setIsConnected(true);
      await loadModels();
    } else {
      setConnectionError('Cannot connect to Ollama. Make sure Ollama is running on localhost:11434');
    }
    
    setIsConnecting(false);
  };

  const sendToOllama = async (prompt: string, imageBase64?: string) => {
    try {
      const payload: any = {
        model: selectedModel,
        prompt: prompt,
        stream: false
      };

      if (imageBase64) {
        payload.images = [imageBase64.split(',')[1]]; // Remove data:image/... prefix
      }

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling Ollama:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !draggedImage) return;
    if (!isConnected || !selectedModel) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      image: draggedImage || undefined,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    const currentInput = inputText;
    const currentImage = draggedImage;
    setInputText('');
    setDraggedImage(null);
    setIsGenerating(true);
    
    try {
      const contextPrompt = `You are a Calculus II tutor AI. The user is working with an 8-module course covering: 1) Advanced Integration Techniques, 2) Partial Fractions & Numerical Integration, 3) Improper Integrals & Applications, 4) Sequences and Series Fundamentals, 5) Convergence Tests for Series, 6) Power Series & Taylor Series, 7) Parametric Equations & Polar Coordinates, 8) Interactive Visualization Dashboard. 

When responding with mathematical expressions, please format them using LaTeX notation with $ for inline math and $$ for display math. For example:
- Use $\\int u \\, dv = uv - \\int v \\, du$ for integration by parts
- Use $\\sum_{n=1}^{\\infty} ar^{n-1} = \\frac{a}{1-r}$ for geometric series
- Use $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$ for parametric derivatives

User question: ${currentInput}`;

      const response = await sendToOllama(contextPrompt, currentImage);
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error while processing your request. Please make sure Ollama is running and try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDraggedImage(e.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDraggedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="retro-border m-2 bg-black h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b-2 border-green-400">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-bold text-sm">CALC TUTOR AI</span>
          </div>
          <div className="flex items-center space-x-1">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
          </div>
        </div>
        
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="text-xs text-green-300">OLLAMA MODEL:</label>
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="retro-input w-full text-xs text-green-400 appearance-none pr-6"
              disabled={!isConnected || isLoadingModels}
            >
              <option value="">Choose Ollama model...</option>
              {availableModels.map(model => (
                <option key={model.name} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-green-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Connection Status */}
        <div className="mt-2 flex space-x-2">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`retro-button text-xs flex-1 ${
              isConnected ? 'text-green-400 border-green-400' :
              isConnecting ? 'text-orange-400 border-orange-400' :
              'text-red-400 border-red-400'
            }`}
          >
            {isConnecting ? (
              <RefreshCw className="w-3 h-3 animate-spin mx-auto" />
            ) : isConnected ? (
              'CONNECTED'
            ) : (
              'CONNECT'
            )}
          </button>
          
          {isConnected && (
            <button
              onClick={loadModels}
              disabled={isLoadingModels}
              className="retro-button text-xs text-orange-400 border-orange-400"
            >
              {isLoadingModels ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                'REFRESH'
              )}
            </button>
          )}
        </div>
        
        {connectionError && (
          <div className="mt-2 text-xs text-red-400 border border-red-400 p-2">
            {connectionError}
          </div>
        )}
        
        <div className="mt-2 text-xs">
          <div className="text-green-300">
            <div>Ollama: {isConnected ? 'Connected' : 'Not Connected'}</div>
            <div>Model: {selectedModel || 'None selected'}</div>
            <div>Vision: {selectedModel.includes('llava') || selectedModel.includes('vision') ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        className="flex-1 overflow-y-auto scrollbar-custom p-3 space-y-3"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            text={message.text}
            isUser={message.isUser}
            image={message.image}
            timestamp={message.timestamp}
          />
        ))}
        
        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-gray-900 border-green-400 text-green-300 max-w-[80%] p-2 retro-border text-xs">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Generating response...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview */}
      {draggedImage && (
        <div className="p-2 border-t border-green-400">
          <div className="relative inline-block">
            <img 
              src={draggedImage} 
              alt="To send" 
              className="max-w-full h-16 object-contain border border-green-400"
            />
            <button
              onClick={() => setDraggedImage(null)}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 text-black rounded-full flex items-center justify-center text-xs"
            >
              <X className="w-2 h-2" />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t-2 border-green-400">
        <div className="text-[10px] text-green-300 mb-2">
          {!isConnected ? 'Connect to Ollama first...' : 
           !selectedModel ? 'Select a model...' :
           'Ready to chat!'}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="retro-button text-green-400 border-green-400 p-2"
            disabled={!isConnected || !selectedModel}
          >
            <Image className="w-4 h-4" />
          </button>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected && selectedModel ? "Ask about calculus..." : "Connect and select model first..."}
            disabled={!isConnected || !selectedModel || isGenerating}
            className="retro-input flex-1 text-xs resize-none h-8 text-green-400"
            rows={1}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!isConnected || !selectedModel || (!inputText.trim() && !draggedImage) || isGenerating}
            className="retro-button text-green-400 border-green-400 p-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}