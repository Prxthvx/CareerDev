'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrophyIcon } from '@heroicons/react/24/outline';

const defaultChallenges = [
  { title: 'Build a Portfolio Website', status: 'Not Started', complete: false, feedback: '' },
  { title: 'Data Analysis Project', status: 'In Progress', complete: false, feedback: '' },
  { title: 'Mock Interview', status: 'Not Started', complete: false, feedback: '' },
];

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState(defaultChallenges);
  useEffect(() => {
    const saved = localStorage.getItem('careerdev_challenges');
    if (saved) setChallenges(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('careerdev_challenges', JSON.stringify(challenges));
  }, [challenges]);

  const toggleComplete = (idx: number) => setChallenges(prev => prev.map((c, i) => i === idx ? { ...c, complete: !c.complete, status: !c.complete ? 'Completed' : 'Not Started' } : c));
  const setFeedback = (idx: number, val: string) => setChallenges(prev => prev.map((c, i) => i === idx ? { ...c, feedback: val } : c));
  const submitFeedback = (idx: number) => alert('Feedback submitted! (AI/peer feedback coming soon)');

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#0f3443] via-[#34e89e] to-[#43cea2] relative overflow-hidden py-12">
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="bg-white/95 rounded-3xl shadow-2xl border border-teal-200 p-10 flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-teal-700 mb-2 text-center drop-shadow">Interactive Challenges</h2>
          <p className="text-teal-500 text-lg font-medium mb-6 text-center">Practice your skills with real-world projects and challenges!</p>
          <div className="w-full space-y-6">
            {challenges.map((c, i) => (
              <div key={c.title} className="flex flex-col gap-2 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-6 border border-teal-200 shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrophyIcon className="h-7 w-7 text-yellow-500" />
                    <span className="font-bold text-teal-700 text-lg">{c.title}</span>
                    {c.complete && <span className="ml-2 px-2 py-0.5 bg-green-200 text-green-800 rounded-full text-xs font-bold">Completed</span>}
                  </div>
                  <button className={`rounded ${c.complete ? 'bg-gray-300 text-gray-500' : 'bg-teal-500 text-white'} px-4 py-1 font-bold hover:bg-teal-600 transition-colors`} onClick={() => toggleComplete(i)}>{c.complete ? 'Undo' : 'Mark Complete'}</button>
                </div>
                <textarea className="mt-2 w-full rounded border border-teal-200 p-2 text-gray-700" rows={2} placeholder="Submit your work or notes..." value={c.feedback} onChange={e => setFeedback(i, e.target.value)} disabled={c.complete} />
                <button className="self-end mt-2 rounded bg-blue-500 text-white px-4 py-1 font-bold hover:bg-blue-600 transition-colors" onClick={() => submitFeedback(i)} disabled={c.complete}>Submit for Feedback</button>
              </div>
            ))}
          </div>
          <div className="w-full mt-10">
            <h3 className="text-xl font-bold text-teal-700 mb-2">AI/Peer Feedback (Coming Soon)</h3>
            <p className="text-gray-700">Submit your work to get instant feedback from our AI or the community!</p>
          </div>
        </div>
      </div>
    </div>
  );
} 