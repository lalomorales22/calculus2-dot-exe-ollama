# CALCULUS2.EXE - 8-BIT LEARNING SYSTEM

![CALCULUS2.EXE](https://img.shields.io/badge/CALCULUS2.EXE-8--BIT%20LEARNING-00FF41?style=for-the-badge&logo=calculator)
![Version](https://img.shields.io/badge/version-2.0-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/status-ACTIVE-red?style=for-the-badge)

<img width="1095" alt="Screenshot 2025-06-17 at 12 45 56 AM" src="https://github.com/user-attachments/assets/1206ee22-4d95-4957-8848-6c621b5da7c7" />


A retro-styled, interactive Calculus II learning platform with AI tutoring capabilities powered by Ollama. Experience calculus concepts through an immersive 8-bit terminal interface with comprehensive formula references, interactive visualizations, and personalized AI assistance.

## 🎮 Features

### 📚 **8 Comprehensive Learning Modules**
- **Chunk 1**: Advanced Integration Techniques (Integration by Parts, Trig Substitution)
- **Chunk 2**: Partial Fractions & Numerical Integration
- **Chunk 3**: Improper Integrals & Applications
- **Chunk 4**: Sequences and Series Fundamentals
- **Chunk 5**: Convergence Tests for Series
- **Chunk 6**: Power Series & Taylor Series
- **Chunk 7**: Parametric Equations & Polar Coordinates
- **Chunk 8**: Interactive Visualization Dashboard

### 🤖 **AI Tutor Integration**
- **Ollama-Powered**: Connect to local Ollama models for personalized tutoring
- **Vision Support**: Upload images of mathematical problems for analysis
- **LaTeX Rendering**: Beautiful mathematical formula formatting in chat
- **Context-Aware**: AI understands all 8 calculus modules for targeted help

### 📊 **Interactive Visualizations**
- **Dynamic Graphing**: Real-time mathematical function plotting
- **Parameter Sliders**: Manipulate variables and see instant visual feedback
- **Multiple Coordinate Systems**: Cartesian, parametric, and polar plotting
- **Animation Controls**: Watch mathematical concepts come to life

### 🎨 **Retro Terminal Experience**
- **8-Bit Aesthetic**: Authentic retro computing interface
- **Resizable Layout**: Drag-and-drop sidebar resizing
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Custom Scrollbars**: Themed scrolling throughout the interface

## 🚀 Getting Started

### Prerequisites

Before running CALCULUS2.EXE, ensure you have:

1. **Node.js** (version 16 or higher)
2. **npm** or **yarn** package manager
3. **Ollama** (for AI tutoring features)

### Installing Ollama

1. **Download Ollama**: Visit [ollama.ai](https://ollama.ai) and download for your platform
2. **Install a Model**: Run one of these commands:
   ```bash
   # For general tutoring (recommended)
   ollama pull llama2
   
   # For vision capabilities (image analysis)
   ollama pull llava
   
   # For advanced mathematical reasoning
   ollama pull codellama
   ```
3. **Start Ollama**: The service should start automatically, or run:
   ```bash
   ollama serve
   ```

### Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/lalomorales22/calculus2-dot-exe-ollama.git
   cd calculus2-dot-exe-ollama
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Your Browser**: Navigate to `http://localhost:5173`

## 🎯 How to Use

### 📖 **Exploring Calculus Concepts**

1. **Browse Modules**: Click on any "CHUNK" header to expand and explore concepts
2. **Read Descriptions**: Each concept includes easy-to-understand explanations
3. **Study Formulas**: All mathematical formulas are beautifully rendered with LaTeX
4. **Check Applications**: See real-world uses for each mathematical concept

### 🤖 **Using the AI Tutor**

1. **Connect to Ollama**:
   - Click the "CONNECT" button in the AI assistant panel
   - Select your preferred Ollama model from the dropdown
   - Wait for the "CONNECTED" status

2. **Ask Questions**:
   - Type calculus questions in the chat input
   - Upload images of problems using the image button
   - Get detailed explanations with properly formatted mathematics

3. **Image Analysis**:
   - Drag and drop images directly into the chat area
   - Or click the image icon to select files
   - AI can analyze graphs, equations, and handwritten problems

### 📊 **Interactive Visualizations (Chunk 8)**

1. **Select Functions**: Choose from various mathematical concepts to visualize
2. **Adjust Parameters**: Use sliders to modify function parameters in real-time
3. **Control Animations**: Play, pause, and reset animations
4. **Toggle Layers**: Show/hide different visual elements (function, derivative, integral, etc.)

### ⚙️ **Interface Customization**

- **Resize Sidebar**: Drag the green divider to adjust AI assistant width
- **Scroll Navigation**: Use mouse wheel or scrollbars to navigate content
- **Expand/Collapse**: Click chunk headers to show/hide detailed content

## 🛠️ Technical Details

### Built With

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **KaTeX** - Mathematical formula rendering
- **Lucide React** - Beautiful icon library

### Project Structure

```
src/
├── components/          # React components
│   ├── AIAssistant.tsx     # Ollama integration & chat
│   ├── ChatMessage.tsx     # Individual chat messages
│   ├── GraphingCanvas.tsx  # Interactive visualizations
│   ├── Header.tsx          # App header with status
│   ├── MathRenderer.tsx    # LaTeX formula rendering
│   ├── ModuleList.tsx      # Calculus module display
│   └── SystemInfo.tsx      # Help and info panel
├── data/
│   └── modules.ts          # Calculus content and formulas
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and animations
```

### Key Features Implementation

- **LaTeX Rendering**: KaTeX library for beautiful mathematical notation
- **Ollama Integration**: Direct API calls to local Ollama instance
- **Responsive Design**: Flexible layout that adapts to different screen sizes
- **Image Upload**: Drag-and-drop and file selection for problem analysis
- **Real-time Graphing**: HTML5 Canvas with mathematical function plotting

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Adding New Content

1. **New Calculus Modules**: Edit `src/data/modules.ts`
2. **Additional Visualizations**: Extend `src/components/GraphingCanvas.tsx`
3. **Custom Styling**: Modify `src/index.css` for theme changes

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Ideas

- Additional calculus concepts and modules
- New visualization types and interactive demos
- Improved AI prompting and context handling
- Enhanced accessibility features
- Mobile responsiveness improvements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ollama Team** - For the amazing local AI inference platform
- **KaTeX** - For beautiful mathematical rendering
- **React Community** - For the robust ecosystem
- **Calculus Educators** - For inspiring better ways to teach mathematics

## 📞 Support

Having issues? Here's how to get help:

1. **Check Ollama Connection**: Ensure Ollama is running on `localhost:11434`
2. **Verify Model Installation**: Run `ollama list` to see installed models
3. **Browser Console**: Check for any JavaScript errors
4. **GitHub Issues**: Report bugs or request features

## 🎓 Educational Impact

CALCULUS2.EXE transforms traditional calculus learning by:

- **Visual Learning**: Interactive graphs make abstract concepts concrete
- **Personalized Tutoring**: AI adapts to individual learning needs
- **Immediate Feedback**: Real-time responses to questions and problems
- **Comprehensive Coverage**: All major Calculus II topics in one place
- **Engaging Interface**: Retro gaming aesthetic makes learning fun

---

**Ready to master Calculus II? Clone the repo and start your 8-bit learning journey today!** 🚀

```bash
git clone https://github.com/lalomorales22/calculus2-dot-exe-ollama.git
cd calculus2-dot-exe-ollama
npm install
npm run dev
```

*CALCULUS2.EXE - Where mathematics meets retro computing* ⚡
