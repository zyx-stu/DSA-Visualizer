import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language }) => {
  const languageMap = {
    python: 'python',
    javascript: 'javascript',
    cpp: 'cpp',
    java: 'java',
    go: 'go',
  };

  return (
    <div className="rounded-lg overflow-hidden border border-dark-700">
      <SyntaxHighlighter
        language={languageMap[language] || 'javascript'}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: '#1e293b',
          fontSize: '0.9rem',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
