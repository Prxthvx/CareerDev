'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { getNextQuestion, getInitialQuestion, type ConversationState } from '@/services/ai';

interface StudentInfo {
  name: string;
  dateOfBirth: string;
  gender: string;
  stream: string;
  subjects: string[];
}

const streams = ['Science', 'Commerce', 'Arts', 'Humanities'];
const subjects = {
  Science: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'],
  Commerce: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
  Arts: ['History', 'Political Science', 'Geography', 'Economics', 'Sociology', 'Psychology'],
  Humanities: ['History', 'Political Science', 'Geography', 'Economics', 'Sociology', 'Psychology'],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState(getInitialQuestion());
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    dateOfBirth: '',
    gender: '',
    stream: '',
    subjects: [],
  });
  const [inputValue, setInputValue] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<string>('');
  const lastSpokenMessageRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper to determine which field is currently being filled
  const getCurrentField = () => {
    if (!studentInfo.name) return 'name';
    if (!studentInfo.dateOfBirth) return 'dateOfBirth';
    if (!studentInfo.gender) return 'gender';
    if (!studentInfo.stream) return 'stream';
    if (studentInfo.subjects.length === 0) return 'subjects';
    return null;
  };
  const currentField = getCurrentField();

  // Map field to label and placeholder
  const fieldMeta: Record<string, { label: string; placeholder: string }> = {
    name: { label: 'Name', placeholder: 'Enter your name' },
    dateOfBirth: { label: 'Date of Birth', placeholder: 'DD/MM/YYYY or Age' },
    gender: { label: 'Gender', placeholder: 'Male, Female, or Other' },
    stream: { label: 'Stream in 12th', placeholder: 'Science, Commerce, Arts, or Humanities' },
    subjects: { label: 'Subjects of Interest', placeholder: 'E.g. Computer Science, Economics' },
  };

  // Get value for a field
  const getFieldValue = (field: string) => {
    if (field === 'subjects') return studentInfo.subjects.join(', ');
    return (studentInfo as any)[field] || '';
  };

  // Handle text input change only for the current field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle submit for the current field
  const handleCurrentFieldSubmit = async () => {
    if (!currentField) return;
    let updated = false;
    if (currentField === 'name') {
      setStudentInfo(prev => ({ ...prev, name: inputValue }));
      updated = true;
    } else if (currentField === 'dateOfBirth') {
      setStudentInfo(prev => ({ ...prev, dateOfBirth: inputValue }));
      updated = true;
    } else if (currentField === 'gender') {
      setStudentInfo(prev => ({ ...prev, gender: inputValue }));
      updated = true;
    } else if (currentField === 'stream') {
      setStudentInfo(prev => ({ ...prev, stream: inputValue }));
      updated = true;
    } else if (currentField === 'subjects') {
      const subjectsArr = inputValue.split(',').map(s => s.trim()).filter(Boolean);
      setStudentInfo(prev => ({ ...prev, subjects: subjectsArr }));
      updated = true;
    }
    setInputValue('');
    if (updated) {
      const allFilled = studentInfo.name && studentInfo.dateOfBirth && studentInfo.gender && studentInfo.stream && (studentInfo.subjects.length > 0 || (currentField === 'subjects' && inputValue.length > 0));
      if (allFilled || (currentField === 'subjects' && inputValue.length > 0)) {
        setLoading(true);
        const state = {
          step,
          studentInfo: {
            ...studentInfo,
            ...(currentField === 'subjects' ? { subjects: inputValue.split(',').map(s => s.trim()).filter(Boolean) } : {}),
          },
        };
        const rec = await getNextQuestion(state, inputValue);
        // Save to localStorage for the next page
        localStorage.setItem('careerdev_studentInfo', JSON.stringify(state.studentInfo));
        localStorage.setItem('careerdev_recommendations', rec);
        setTimeout(() => {
          router.push('/career-guide');
        }, 800);
      } else {
        const state = { step, studentInfo: { ...studentInfo, ...(currentField === 'subjects' ? { subjects: inputValue.split(',').map(s => s.trim()).filter(Boolean) } : {}) } };
        const nextQ = await getNextQuestion(state, inputValue);
        setAssistantMessage(nextQ);
      }
    }
  };

  // When the current field changes, clear inputValue
  useEffect(() => {
    setInputValue('');
  }, [currentField]);

  // Handle voice transcript
  const handleTranscript = async (transcript: string) => {
    if (!transcript.trim()) return;
    setInputValue(transcript);
    await handleCurrentFieldSubmit();
  };

  // Speak the assistant's message aloud when it changes
  useEffect(() => {
    if (typeof window === 'undefined' || !assistantMessage || isMuted) return;
    const synth = window.speechSynthesis;
    let speakTimeout: NodeJS.Timeout | null = null;

    // Prevent double-speaking the same message
    if (lastSpokenMessageRef.current === assistantMessage) return;
    lastSpokenMessageRef.current = assistantMessage;
    console.log('[Speech] Speaking:', assistantMessage);

    function getFemaleVoice() {
      const voices = synth.getVoices();
      return (
        voices.find(v =>
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('woman') ||
          v.name.toLowerCase().includes('zira')
        ) ||
        voices.find(v => v.name.toLowerCase().includes('susan')) ||
        voices.find(v => v.name.toLowerCase().includes('samantha')) ||
        voices.find(v => v.name.toLowerCase().includes('eva')) ||
        voices.find(v => v.name.toLowerCase().includes('karen')) ||
        voices[0]
      );
    }

    function speakWithFemaleVoice() {
      synth.cancel(); // Always cancel before speaking
      const selectedVoice = getFemaleVoice();
      const sentences = assistantMessage.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [assistantMessage];
      let idx = 0;
      function speakNext() {
        if (idx >= sentences.length) return;
        const utter = new SpeechSynthesisUtterance(sentences[idx].trim());
        utter.voice = selectedVoice || null;
        utter.rate = 1.18;
        utter.pitch = 1.05;
        utter.onend = () => {
          idx++;
          setTimeout(speakNext, 150);
        };
        synth.speak(utter);
      }
      speakNext();
    }

    // If voices are not loaded yet, wait for them
    if (synth.getVoices().length === 0) {
      const handleVoicesChanged = () => {
        speakWithFemaleVoice();
        synth.removeEventListener('voiceschanged', handleVoicesChanged);
      };
      synth.addEventListener('voiceschanged', handleVoicesChanged);
      // In case voices are loaded very soon
      speakTimeout = setTimeout(() => {
        if (synth.getVoices().length > 0) {
          handleVoicesChanged();
        }
      }, 200);
    } else {
      // Debounce speaking to avoid rapid double triggers
      speakTimeout = setTimeout(() => {
        speakWithFemaleVoice();
      }, 100);
    }
    return () => {
      if (speakTimeout) clearTimeout(speakTimeout);
    };
  }, [assistantMessage, isMuted]);

  // Themed background
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-[#0f3443] via-[#34e89e] to-[#43cea2] relative overflow-hidden">
      {/* Decorative tealish shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-40 right-0 w-[32rem] h-[32rem] bg-cyan-400 opacity-20 rounded-full blur-3xl z-0" />
      {/* Mute/Unmute button at top-right */}
      <button
        className="absolute top-6 right-8 z-50 bg-white/80 rounded-full p-2 shadow border border-teal-200 hover:bg-teal-50 transition-colors"
        onClick={() => setIsMuted(m => !m)}
        aria-label={isMuted ? 'Unmute assistant' : 'Mute assistant'}
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="h-6 w-6 text-teal-600" />
        ) : (
          <SpeakerWaveIcon className="h-6 w-6 text-teal-600" />
        )}
      </button>
      <div className="w-full max-w-xl mx-auto mt-12 mb-8 z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border border-teal-200 p-10 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-teal-700 mb-2 text-center drop-shadow">Let's Get to Know You</h2>
          <p className="text-teal-500 text-lg font-medium mb-6 text-center">{assistantMessage}</p>
          <div className="w-full space-y-6">
            {/* Show summary for all fields, input only for current field */}
            {['name', 'dateOfBirth', 'gender', 'stream', 'subjects'].map(field => (
              <div key={field}>
                <label className="block text-sm font-semibold text-teal-700 mb-1">{fieldMeta[field].label}</label>
                {currentField === field && !loading ? (
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-gray-800 bg-teal-50 shadow-sm transition-all"
                    placeholder={fieldMeta[field].placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={e => { if (e.key === 'Enter') handleCurrentFieldSubmit(); }}
                    autoFocus
                  />
                ) : (
                  <div className="w-full px-4 py-2 rounded-lg bg-teal-50 text-gray-700 border border-teal-100 min-h-[2.5rem]">{getFieldValue(field) || <span className="text-gray-400">Not provided</span>}</div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                <div className="text-teal-700 font-semibold text-lg">Generating your personalized career guide...</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Centered, large mic button for voice input */}
      {!showRecommendations && (
        <div className="flex flex-col items-center mt-2 z-10">
          <button
            onClick={() => setIsListening(l => !l)}
            className={`w-24 h-24 flex items-center justify-center rounded-full shadow-2xl border-8 border-teal-200 bg-gradient-to-br from-teal-400 to-teal-600 text-white text-4xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-300 ${isListening ? 'animate-pulse scale-110' : ''}`}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            <MicrophoneIcon className="h-16 w-16" />
          </button>
          <span className="mt-2 text-teal-700 font-semibold text-lg">{isListening ? 'Listening...' : 'Speak your answer'}</span>
        </div>
      )}
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="absolute left-0 top-0 opacity-10" style={{zIndex:0}}>
          <defs>
            <radialGradient id="bg1" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#fff" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg1)" />
        </svg>
      </div>
    </div>
  );
} 