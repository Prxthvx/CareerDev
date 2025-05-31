import { UserGroupIcon } from '@heroicons/react/24/outline';

const topics = [
  { title: 'How do I choose between BSc and BTech?', replies: 4 },
  { title: 'Best resources for learning Python?', replies: 7 },
  { title: 'Share your career journey!', replies: 2 },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#0f3443] via-[#34e89e] to-[#43cea2] relative overflow-hidden py-12">
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="bg-white/95 rounded-3xl shadow-2xl border border-teal-200 p-10 flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-teal-700 mb-2 text-center drop-shadow">Community Forum</h2>
          <p className="text-teal-500 text-lg font-medium mb-6 text-center">Ask questions, share experiences, and connect with peers!</p>
          <div className="w-full space-y-4">
            {topics.map((t, i) => (
              <div key={t.title} className="flex items-center justify-between bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-4 border border-teal-200 shadow">
                <div className="flex items-center gap-3">
                  <UserGroupIcon className="h-6 w-6 text-teal-500" />
                  <span className="font-bold text-teal-700">{t.title}</span>
                </div>
                <span className="text-xs text-gray-600">{t.replies} replies</span>
              </div>
            ))}
          </div>
          <button className="mt-8 rounded bg-teal-500 text-white px-6 py-2 font-bold hover:bg-teal-600 transition-colors">Start New Discussion</button>
          <div className="w-full mt-8 text-center text-gray-500 text-sm">More community features coming soon!</div>
        </div>
      </div>
    </div>
  );
} 