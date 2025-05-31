'use client';
import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { getSkillAssessmentFeedback } from '@/services/ai';

const defaultSkillCategories = [
  {
    name: 'Frontend Development',
    skills: [
      { name: 'HTML', level: 0 },
      { name: 'CSS', level: 0 },
      { name: 'JavaScript', level: 0 },
      { name: 'React', level: 0 },
      { name: 'TypeScript', level: 0 },
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 0 },
      { name: 'Python', level: 0 },
      { name: 'SQL', level: 0 },
      { name: 'API Design', level: 0 },
      { name: 'Database Management', level: 0 },
    ],
  },
  {
    name: 'Soft Skills',
    skills: [
      { name: 'Communication', level: 0 },
      { name: 'Problem Solving', level: 0 },
      { name: 'Team Collaboration', level: 0 },
      { name: 'Time Management', level: 0 },
      { name: 'Leadership', level: 0 },
    ],
  },
];

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('careerdev_skillAssessment');
    if (saved) setSkillCategories(JSON.parse(saved));
  }, []);
  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('careerdev_skillAssessment', JSON.stringify(skillCategories));
  }, [skillCategories]);

  const setSkillLevel = (catIdx: number, skillIdx: number, level: number) => {
    setSkillCategories(prev => prev.map((cat, i) =>
      i === catIdx ? {
        ...cat,
        skills: cat.skills.map((s, j) => j === skillIdx ? { ...s, level } : s)
      } : cat
    ));
  };
  const resetAssessment = () => setSkillCategories(defaultSkillCategories);

  const saveAssessment = async () => {
    setLoading(true);
    setFeedback('');
    const fb = await getSkillAssessmentFeedback(skillCategories);
    setFeedback(fb);
    setLoading(false);
  };

  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Skills Assessment</h1>
          <p className="mt-2 text-sm text-gray-700">
            Evaluate your current skill levels to get personalized learning recommendations.
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mt-8 space-y-8">
            {skillCategories.map((category, catIdx) => (
              <div key={category.name} className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{category.name}</h3>
                  <div className="mt-4 space-y-4">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              type="button"
                              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => setSkillLevel(catIdx, skillIdx, level)}
                            >
                              <StarIcon
                                className={`h-6 w-6 ${level <= skill.level ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={saveAssessment}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Save Assessment'}
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={resetAssessment}
              disabled={loading}
            >
              Reset
            </button>
          </div>
          {loading && (
            <div className="mt-6 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
          )}
          {feedback && (
            <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-indigo-700 mb-2">AI Feedback & Recommendations</h3>
              <div className="whitespace-pre-line text-gray-800">{feedback}</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 