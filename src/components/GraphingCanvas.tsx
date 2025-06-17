import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Eye, EyeOff } from 'lucide-react';

interface GraphingCanvasProps {
  isVisible: boolean;
}

export function GraphingCanvas({ isVisible }: GraphingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [selectedFunction, setSelectedFunction] = useState('integration-by-parts');
  const [sliderValues, setSliderValues] = useState({
    a: 1,
    b: 1,
    c: 0,
    t: 0,
    n: 5
  });
  const [visibleLayers, setVisibleLayers] = useState({
    function: true,
    derivative: false,
    integral: false,
    tangent: false,
    area: false
  });

  const animationRef = useRef<number>();

  const functions = {
    'integration-by-parts': {
      name: 'Integration by Parts: ∫x·e^x dx',
      description: 'Visualize how u·v - ∫v·du works step by step',
      formula: (x: number, params: any) => x * Math.exp(x * params.a),
      color: '#00FF41'
    },
    'trig-substitution': {
      name: 'Trigonometric Substitution',
      description: 'See how √(a²-x²) transforms with x = a·sin(θ)',
      formula: (x: number, params: any) => Math.sqrt(Math.max(0, params.a * params.a - x * x)),
      color: '#FF6B35'
    },
    'partial-fractions': {
      name: 'Partial Fractions Decomposition',
      description: 'Break down 1/(x²-1) into simpler fractions',
      formula: (x: number, params: any) => Math.abs(x) > 1 ? 1 / (x * x - 1) : 0,
      color: '#FFD700'
    },
    'power-series': {
      name: 'Power Series: e^x approximation',
      description: 'Watch Taylor series converge to e^x',
      formula: (x: number, params: any) => {
        let sum = 0;
        for (let n = 0; n <= params.n; n++) {
          sum += Math.pow(x, n) / factorial(n);
        }
        return sum;
      },
      color: '#FF1493'
    },
    'parametric': {
      name: 'Parametric Curve: Cycloid',
      description: 'Trace the path of a point on a rolling circle',
      formula: (t: number, params: any) => ({
        x: params.a * (t - Math.sin(t)),
        y: params.a * (1 - Math.cos(t))
      }),
      color: '#00BFFF',
      isParametric: true
    },
    'polar': {
      name: 'Polar Curve: Rose r = cos(nθ)',
      description: 'Beautiful polar patterns with varying petals',
      formula: (theta: number, params: any) => Math.abs(Math.cos(params.n * theta)),
      color: '#9370DB',
      isPolar: true
    },
    'series-convergence': {
      name: 'Series Convergence Test',
      description: 'Visualize partial sums approaching limit',
      formula: (n: number, params: any) => {
        // Geometric series: sum of (1/2)^k from k=0 to n
        return (1 - Math.pow(0.5, n + 1)) / (1 - 0.5);
      },
      color: '#32CD32'
    }
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#003300';
    ctx.lineWidth = 1;
    
    const gridSize = 20;
    
    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Axes
    ctx.strokeStyle = '#00FF41';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
  };

  const drawFunction = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const func = functions[selectedFunction as keyof typeof functions];
    if (!func) return;

    ctx.strokeStyle = func.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const scale = 20;
    const centerX = width / 2;
    const centerY = height / 2;

    if (func.isParametric) {
      // Parametric curve
      let firstPoint = true;
      for (let t = 0; t <= 4 * Math.PI; t += 0.1) {
        const point = func.formula(t, sliderValues) as { x: number; y: number };
        const screenX = centerX + point.x * scale;
        const screenY = centerY - point.y * scale;
        
        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
    } else if (func.isPolar) {
      // Polar curve
      let firstPoint = true;
      for (let theta = 0; theta <= 2 * Math.PI; theta += 0.05) {
        const r = func.formula(theta, sliderValues) as number;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        const screenX = centerX + x * scale * 2;
        const screenY = centerY - y * scale * 2;
        
        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }
    } else {
      // Regular function
      let firstPoint = true;
      for (let x = -width / (2 * scale); x <= width / (2 * scale); x += 0.1) {
        const y = func.formula(x, sliderValues) as number;
        if (isFinite(y)) {
          const screenX = centerX + x * scale;
          const screenY = centerY - y * scale;
          
          if (firstPoint) {
            ctx.moveTo(screenX, screenY);
            firstPoint = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
      }
    }
    
    ctx.stroke();

    // Draw area under curve if enabled
    if (visibleLayers.area && !func.isParametric && !func.isPolar) {
      ctx.fillStyle = func.color + '20';
      ctx.beginPath();
      ctx.moveTo(centerX - 2 * scale, centerY);
      
      for (let x = -2; x <= 2; x += 0.1) {
        const y = func.formula(x, sliderValues) as number;
        if (isFinite(y)) {
          const screenX = centerX + x * scale;
          const screenY = centerY - y * scale;
          ctx.lineTo(screenX, screenY);
        }
      }
      
      ctx.lineTo(centerX + 2 * scale, centerY);
      ctx.closePath();
      ctx.fill();
    }
  };

  const animate = () => {
    if (!isAnimating) return;
    
    setSliderValues(prev => ({
      ...prev,
      t: (prev.t + 0.1 * animationSpeed) % (2 * Math.PI)
    }));
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isAnimating) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw function
    if (visibleLayers.function) {
      drawFunction(ctx, canvas.width, canvas.height);
    }
  }, [sliderValues, selectedFunction, visibleLayers, isVisible]);

  const handleSliderChange = (key: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [key]: value }));
  };

  const toggleLayer = (layer: string) => {
    setVisibleLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const resetAnimation = () => {
    setSliderValues(prev => ({ ...prev, t: 0 }));
  };

  if (!isVisible) return null;

  return (
    <div className="h-full flex">
      {/* Canvas Area */}
      <div className="flex-1 p-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="retro-border border-green-400 bg-black w-full h-full"
        />
      </div>

      {/* Controls Panel */}
      <div className="w-80 p-4 space-y-4 overflow-y-auto scrollbar-custom">
        {/* Function Selection */}
        <div className="retro-border border-orange-400 p-3">
          <h4 className="text-orange-400 font-bold mb-2 flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            FUNCTION SELECTOR
          </h4>
          <select
            value={selectedFunction}
            onChange={(e) => setSelectedFunction(e.target.value)}
            className="retro-input w-full text-xs text-green-400"
          >
            {Object.entries(functions).map(([key, func]) => (
              <option key={key} value={key}>{func.name}</option>
            ))}
          </select>
          <p className="text-xs text-gray-300 mt-2">
            {functions[selectedFunction as keyof typeof functions]?.description}
          </p>
        </div>

        {/* Animation Controls */}
        <div className="retro-border border-green-400 p-3">
          <h4 className="text-green-400 font-bold mb-2">ANIMATION</h4>
          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className={`retro-button flex-1 text-xs ${
                isAnimating ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'
              }`}
            >
              {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={resetAnimation}
              className="retro-button text-orange-400 border-orange-400"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
          <div>
            <label className="text-xs text-green-300">Speed: {animationSpeed.toFixed(1)}</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-full mt-1"
            />
          </div>
        </div>

        {/* Parameter Sliders */}
        <div className="retro-border border-red-400 p-3">
          <h4 className="text-red-400 font-bold mb-2">PARAMETERS</h4>
          <div className="space-y-3">
            {Object.entries(sliderValues).map(([key, value]) => (
              <div key={key}>
                <label className="text-xs text-gray-300">
                  {key.toUpperCase()}: {value.toFixed(2)}
                </label>
                <input
                  type="range"
                  min={key === 'n' ? 1 : -3}
                  max={key === 'n' ? 20 : 3}
                  step={key === 'n' ? 1 : 0.1}
                  value={value}
                  onChange={(e) => handleSliderChange(key, parseFloat(e.target.value))}
                  className="w-full mt-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Layer Visibility */}
        <div className="retro-border border-blue-400 p-3">
          <h4 className="text-blue-400 font-bold mb-2">LAYERS</h4>
          <div className="space-y-2">
            {Object.entries(visibleLayers).map(([layer, visible]) => (
              <button
                key={layer}
                onClick={() => toggleLayer(layer)}
                className={`retro-button w-full text-xs flex items-center justify-between ${
                  visible ? 'text-green-400 border-green-400' : 'text-gray-400 border-gray-400'
                }`}
              >
                <span>{layer.charAt(0).toUpperCase() + layer.slice(1)}</span>
                {visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Formula Display */}
        <div className="retro-border border-purple-400 p-3">
          <h4 className="text-purple-400 font-bold mb-2">CURRENT FORMULA</h4>
          <div className="math-formula text-green-400 text-xs">
            {functions[selectedFunction as keyof typeof functions]?.name}
          </div>
        </div>
      </div>
    </div>
  );
}