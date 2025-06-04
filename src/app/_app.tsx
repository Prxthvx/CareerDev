import { useState, createContext, useContext } from 'react';
import '../globals.css';

const AccessibilityContext = createContext<any>(null);
export function useAccessibility() { return useContext(AccessibilityContext); }

export default function App({ Component, pageProps }: any) {
  const [fontSize, setFontSize] = useState('text-base');
  const [theme, setTheme] = useState('light');
  const [showPanel, setShowPanel] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize, theme, setTheme, ttsEnabled, setTtsEnabled }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className={`min-h-screen ${fontSize}`}>
          <Component {...pageProps} />
          <button onClick={() => setShowPanel(v => !v)} className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700">A11y</button>
          {showPanel && (
            <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-900 border border-teal-200 rounded-xl shadow-lg p-6 w-72">
              <h3 className="font-bold text-teal-700 mb-2">Accessibility Settings</h3>
              <div className="mb-2">
                <label className="block text-sm font-semibold mb-1">Font Size</label>
                <select value={fontSize} onChange={e => setFontSize(e.target.value)} className="w-full rounded border p-1">
                  <option value="text-sm">Small</option>
                  <option value="text-base">Normal</option>
                  <option value="text-lg">Large</option>
                  <option value="text-xl">Extra Large</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold mb-1">Color Theme</label>
                <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full rounded border p-1">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold mb-1">Text-to-Speech</label>
                <input type="checkbox" checked={ttsEnabled} onChange={e => setTtsEnabled(e.target.checked)} className="mr-2" /> Enable TTS
              </div>
              <button onClick={() => setShowPanel(false)} className="mt-2 w-full rounded bg-teal-500 text-white py-2 font-bold hover:bg-teal-600">Close</button>
            </div>
          )}
        </div>
      </div>
    </AccessibilityContext.Provider>
  );
} 