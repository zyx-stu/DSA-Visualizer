import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const LANG_MAP = {
  python:     'python',
  javascript: 'javascript',
  cpp:        'cpp',
  java:       'java',
  go:         'go',
};

const LANG_LABELS = {
  python:     'Python',
  javascript: 'JavaScript',
  cpp:        'C++',
  java:       'Java',
  go:         'Go',
};

const CodeBlock = ({ codeSnippets = [] }) => {
  const [activeTab, setActiveTab] = useState(codeSnippets[0]?.language || 'python');
  const [copied, setCopied] = useState(false);

  const activeSnippet = codeSnippets.find((s) => s.language === activeTab) || codeSnippets[0];

  const handleCopy = async () => {
    if (!activeSnippet?.code) return;
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      toast.success('Code copied!', { duration: 1500 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  if (!codeSnippets.length) {
    return (
      <div className="code-block text-gray-500 text-sm">No code snippets available.</div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-dark-700">
      {/* Tab bar */}
      <div className="flex items-center justify-between bg-dark-800 px-4 border-b border-dark-700">
        <div className="flex">
          {codeSnippets.map((snippet) => (
            <button
              key={snippet.language}
              id={`code-tab-${snippet.language}`}
              onClick={() => setActiveTab(snippet.language)}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                activeTab === snippet.language
                  ? 'text-primary-400 border-primary-500'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              {LANG_LABELS[snippet.language] || snippet.language}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
            copied
              ? 'text-green-400 bg-green-500/10'
              : 'text-gray-400 hover:text-gray-200 hover:bg-dark-700'
          }`}
          id="code-copy-btn"
          aria-label="Copy code"
        >
          {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <div className="bg-[#1e1e2e] max-h-[500px] overflow-auto">
        <SyntaxHighlighter
          language={LANG_MAP[activeSnippet?.language] || 'text'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.25rem 1.5rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.7',
          }}
          showLineNumbers
          wrapLongLines={false}
        >
          {activeSnippet?.code || ''}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
