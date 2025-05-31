'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MicrophoneIcon, StopIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface VoiceAssistantProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  onListeningChange: (isListening: boolean) => void;
  assistantMessage: string;
}

// Add type definitions for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default function VoiceAssistant({ onTranscript, isListening, onListeningChange, assistantMessage }: VoiceAssistantProps) {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [textInput, setTextInput] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setUserMessage(transcript);
          if (event.results[event.resultIndex].isFinal) {
            onTranscript(transcript);
            setUserMessage('');
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          onListeningChange(false);
        };

        setRecognition(recognition);
      }

      // Initialize speech synthesis
      if ('speechSynthesis' in window) {
        setSynthesis(window.speechSynthesis);
      }
    }
  }, [onTranscript, onListeningChange]);

  useEffect(() => {
    if (synthesis && assistantMessage) {
      const utterance = new SpeechSynthesisUtterance(assistantMessage);
      utterance.rate = 1;
      utterance.pitch = 1;
      synthesis.speak(utterance);
    }
  }, [assistantMessage, synthesis]);

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    onListeningChange(!isListening);
  }, [recognition, isListening, onListeningChange]);

  const handleSend = () => {
    if (textInput.trim()) {
      onTranscript(textInput.trim());
      setUserMessage(textInput.trim());
      setTextInput('');
    }
  };

  useEffect(() => {
    if (inputMode === 'text' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-6 max-w-md w-full border border-gray-200 backdrop-blur-md">
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            <span>AI</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 text-base font-medium leading-relaxed animate-fade-in">
              {assistantMessage}
            </p>
            {userMessage && (
              <div className="mt-2 text-right">
                <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-xl text-sm font-semibold shadow-sm animate-fade-in">
                  {userMessage}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button
            className={`transition-colors px-3 py-1 rounded-lg text-sm font-semibold border ${inputMode === 'voice' ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            onClick={() => setInputMode('voice')}
            aria-label="Voice input mode"
          >
            Voice
          </button>
          <button
            className={`transition-colors px-3 py-1 rounded-lg text-sm font-semibold border ${inputMode === 'text' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            onClick={() => setInputMode('text')}
            aria-label="Text input mode"
          >
            Text
          </button>
        </div>
        <div className="mt-3">
          {inputMode === 'voice' ? (
            <button
              onClick={toggleListening}
              className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-colors duration-200 border-4 ${isListening ? 'bg-red-500 border-red-300 animate-pulse' : 'bg-teal-500 border-teal-300 hover:bg-teal-600'} text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 mx-auto`}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isListening ? (
                <StopIcon className="h-7 w-7" />
              ) : (
                <MicrophoneIcon className="h-7 w-7" />
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-800 bg-white shadow-sm transition-all"
                placeholder="Type your answer..."
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                aria-label="Type your answer"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
                aria-label="Send answer"
              >
                <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 