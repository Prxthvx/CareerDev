import { AcademicCapIcon } from '@heroicons/react/24/outline';

const mentors = [
  { name: 'Dr. Asha Sharma', expertise: 'Engineering & Tech' },
  { name: 'Mr. Rajiv Menon', expertise: 'Commerce & Management' },
  { name: 'Ms. Priya Nair', expertise: 'Humanities & Social Sciences' },
];

export default function MentorsPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#0f3443] via-[#34e89e] to-[#43cea2] relative overflow-hidden py-12">
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="bg-white/95 rounded-3xl shadow-2xl border border-teal-200 p-10 flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-teal-700 mb-2 text-center drop-shadow">Find a Mentor</h2>
          <p className="text-teal-500 text-lg font-medium mb-6 text-center">Connect with experienced mentors for personalized guidance!</p>
          <div className="w-full space-y-4">
            {mentors.map((m, i) => (
              <div key={m.name} className="flex items-center justify-between bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-4 border border-teal-200 shadow">
                <div className="flex items-center gap-3">
                  <AcademicCapIcon className="h-6 w-6 text-blue-500" />
                  <span className="font-bold text-teal-700">{m.name}</span>
                  <span className="text-xs text-gray-600 ml-2">{m.expertise}</span>
                </div>
                <button className="rounded bg-blue-500 text-white px-4 py-1 font-bold hover:bg-blue-600 transition-colors">Request Session</button>
              </div>
            ))}
          </div>
          <div className="w-full mt-8 text-center text-gray-500 text-sm">Mentor chat and booking features coming soon!</div>
        </div>
      </div>
    </div>
  );
} 