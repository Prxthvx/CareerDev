import Link from 'next/link';
import { TrophyIcon } from '@heroicons/react/24/outline';

const challenges = [
  { title: 'Build a Portfolio Website', status: 'Not Started' },
  { title: 'Data Analysis Project', status: 'In Progress' },
  { title: 'Mock Interview', status: 'Not Started' },
];

export default function ChallengesPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#0f3443] via-[#34e89e] to-[#43cea2] relative overflow-hidden py-12">
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="bg-white/95 rounded-3xl shadow-2xl border border-teal-200 p-10 flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-teal-700 mb-2 text-center drop-shadow">Interactive Challenges</h2>
          <p className="text-teal-500 text-lg font-medium mb-6 text-center">Practice your skills with real-world projects and challenges!</p>
          <div className="w-full space-y-6">
            {challenges.map((c, i) => (
              <div key={c.title} className="flex items-center justify-between bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-6 border border-teal-200 shadow">
                <div className="flex items-center gap-3">
                  <TrophyIcon className="h-7 w-7 text-yellow-500" />
                  <span className="font-bold text-teal-700 text-lg">{c.title}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-semibold text-gray-600">{c.status}</span>
                  <button className="rounded bg-teal-500 text-white px-4 py-1 font-bold hover:bg-teal-600 transition-colors">{c.status === 'Not Started' ? 'Start' : 'Submit'}</button>
                </div>
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