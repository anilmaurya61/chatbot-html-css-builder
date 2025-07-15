'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [previewHTML, setPreviewHTML] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const handleDownload = () => {
  if (!previewHTML) return;

  const blob = new Blob([previewHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'landing-page.html'; // Download as single HTML file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.content) {
        const updatedMessages = [...newMessages, { role: 'assistant', content: data.content }];
        setMessages(updatedMessages);
        const htmlMatch = data.content.match(/<html[\s\S]*<\/html>/i);
        const htmlCode = htmlMatch ? htmlMatch[0] : data.content;
        const injectedScript = `
          <script>
            document.addEventListener('DOMContentLoaded', function () {
              document.querySelectorAll('a[href="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  console.log('Navigation prevented for:', anchor.textContent);
                });
              });
            });
          </script>
        `;
        setPreviewHTML(htmlCode + injectedScript);
      } else {
        alert('Error: No content received from AI');
      }
    } catch (err) {
      console.error('API error:', err);
      alert('Failed to get response');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4 md:p-6 gap-4 md:gap-6 bg-[#121212] text-white">
      
      {/* Left Side: Chat Interface */}
      <div className="w-full lg:w-1/2 space-y-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-200">Chat Interface</h2>
        <div className="bg-[#1e1e1e] p-4 rounded-xl shadow h-[50vh] md:h-[65vh] lg:h-[75vh] overflow-y-auto border border-[#2e2e2e]">
          {messages.map((m, idx) => (
            <div key={idx} className="mb-4">
              <strong className="text-gray-400">{m.role === 'user' ? 'You' : 'Bot'}:</strong>
              <pre className="bg-[#2a2a2a] text-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
                {m.content}
              </pre>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            className="flex-1 bg-[#1e1e1e] border border-[#333] text-white rounded-xl p-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the page layout..."
            disabled={loading}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      {/* Right Side: Live Preview */}
      <div className="w-full lg:w-1/2">
        <div className="flex justify-between items-center pb-2">
            <h2 className="text-lg font-semibold text-gray-200">Live Preview</h2>
            <button
              onClick={handleDownload}
              disabled={!previewHTML}
              className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg transition disabled:opacity-50"
            >
              Download as HTML
            </button>
          </div>     
     <iframe
          className="border border-[#2e2e2e] w-full h-[50vh] md:h-[65vh] lg:h-[80vh] rounded-xl bg-[#1e1e1e]"
          srcDoc={previewHTML}
          sandbox="allow-same-origin allow-popups allow-forms allow-scripts"
          allow="clipboard-write"
          title="Live HTML Preview"
        />
      </div>
    </div>
  );
}
