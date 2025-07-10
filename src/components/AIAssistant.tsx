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
  const [ollamaAvailable, setOllamaAvailable] = useState(false);
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

  const checkOllamaAvailability = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        const data = await response.json();
        setAvailableModels(data.models || []);
        setOllamaAvailable(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ollama availability check error:', error);
      setOllamaAvailable(false);
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
        setOllamaAvailable(true);
      } else {
        throw new Error('Failed to fetch models');
      }
    } catch (error) {
      setConnectionError('Cannot connect to Ollama. Make sure Ollama is running on localhost:11434');
      setAvailableModels([]);
      setOllamaAvailable(false);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleConnect = async () => {
    if (!selectedModel) {
      setConnectionError('Please select a model first');
      return;
    }

    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Test the connection with the selected model using chat endpoint
      const testPayload = {
        model: selectedModel,
        messages: [
          {
            role: 'user',
            content: 'Hello'
          }
        ],
        stream: false
      };

      console.log('Testing connection with model:', selectedModel);
      
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPayload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Connection test response:', data);
        if (data.message && data.message.content !== undefined) {
          setIsConnected(true);
          console.log('Successfully connected to model:', selectedModel);
        } else {
          throw new Error('Invalid response from model - missing message.content');
        }
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          setConnectionError(`Model "${selectedModel}" not found. Try refreshing models or select a different one.`);
        } else {
          setConnectionError(`Failed to connect to model "${selectedModel}". ${error.message}`);
        }
      } else {
        setConnectionError(`Failed to connect to model "${selectedModel}"`);
      }
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectionError(null);
    console.log('Disconnected from model:', selectedModel);
  };

  // Load models on component mount
  React.useEffect(() => {
    loadModels();
  }, []);

  const sendToOllama = async (prompt: string, imageBase64?: string) => {
    try {
      // Try chat endpoint first, fall back to generate endpoint
      const useChatEndpoint = true; // Set to false to use /api/generate instead
      
      let payload: any;
      let endpoint: string;
      
      if (useChatEndpoint) {
        endpoint = 'http://localhost:11434/api/chat';
        payload = {
          model: selectedModel,
          messages: [
            {
              role: 'user',
              content: prompt,
              ...(imageBase64 && { images: [imageBase64.split(',')[1]] })
            }
          ],
          stream: false
        };
      } else {
        endpoint = 'http://localhost:11434/api/generate';
        payload = {
          model: selectedModel,
          prompt: prompt,
          stream: false
        };
        
        if (imageBase64) {
          payload.images = [imageBase64.split(',')[1]]; // Remove data:image/... prefix
        }
      }

      console.log('Sending request to Ollama:', { endpoint, model: selectedModel, promptLength: prompt.length });

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 1 minute timeout for testing

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ollama API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Check content type to handle different response formats
      const contentType = response.headers.get('content-type');
      console.log('Response content type:', contentType);

      let data;
      try {
        if (contentType?.includes('application/x-ndjson') || contentType?.includes('text/plain')) {
          // Handle streaming response that might be newline delimited JSON
          const text = await response.text();
          console.log('Raw response text (first 200 chars):', text.substring(0, 200));
          
          // Parse newline-delimited JSON
          const lines = text.trim().split('\n');
          console.log('Number of lines in response:', lines.length);
          
          if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            console.log('Last line:', lastLine);
            data = JSON.parse(lastLine);
          } else {
            throw new Error('Empty response from Ollama');
          }
        } else {
          // Handle regular JSON response
          data = await response.json();
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        const rawText = await response.text();
        console.error('Raw response:', rawText);
        throw new Error('Failed to parse Ollama response');
      }

      console.log('Parsed response data:', data);
      
      // Handle different response formats
      let responseText: string;
      if (useChatEndpoint) {
        // Chat endpoint returns: { message: { content: "response text" } }
        if (data.message && data.message.content !== undefined) {
          responseText = data.message.content;
        } else {
          console.error('Invalid chat response structure:', data);
          throw new Error('No message.content field in Ollama chat response');
        }
      } else {
        // Generate endpoint returns: { response: "response text" }
        if (data.response !== undefined) {
          responseText = data.response;
        } else {
          console.error('Invalid generate response structure:', data);
          throw new Error('No response field in Ollama generate response');
        }
      }
      
      console.log('Final response text length:', responseText.length);
      return responseText;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Ollama request timed out after 2 minutes');
        throw new Error('Request timed out - the model is taking too long to respond');
      }
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

IMPORTANT: Always format mathematical expressions using proper LaTeX delimiters:
- Use $math$ for inline mathematics (e.g., $x^2 + 1$)
- Use $$math$$ for display mathematics (e.g., $$\\int_0^1 x^2 dx$$)
- Use \\(math\\) for inline mathematics (e.g., \\(\\frac{dy}{dx}\\))
- Use \\[math\\] for display mathematics (e.g., \\[\\sum_{n=1}^{\\infty} \\frac{1}{n^2}\\])

Examples of proper formatting:
- Integration by parts: $\\int u \\, dv = uv - \\int v \\, du$
- Geometric series: $$\\sum_{n=1}^{\\infty} ar^{n-1} = \\frac{a}{1-r}$$
- Parametric derivatives: \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\)
- Limits: \\[\\lim_{x \\to \\infty} \\frac{1}{x} = 0\\]

Always surround mathematical expressions with these delimiters so they render beautifully. Do not leave raw LaTeX without delimiters.

User question: ${currentInput}`;

      const response = await sendToOllama(contextPrompt, currentImage || undefined);
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error: unknown) {
      console.error('Error in handleSendMessage:', error);
      
      let errorMessage = "Sorry, I encountered an error while processing your request. Please make sure Ollama is running and try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('timed out')) {
          errorMessage = "The model is taking too long to respond. Try using a smaller/faster model or a simpler question.";
        } else if (error.message.includes('HTTP error! status: 404')) {
          errorMessage = "The selected model was not found. Please refresh models or select a different one.";
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = "Cannot connect to Ollama. Please make sure Ollama is running on localhost:11434.";
        }
      }
      
      const errorResponse: Message = {
        id: messages.length + 2,
        text: errorMessage,
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
          <label className="text-xs text-green-300">
            OLLAMA MODEL: {!ollamaAvailable && '(Ollama not available)'}
          </label>
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="retro-input w-full text-xs text-green-400 appearance-none pr-6"
              disabled={!ollamaAvailable || isLoadingModels}
            >
              <option value="">
                {isLoadingModels ? 'Loading models...' : 
                 !ollamaAvailable ? 'Ollama not available' :
                 availableModels.length === 0 ? 'No models found' :
                 'Choose a model first...'}
              </option>
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
            onClick={isConnected ? handleDisconnect : handleConnect}
            disabled={isConnecting || (!selectedModel && !isConnected) || !ollamaAvailable}
            className={`retro-button text-xs flex-1 ${
              isConnected ? 'text-red-400 border-red-400' :
              isConnecting ? 'text-orange-400 border-orange-400' :
              !selectedModel || !ollamaAvailable ? 'text-gray-500 border-gray-500' :
              'text-blue-400 border-blue-400'
            }`}
          >
            {isConnecting ? (
              <RefreshCw className="w-3 h-3 animate-spin mx-auto" />
            ) : isConnected ? (
              'DISCONNECT'
            ) : !ollamaAvailable ? (
              'OLLAMA OFFLINE'
            ) : !selectedModel ? (
              'SELECT MODEL FIRST'
            ) : (
              'CONNECT TO MODEL'
            )}
          </button>
          
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
        </div>
        
        {connectionError && (
          <div className="mt-2 text-xs text-red-400 border border-red-400 p-2">
            {connectionError}
          </div>
        )}
        
        <div className="mt-2 text-xs">
          <div className="text-green-300">
            <div>Ollama: {ollamaAvailable ? 'Available' : 'Offline'}</div>
            <div>Model: {selectedModel || 'None selected'}</div>
            <div>Status: {isConnected ? 'Connected & Ready' : selectedModel ? 'Ready to connect' : 'Select model first'}</div>
            <div>Vision: {selectedModel && (selectedModel.includes('llava') || selectedModel.includes('vision')) ? 'Enabled' : 'Disabled'}</div>
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
          {!ollamaAvailable ? 'Ollama is offline...' :
           !selectedModel ? 'Select a model first...' :
           !isConnected ? 'Press CONNECT TO MODEL...' :
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
            disabled={!isConnected || !selectedModel || isGenerating}
          >
            <Image className="w-4 h-4" />
          </button>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              !ollamaAvailable ? "Ollama is offline..." :
              !selectedModel ? "Select a model first..." :
              !isConnected ? "Connect to model first..." :
              "Ask about calculus..."
            }
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