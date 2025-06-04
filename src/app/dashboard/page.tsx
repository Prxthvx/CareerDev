'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AcademicCapIcon, ChartBarIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [student, setStudent] = useState<any>(null);
  useEffect(() => {
    const info = localStorage.getItem('careerdev_studentInfo');
    if (info) setStudent(JSON.parse(info));
  }, []);
  const name = student?.name || 'Student';
  // Placeholder gamification data
  const badges = ['Beginner', 'Streak 7 Days'];
  const progress = 60;

  function calculatePoints() {
    let points = 0;
    // Skill assessment: 10 points per skill rated > 0
    const skills = JSON.parse(localStorage.getItem('careerdev_skillAssessment') || '[]');
    skills.forEach((cat: any) => cat.skills.forEach((s: any) => { if (s.level > 0) points += 10; }));
    // Learning paths: 20 points per path enrolled, +1 per % progress
    const paths = JSON.parse(localStorage.getItem('careerdev_learningPaths') || '[]');
    paths.forEach((p: any) => { if (p.isEnrolled) points += 20 + (p.progress || 0); });
    // Challenges: 30 points per completed
    const chals = JSON.parse(localStorage.getItem('careerdev_challenges') || '[]');
    chals.forEach((c: any) => { if (c.complete) points += 30; });
    return points;
  }
  const [points, setPoints] = useState(0);
  useEffect(() => { setPoints(calculatePoints()); }, []);
  const leaderboard = [
    { name: 'Aditi', points: 1450 },
    { name: 'Rahul', points: 1320 },
    { name: 'Student', points },
    { name: 'Priya', points: 1100 },
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#0f3443] via-[#34e89e] to-[#43cea2] relative overflow-hidden py-12">
      <div className="w-full max-w-4xl mx-auto z-10">
        <div className="bg-white/95 rounded-3xl shadow-2xl border border-teal-200 p-10 flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-teal-700 mb-2 text-center drop-shadow">Welcome back, {name}!</h2>
          <p className="text-teal-500 text-lg font-medium mb-6 text-center">Your personalized career dashboard</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-6 border border-teal-200 shadow flex flex-col items-center">
              <span className="font-bold text-2xl text-teal-700 mb-2">{points}</span>
              <span className="text-teal-600 font-medium">Points</span>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl p-6 border border-yellow-200 shadow flex flex-col items-center">
              <TrophyIcon className="h-8 w-8 text-yellow-500 mb-2" />
              <span className="text-yellow-700 font-medium">Badges</span>
              <div className="flex gap-2 mt-2">{badges.map(b => <span key={b} className="bg-yellow-200 text-yellow-800 rounded px-2 py-1 text-xs font-bold">{b}</span>)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded-2xl p-6 border border-blue-200 shadow flex flex-col items-center">
              <ChartBarIcon className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-blue-700 font-medium mb-1">Learning Path Progress</span>
              <div className="w-full bg-blue-200 rounded-full h-3 mt-2">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-xs text-blue-700 mt-1">{progress}% complete</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
            <Link href="/skills" className="flex flex-col items-center bg-white border border-teal-200 rounded-xl p-6 shadow hover:bg-teal-50 transition-colors">
              <AcademicCapIcon className="h-8 w-8 text-teal-500 mb-2" />
              <span className="font-bold text-teal-700">Skill Assessment</span>
              <span className="text-xs text-gray-500 mt-1">Test & improve your skills</span>
            </Link>
            <Link href="/learning-paths" className="flex flex-col items-center bg-white border border-blue-200 rounded-xl p-6 shadow hover:bg-blue-50 transition-colors">
              <ChartBarIcon className="h-8 w-8 text-blue-500 mb-2" />
              <span className="font-bold text-blue-700">Learning Paths</span>
              <span className="text-xs text-gray-500 mt-1">Personalized for you</span>
            </Link>
            <Link href="/challenges" className="flex flex-col items-center bg-white border border-yellow-200 rounded-xl p-6 shadow hover:bg-yellow-50 transition-colors">
              <TrophyIcon className="h-8 w-8 text-yellow-500 mb-2" />
              <span className="font-bold text-yellow-700">Challenges</span>
              <span className="text-xs text-gray-500 mt-1">Projects & practice</span>
            </Link>
          </div>
          <div className="w-full mt-10">
            <h3 className="text-xl font-bold text-teal-700 mb-2">Community & Support</h3>
            <div className="flex gap-4">
              <Link href="/community" className="rounded-lg border border-teal-400 px-6 py-2 text-teal-700 font-bold shadow hover:bg-teal-50 transition-colors flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-teal-500" /> Community Forum
              </Link>
              <Link href="/mentors" className="rounded-lg border border-blue-400 px-6 py-2 text-blue-700 font-bold shadow hover:bg-blue-50 transition-colors flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-blue-500" /> Find a Mentor
              </Link>
            </div>
          </div>
          <div className="w-full mt-8">
            <h3 className="text-lg font-bold text-indigo-700 mb-2">Leaderboard</h3>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col gap-2">
              {leaderboard.map((u, i) => (
                <div key={u.name} className={`flex justify-between items-center ${u.name === 'Student' ? 'font-bold text-indigo-700' : 'text-gray-700'}`}> <span>{i + 1}. {u.name}</span> <span>{u.points} pts</span> </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 