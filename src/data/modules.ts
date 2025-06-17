export interface Module {
  id: number;
  title: string;
  concepts: string[];
  conceptDescriptions: string[];
  formulas: string[];
  applications: string[];
}

export const modules: Module[] = [
  {
    id: 1,
    title: "ADVANCED INTEGRATION TECHNIQUES",
    concepts: [
      "Integration by Parts - The reverse of the product rule",
      "Trigonometric Integrals - Powers and products of trig functions",
      "Trigonometric Substitution - Using trig identities to simplify radicals",
      "Partial Fractions - Decomposing rational functions"
    ],
    conceptDescriptions: [
      "Think of integration by parts like 'undoing' the product rule. When you have two functions multiplied together, choose one to differentiate (u) and one to integrate (dv). The LIPET rule helps: Logarithmic, Inverse trig, Polynomial, Exponential, Trigonometric - pick u in this order of preference.",
      "When integrating sin^m(x)cos^n(x), use these strategies: if either power is odd, save one copy and convert the rest using sin²x + cos²x = 1. If both powers are even, use half-angle formulas. It's like having a toolbox of identities to simplify complex trig expressions.",
      "Trigonometric substitution is like changing variables to eliminate square roots. For √(a²-x²), imagine a right triangle where x is opposite and a is hypotenuse, so x = a·sin(θ). This transforms the radical into a simple trig function that's easier to integrate.",
      "Partial fractions breaks down a complex fraction like 1/(x²-1) into simpler pieces: A/(x-1) + B/(x+1). It's like reverse-engineering: instead of adding fractions, we're splitting them apart to make integration possible."
    ],
    formulas: [
      "\\int u \\, dv = uv - \\int v \\, du",
      "\\int \\sin^m(x)\\cos^n(x) \\, dx \\text{ strategies}",
      "x = a\\sin(\\theta) \\text{ for } \\sqrt{a^2-x^2}",
      "x = a\\tan(\\theta) \\text{ for } \\sqrt{a^2+x^2}",
      "x = a\\sec(\\theta) \\text{ for } \\sqrt{x^2-a^2}"
    ],
    applications: [
      "Engineering problems with complex force calculations",
      "Physics applications in oscillatory motion",
      "Area calculations for complex regions",
      "Volume calculations using advanced techniques"
    ]
  },
  {
    id: 2,
    title: "PARTIAL FRACTIONS & NUMERICAL INTEGRATION",
    concepts: [
      "Partial Fraction Decomposition for rational functions",
      "Linear factors (distinct and repeated)",
      "Quadratic factors (irreducible)",
      "Numerical integration methods for approximation"
    ],
    conceptDescriptions: [
      "Partial fraction decomposition is like taking apart a complex machine to see its simple components. Every rational function can be broken down into simpler fractions that are much easier to integrate. It's the mathematical equivalent of 'divide and conquer.'",
      "Linear factors are the building blocks of partial fractions. Distinct factors like (x-1)(x-2) give us separate fractions A/(x-1) + B/(x-2). Repeated factors like (x-1)² require multiple terms: A/(x-1) + B/(x-1)².",
      "Irreducible quadratic factors (like x²+1 that don't factor over real numbers) require a different approach. We use (Ax+B)/(x²+1) instead of just A/(x²+1). Think of it as needing both a constant and a linear term to handle the complexity.",
      "When exact integration is impossible or impractical, numerical methods approximate the area under a curve. Midpoint rule uses rectangles, trapezoidal rule uses trapezoids, and Simpson's rule uses parabolas - each more accurate than the last."
    ],
    formulas: [
      "\\frac{A}{x-a} + \\frac{B}{x-b} \\text{ for distinct linear factors}",
      "\\frac{A}{x-a} + \\frac{B}{(x-a)^2} \\text{ for repeated factors}",
      "\\text{Midpoint Rule: } \\Delta x \\sum f(\\bar{x}_i)",
      "\\text{Trapezoidal Rule: } \\frac{\\Delta x}{2}[f(x_0) + 2f(x_1) + \\cdots + f(x_n)]",
      "\\text{Simpson's Rule: } \\frac{\\Delta x}{3}[f(x_0) + 4f(x_1) + 2f(x_2) + \\cdots + f(x_n)]"
    ],
    applications: [
      "Circuit analysis with transfer functions",
      "Signal processing and Laplace transforms",
      "Approximate solutions when exact integration is impossible",
      "Error analysis in numerical computations"
    ]
  },
  {
    id: 3,
    title: "IMPROPER INTEGRALS & APPLICATIONS",
    concepts: [
      "Improper integrals with infinite limits",
      "Improper integrals with discontinuous integrands",
      "Convergence and divergence tests",
      "Comparison tests for improper integrals"
    ],
    conceptDescriptions: [
      "Improper integrals with infinite limits ask: 'What happens when we integrate forever?' We use limits to see if the area approaches a finite value (converges) or grows without bound (diverges). It's like asking if an infinite process has a finite result.",
      "When a function has a vertical asymptote (like 1/x at x=0), the integral becomes improper. We approach the problematic point with a limit, like tiptoeing up to a cliff edge to see if we can still calculate a meaningful area.",
      "Convergence tests help us determine if an improper integral has a finite value without actually computing it. It's like being able to predict the end of a movie from the first few scenes - we can often tell the behavior without doing all the work.",
      "Comparison tests use the idea that if one function is always bigger than another, and the bigger one converges, then the smaller one must also converge. It's like saying if the taller person can fit through a door, the shorter person definitely can too."
    ],
    formulas: [
      "\\int_a^{\\infty} f(x) \\, dx = \\lim_{t \\to \\infty} \\int_a^t f(x) \\, dx",
      "\\int_a^b f(x) \\, dx \\text{ where } f \\text{ has discontinuity at } c \\in [a,b]",
      "A = \\int_a^b [f(x) - g(x)] \\, dx \\text{ (area between curves)}",
      "V = \\pi \\int_a^b [f(x)]^2 \\, dx \\text{ (volume by disks)}",
      "V = 2\\pi \\int_a^b x \\cdot f(x) \\, dx \\text{ (volume by shells)}",
      "L = \\int_a^b \\sqrt{1 + [f'(x)]^2} \\, dx \\text{ (arc length)}"
    ],
    applications: [
      "Probability density functions and infinite domains",
      "Physics problems with infinite regions",
      "Surface area calculations for revolution solids",
      "Center of mass and moment calculations"
    ]
  },
  {
    id: 4,
    title: "SEQUENCES AND SERIES FUNDAMENTALS",
    concepts: [
      "Sequences and their limits",
      "Infinite series as sums of sequences",
      "Geometric series and their convergence",
      "Telescoping series",
      "The nth-term test for divergence"
    ],
    conceptDescriptions: [
      "A sequence is like a numbered list: a₁, a₂, a₃, ... Each term has a position and a value. The limit asks: 'Where is this list heading?' If the terms get closer and closer to a specific number, that's the limit.",
      "An infinite series is what happens when you try to add up all terms of a sequence. It's like asking: 'If I keep adding forever, do I get a finite total?' This seems impossible, but sometimes it works!",
      "Geometric series are the simplest infinite series: a + ar + ar² + ar³ + ... If |r| < 1, the terms get smaller and smaller, and the sum approaches a/(1-r). It's like folding a paper in half repeatedly - you approach zero thickness.",
      "Telescoping series are clever - most terms cancel out, leaving only a few. It's like a collapsible telescope where the middle sections disappear, leaving just the ends. The sum becomes surprisingly simple.",
      "The nth-term test is a quick check: if the terms of a series don't approach zero, the series definitely diverges. It's like saying 'if you keep adding non-zero amounts forever, you'll get infinity.' But be careful - terms approaching zero doesn't guarantee convergence!"
    ],
    formulas: [
      "a_n = f(n) \\text{ for sequence definition}",
      "\\lim_{n \\to \\infty} a_n = L \\text{ for sequence convergence}",
      "\\sum_{n=1}^{\\infty} ar^{n-1} = \\frac{a}{1-r} \\text{ if } |r| < 1",
      "\\sum_{n=1}^{\\infty} [a_n - a_{n+1}] \\text{ telescoping sum}",
      "\\text{If } \\lim_{n \\to \\infty} a_n \\neq 0, \\text{ then } \\sum a_n \\text{ diverges}"
    ],
    applications: [
      "Population growth models with discrete time steps",
      "Financial calculations with compound interest",
      "Computer science algorithms with recursive structures",
      "Engineering systems with iterative processes"
    ]
  },
  {
    id: 5,
    title: "CONVERGENCE TESTS FOR SERIES",
    concepts: [
      "Integral Test - comparing series to improper integrals",
      "Comparison Tests - direct and limit comparison",
      "Alternating Series Test - for series with alternating signs",
      "Ratio Test - excellent for factorials and exponentials",
      "Root Test - useful for nth powers"
    ],
    conceptDescriptions: [
      "The Integral Test connects series to integrals. If you can integrate a function, you can often determine if the corresponding series converges. It's like using a continuous process to understand a discrete one - if the integral converges, so does the series.",
      "Comparison tests use the buddy system. If you have a series that's hard to analyze, compare it to one you understand. If your series is smaller than a convergent one, it converges too. If it's bigger than a divergent one, it diverges.",
      "The Alternating Series Test works for series that flip signs: + - + - ... If the terms decrease in absolute value and approach zero, the series converges. It's like a pendulum that swings smaller and smaller until it stops.",
      "The Ratio Test looks at how consecutive terms relate: |aₙ₊₁/aₙ|. If this ratio approaches something less than 1, terms shrink fast enough for convergence. It's perfect for factorials (n!) and exponentials because these grow predictably.",
      "The Root Test examines the nth root of the nth term: ⁿ√|aₙ|. If this approaches something less than 1, the series converges. It's especially useful when terms involve nth powers, like aⁿ or (something)ⁿ."
    ],
    formulas: [
      "\\text{Integral Test: } \\int_1^{\\infty} f(x) \\, dx \\text{ and } \\sum f(n) \\text{ have same convergence}",
      "\\text{Direct Comparison: } 0 \\leq a_n \\leq b_n, \\sum b_n \\text{ converges} \\Rightarrow \\sum a_n \\text{ converges}",
      "\\text{Limit Comparison: } \\lim \\frac{a_n}{b_n} = L > 0, \\text{ same convergence behavior}",
      "\\text{Ratio Test: } \\rho = \\lim \\left|\\frac{a_{n+1}}{a_n}\\right|, \\text{ converges if } \\rho < 1",
      "\\text{Root Test: } \\rho = \\lim |a_n|^{1/n}, \\text{ converges if } \\rho < 1",
      "\\text{Alternating: } \\sum (-1)^n b_n \\text{ converges if } b_n \\downarrow 0"
    ],
    applications: [
      "Error analysis in numerical methods",
      "Convergence of power series in differential equations",
      "Signal analysis and Fourier series convergence",
      "Quality control in manufacturing processes"
    ]
  },
  {
    id: 6,
    title: "POWER SERIES & TAYLOR SERIES",
    concepts: [
      "Power series as infinite polynomials",
      "Radius and interval of convergence",
      "Taylor series centered at point a",
      "Maclaurin series (Taylor series centered at 0)",
      "Common power series representations"
    ],
    conceptDescriptions: [
      "Power series are like infinite polynomials: c₀ + c₁x + c₂x² + c₃x³ + ... They let us represent complicated functions as simple addition and multiplication. It's like describing a complex curve using only basic operations.",
      "Every power series has a radius of convergence - a distance from the center where it works. Inside this radius, the series converges; outside, it diverges. Think of it as a circle of validity around the center point.",
      "Taylor series represent any smooth function as a power series centered at point a. It uses the function's value and all its derivatives at that point to build the series. It's like using a function's 'DNA' at one point to reconstruct the entire function.",
      "Maclaurin series are Taylor series centered at 0, making them especially clean. Many common functions like eˣ, sin(x), and cos(x) have beautiful Maclaurin series that are easy to remember and use.",
      "Memorizing key power series (eˣ, sin(x), cos(x), 1/(1-x)) is like having a mathematical vocabulary. These building blocks can be combined and modified to represent many other functions."
    ],
    formulas: [
      "\\sum_{n=0}^{\\infty} c_n(x-a)^n \\text{ power series form}",
      "R = \\frac{1}{\\lim |c_{n+1}/c_n|} \\text{ radius of convergence}",
      "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n \\text{ Taylor series}",
      "e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}",
      "\\sin(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}",
      "\\cos(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!}"
    ],
    applications: [
      "Approximation of transcendental functions",
      "Computer algorithms for function evaluation",
      "Differential equations with series solutions",
      "Physics modeling with infinite precision"
    ]
  },
  {
    id: 7,
    title: "PARAMETRIC EQUATIONS & POLAR COORDINATES",
    concepts: [
      "Parametric equations x = f(t), y = g(t)",
      "Parametric derivatives and arc length",
      "Polar coordinate system (r, θ)",
      "Converting between Cartesian and polar",
      "Polar graphs and their properties"
    ],
    conceptDescriptions: [
      "Parametric equations describe motion by giving x and y as functions of time t. Instead of y = f(x), we have x = f(t) and y = g(t). It's like having a GPS tracker that records both horizontal and vertical position over time.",
      "Parametric derivatives use the chain rule: dy/dx = (dy/dt)/(dx/dt). We're asking 'how does y change with respect to x' when both depend on t. Arc length adds up all the tiny distance elements along the curve.",
      "Polar coordinates use distance and angle (r, θ) instead of x and y. It's like giving directions by saying 'go 5 miles northeast' instead of 'go 3 miles east, then 4 miles north.' Some curves are much simpler in polar form.",
      "Converting between coordinate systems is like translating between languages. x = r·cos(θ) and y = r·sin(θ) translate from polar to Cartesian, while r = √(x²+y²) and θ = arctan(y/x) go the other way.",
      "Polar graphs create beautiful patterns like roses, cardioids, and spirals. The equation r = f(θ) directly tells you how far from the origin to go at each angle, creating curves that would be very complex in Cartesian coordinates."
    ],
    formulas: [
      "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} \\text{ parametric derivative}",
      "L = \\int \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2} \\, dt \\text{ parametric arc length}",
      "x = r\\cos(\\theta), \\quad y = r\\sin(\\theta) \\text{ polar to Cartesian}",
      "r^2 = x^2 + y^2, \\quad \\theta = \\arctan\\left(\\frac{y}{x}\\right) \\text{ Cartesian to polar}",
      "A = \\frac{1}{2} \\int r^2 \\, d\\theta \\text{ polar area}",
      "ds = \\sqrt{r^2 + \\left(\\frac{dr}{d\\theta}\\right)^2} \\, d\\theta \\text{ polar arc length}"
    ],
    applications: [
      "Projectile motion and trajectory analysis",
      "Mechanical engineering cam design",
      "Computer graphics and animation",
      "Robotics path planning and control"
    ]
  },
  {
    id: 8,
    title: "INTERACTIVE VISUALIZATION DASHBOARD",
    concepts: [
      "Comprehensive concept mapping",
      "Interactive formula exploration",
      "Integration technique decision trees",
      "Series convergence test selector",
      "Dynamic graphing capabilities"
    ],
    conceptDescriptions: [
      "Concept mapping shows how all calculus ideas connect. Integration by parts relates to the product rule, series connect to integrals through the integral test, and parametric equations generalize function graphs. It's like seeing the family tree of mathematical concepts.",
      "Interactive formulas let you manipulate parameters and see immediate results. Change the 'a' in ∫u dv and watch how the solution changes. It's like having a mathematical laboratory where you can experiment safely.",
      "Decision trees help you choose the right integration technique. Is there a product? Try integration by parts. Square roots? Consider trig substitution. Rational function? Use partial fractions. It's like having a GPS for problem-solving.",
      "The convergence test selector analyzes your series and suggests the best test. Factorials suggest the ratio test, alternating signs suggest the alternating series test. It's like having an expert advisor for every problem.",
      "Dynamic graphing brings equations to life. Watch a Taylor series converge to its function as you add more terms. See how changing parameters affects polar curves. Mathematics becomes visual and intuitive."
    ],
    formulas: [
      "\\text{Interactive } \\int u \\, dv = uv - \\int v \\, du \\text{ demonstrations}",
      "\\text{Dynamic } \\sum \\text{ convergence test comparisons}",
      "\\text{Live polar equation plotting: } r = f(\\theta)",
      "\\text{Parametric curve visualization: } (x(t), y(t))",
      "\\text{Power series convergence radius calculator}"
    ],
    applications: [
      "Visual learning reinforcement",
      "Problem-solving strategy selection",
      "Concept relationship mapping",
      "Interactive practice and exploration",
      "Real-time mathematical visualization"
    ]
  }
];