'use client';
import { useEffect, useState } from 'react';
import { ClockIcon, AcademicCapIcon, ChartBarIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getSkillAssessmentFeedback } from '@/services/ai';

const defaultLearningPaths = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    description: 'Master the basics of web development with HTML, CSS, and JavaScript. Learn to build responsive and interactive websites.',
    duration: '8 weeks',
    difficulty: 'Beginner',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    enrolled: 1234,
    progress: 0,
    isEnrolled: false,
    modules: [
      { name: 'HTML Basics', complete: false },
      { name: 'CSS Fundamentals', complete: false },
      { name: 'JavaScript Essentials', complete: false },
      { name: 'Responsive Design', complete: false },
    ],
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    description: 'Deep dive into advanced React concepts, state management, and performance optimization techniques.',
    duration: '12 weeks',
    difficulty: 'Intermediate',
    skills: ['React', 'TypeScript', 'State Management', 'Performance'],
    enrolled: 856,
    progress: 0,
    isEnrolled: false,
    modules: [
      { name: 'React Hooks', complete: false },
      { name: 'Context & State Management', complete: false },
      { name: 'Performance Optimization', complete: false },
      { name: 'TypeScript with React', complete: false },
    ],
  },
  {
    id: 3,
    title: 'System Design Principles',
    description: 'Learn to design scalable and maintainable systems. Understand architecture patterns and best practices.',
    duration: '10 weeks',
    difficulty: 'Advanced',
    skills: ['Architecture', 'Scalability', 'Database Design', 'API Design'],
    enrolled: 567,
    progress: 0,
    isEnrolled: false,
    modules: [
      { name: 'System Design Basics', complete: false },
      { name: 'Database Design', complete: false },
      { name: 'API Design', complete: false },
      { name: 'Scalability Patterns', complete: false },
    ],
  },
  {
    id: 4,
    title: 'Full Stack Development',
    description: 'Comprehensive course covering both frontend and backend development with modern technologies.',
    duration: '16 weeks',
    difficulty: 'Intermediate',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    enrolled: 2345,
    progress: 0,
    isEnrolled: false,
    modules: [
      { name: 'Frontend with React', complete: false },
      { name: 'Backend with Node.js', complete: false },
      { name: 'Databases with MongoDB', complete: false },
      { name: 'APIs with Express', complete: false },
    ],
  },
];

export default function LearningPaths() {
  const [paths, setPaths] = useState(defaultLearningPaths);
  const [showModal, setShowModal] = useState<number | null>(null);
  const [recommendedPathIds, setRecommendedPathIds] = useState<number[]>([]);
  const [recLoading, setRecLoading] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('careerdev_learningPaths');
    if (saved) setPaths(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('careerdev_learningPaths', JSON.stringify(paths));
  }, [paths]);

  useEffect(() => {
    async function fetchRecommendations() {
      setRecLoading(true);
      const skills = localStorage.getItem('careerdev_skillAssessment');
      if (skills) {
        const feedback = await getSkillAssessmentFeedback(JSON.parse(skills));
        // Simple extraction: highlight paths whose title or skills are mentioned in feedback
        const ids = paths.filter(p => feedback.toLowerCase().includes(p.title.toLowerCase()) || p.skills.some(s => feedback.toLowerCase().includes(s.toLowerCase()))).map(p => p.id);
        setRecommendedPathIds(ids);
      }
      setRecLoading(false);
    }
    fetchRecommendations();
    // eslint-disable-next-line
  }, []);

  const enroll = (id: number) => setPaths(prev => prev.map(p => p.id === id ? { ...p, isEnrolled: true, progress: 0 } : p));
  const unenroll = (id: number) => setPaths(prev => prev.map(p => p.id === id ? { ...p, isEnrolled: false, progress: 0, modules: p.modules.map(m => ({ ...m, complete: false })) } : p));
  const incrementProgress = (id: number) => setPaths(prev => prev.map(p => p.id === id && p.isEnrolled ? { ...p, progress: Math.min(100, p.progress + 20) } : p));
  const resetProgress = (id: number) => setPaths(prev => prev.map(p => p.id === id ? { ...p, progress: 0, modules: p.modules.map(m => ({ ...m, complete: false })) } : p));
  const toggleModule = (pathId: number, modIdx: number) => setPaths(prev => prev.map(p => p.id === pathId ? {
    ...p,
    modules: p.modules.map((m, i) => i === modIdx ? { ...m, complete: !m.complete } : m),
    progress: Math.round(100 * (p.modules.filter((m, i) => i === modIdx ? !m.complete : m.complete).length) / p.modules.length)
  } : p));

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Learning Paths</h1>
          <p className="mt-2 text-sm text-gray-700">
            Choose from our curated learning paths to advance your career.
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {recLoading && <div className="mb-4 text-blue-600">Analyzing your skills for recommendations...</div>}
          {recommendedPathIds.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 font-semibold">Recommended for you: {paths.filter(p => recommendedPathIds.includes(p.id)).map(p => p.title).join(', ')}</div>
          )}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {paths.map((path) => (
              <div
                key={path.id}
                className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
                  <p className="mt-3 text-sm text-gray-500">{path.description}</p>
                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ClockIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      {path.duration}
                    </div>
                    <div className="flex items-center">
                      <AcademicCapIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      {path.difficulty}
                    </div>
                    <div className="flex items-center">
                      <ChartBarIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      {path.enrolled} enrolled
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="text-xs text-blue-600 underline" onClick={() => setShowModal(path.id)}>View Details</button>
                  </div>
                  {path.isEnrolled && (
                    <div className="mt-4">
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${path.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-xs text-blue-700">
                        <span>Progress: {path.progress}%</span>
                        <button className="text-blue-500 underline" onClick={() => resetProgress(path.id)}>Reset Progress</button>
                      </div>
                    </div>
                  )}
                  <div className="mt-6 flex flex-1 items-end gap-2">
                    {!path.isEnrolled ? (
                      <button
                        type="button"
                        className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => enroll(path.id)}
                      >
                        Enroll Now
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          onClick={() => incrementProgress(path.id)}
                        >
                          Continue
                        </button>
                        <button
                          type="button"
                          className="rounded-md border border-red-300 px-3.5 py-2.5 text-sm font-semibold text-red-600 bg-white hover:bg-red-50"
                          onClick={() => unenroll(path.id)}
                        >
                          Unenroll
                        </button>
                      </>
                    )}
                  </div>
                  {recommendedPathIds.includes(path.id) && <span className="ml-2 px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs font-bold">Recommended for you</span>}
                </div>
                {showModal === path.id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                      <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={() => setShowModal(null)}><XMarkIcon className="h-6 w-6" /></button>
                      <h3 className="text-2xl font-bold text-teal-700 mb-4">{path.title} Modules</h3>
                      <ul className="space-y-3">
                        {path.modules.map((mod, i) => (
                          <li key={mod.name} className="flex items-center gap-3">
                            <button onClick={() => toggleModule(path.id, i)} className={`rounded-full border-2 ${mod.complete ? 'border-green-400 bg-green-100' : 'border-gray-300 bg-white'} p-2 focus:outline-none`}>
                              {mod.complete ? <CheckCircleIcon className="h-6 w-6 text-green-500" /> : <span className="block w-6 h-6 rounded-full border-2 border-gray-300"></span>}
                            </button>
                            <span className={mod.complete ? 'line-through text-gray-400' : 'text-gray-800'}>{mod.name}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex justify-end">
                        <button className="rounded bg-teal-500 text-white px-4 py-2 font-bold hover:bg-teal-600 transition-colors" onClick={() => setShowModal(null)}>Done</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 