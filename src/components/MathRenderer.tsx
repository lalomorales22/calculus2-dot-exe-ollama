import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function MathRenderer({ math, block = false, className = '' }: MathRendererProps) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: block,
    output: 'html',
    strict: false,
    trust: true,
    macros: {
      "\\RR": "\\mathbb{R}",
      "\\NN": "\\mathbb{N}",
      "\\ZZ": "\\mathbb{Z}",
      "\\QQ": "\\mathbb{Q}",
      "\\CC": "\\mathbb{C}",
      "\\dx": "\\,dx",
      "\\dy": "\\,dy",
      "\\dt": "\\,dt",
      "\\du": "\\,du",
      "\\dv": "\\,dv",
      "\\dr": "\\,dr",
      "\\dtheta": "\\,d\\theta"
    }
  });

  return (
    <span 
      className={`math-formula ${block ? 'block' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface FormulaBoxProps {
  formula: string;
  className?: string;
}

export function FormulaBox({ formula, className = '' }: FormulaBoxProps) {
  return (
    <div className={`formula-box retro-border border-green-400 bg-gray-900 py-4 px-3 my-2 ${className}`}>
      <MathRenderer math={formula} block={true} />
    </div>
  );
}

interface InlineFormulaProps {
  formula: string;
  className?: string;
}

export function InlineFormula({ formula, className = '' }: InlineFormulaProps) {
  return (
    <span className={`inline-formula ${className}`}>
      <MathRenderer math={formula} block={false} />
    </span>
  );
}