'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const categoryIcons: Record<string, string> = {
  Science: '🧪',
  Commerce: '💼',
  Humanities: '🎨',
  Management: '📈',
  Law: '⚖️',
  Medical: '🩺',
  Paramedical: '🏥',
  Engineering: '🛠️',
  Polytechnic: '🔧',
  Architecture: '🏛️',
};

function parseCategories(recommendations: string) {
  // Try to split recommendations into categories based on keywords
  const categories = [
    { key: 'Science', label: 'Science Courses' },
    { key: 'Commerce', label: 'Commerce Courses' },
    { key: 'Humanities', label: 'Humanities Courses' },
    { key: 'Management', label: 'Management Courses' },
    { key: 'Law', label: 'Law Courses' },
    { key: 'Medical', label: 'Medical Courses' },
    { key: 'Paramedical', label: 'Paramedical Courses' },
    { key: 'Engineering', label: 'B.Tech Engineering' },
    { key: 'Polytechnic', label: 'Polytechnic' },
    { key: 'Architecture', label: 'Architecture' },
  ];
  const result: { label: string; icon: string; content: string }[] = [];
  categories.forEach(cat => {
    const regex = new RegExp(`${cat.label}.*?(?=\n[A-Z]|$)`, 'is');
    const match = recommendations.match(regex);
    if (match) {
      result.push({ label: cat.label, icon: categoryIcons[cat.key] || '', content: match[0].trim() });
    }
  });
  if (result.length === 0) {
    result.push({ label: 'Recommended Options', icon: '🌟', content: recommendations });
  }
  return result;
}

export default function CareerGuidePage() {
  const router = useRouter();
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [recommendations, setRecommendations] = useState('');
  const [parsed, setParsed] = useState<{ label: string; icon: string; content: string }[]>([]);

  useEffect(() => {
    const info = localStorage.getItem('careerdev_studentInfo');
    const rec = localStorage.getItem('careerdev_recommendations');
    if (!info || !rec) {
      router.push('/onboarding');
      return;
    }
    setStudentInfo(JSON.parse(info));
    setRecommendations(rec);
    setParsed(parseCategories(rec));
  }, [router]);

  if (!studentInfo) return null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#0f3443] via-[#34e89e] to-[#43cea2] relative overflow-hidden py-12">
      {/* Decorative shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-40 right-0 w-[32rem] h-[32rem] bg-cyan-400 opacity-20 rounded-full blur-3xl z-0" />
      <div className="w-full max-w-3xl mx-auto z-10">
        <div className="bg-white/95 rounded-3xl shadow-2xl border border-teal-200 p-10 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-teal-700 mb-2 text-center drop-shadow">Your Personalized Career Guide</h2>
          <p className="text-teal-500 text-lg font-medium mb-6 text-center">Here's a summary of your profile and tailored suggestions for your future!</p>
          {/* Student Info Card */}
          <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-6 mb-8 border border-teal-200 shadow">
            <h3 className="text-xl font-bold text-teal-700 mb-2">Your Profile</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-800">
              <div><span className="font-semibold text-teal-600">Name:</span> {studentInfo.name}</div>
              <div><span className="font-semibold text-teal-600">Age/DOB:</span> {studentInfo.dateOfBirth}</div>
              <div><span className="font-semibold text-teal-600">Gender:</span> {studentInfo.gender}</div>
              <div><span className="font-semibold text-teal-600">12th Stream:</span> {studentInfo.stream}</div>
              <div className="col-span-2"><span className="font-semibold text-teal-600">Interests:</span> {studentInfo.subjects?.join(', ')}</div>
            </div>
          </div>
          {/* Recommendations */}
          <div className="w-full">
            <h3 className="text-2xl font-bold text-teal-700 mb-4">Recommended Streams & Courses</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {parsed.map((cat, idx) => (
                <div key={cat.label + idx} className="bg-white rounded-xl border border-teal-100 shadow p-6 flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{cat.icon}</span>
                    <span className="font-bold text-teal-700 text-lg">{cat.label}</span>
                  </div>
                  <div className="text-gray-800 whitespace-pre-line text-sm">{cat.content}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Extra Value Section */}
          <div className="w-full mt-10">
            <h3 className="text-xl font-bold text-teal-700 mb-2">Why these options?</h3>
            <p className="text-gray-700 mb-4">These courses and streams are recommended based on your background and interests. They offer strong career prospects and align with your academic strengths.</p>
            <h3 className="text-xl font-bold text-teal-700 mb-2">Example Career Paths</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Research & Academia</li>
              <li>Corporate & Business Roles</li>
              <li>Entrepreneurship</li>
              <li>Public Sector & Government</li>
              <li>Creative & Media Industries</li>
              <li>Healthcare & Paramedical</li>
              <li>Engineering & Technology</li>
              <li>Law & Civil Services</li>
            </ul>
            <h3 className="text-xl font-bold text-teal-700 mb-2">Next Steps</h3>
            <ol className="list-decimal list-inside text-gray-700 mb-4">
              <li>Research colleges and entrance requirements for your chosen streams.</li>
              <li>Talk to a career counselor or mentor for personalized advice.</li>
              <li>Explore internships, workshops, or online courses in your areas of interest.</li>
              <li>Prepare for entrance exams or applications as needed.</li>
            </ol>
            <div className="flex gap-4 mt-6">
              <button
                className="rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2 text-white font-bold shadow hover:from-teal-600 hover:to-cyan-600 transition-colors"
                onClick={() => window.print()}
              >
                Download/Print Guide
              </button>
              <button
                className="rounded-lg border border-teal-400 px-6 py-2 text-teal-700 font-bold shadow hover:bg-teal-50 transition-colors"
                onClick={() => router.push('/onboarding')}
              >
                Start Over
              </button>
              <button
                className="rounded-lg border border-blue-400 px-6 py-2 text-blue-700 font-bold shadow hover:bg-blue-50 transition-colors"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 