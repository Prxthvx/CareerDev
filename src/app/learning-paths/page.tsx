import { ClockIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const learningPaths = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    description: 'Master the basics of web development with HTML, CSS, and JavaScript. Learn to build responsive and interactive websites.',
    duration: '8 weeks',
    difficulty: 'Beginner',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    enrolled: 1234,
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    description: 'Deep dive into advanced React concepts, state management, and performance optimization techniques.',
    duration: '12 weeks',
    difficulty: 'Intermediate',
    skills: ['React', 'TypeScript', 'State Management', 'Performance'],
    enrolled: 856,
  },
  {
    id: 3,
    title: 'System Design Principles',
    description: 'Learn to design scalable and maintainable systems. Understand architecture patterns and best practices.',
    duration: '10 weeks',
    difficulty: 'Advanced',
    skills: ['Architecture', 'Scalability', 'Database Design', 'API Design'],
    enrolled: 567,
  },
  {
    id: 4,
    title: 'Full Stack Development',
    description: 'Comprehensive course covering both frontend and backend development with modern technologies.',
    duration: '16 weeks',
    difficulty: 'Intermediate',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    enrolled: 2345,
  },
];

export default function LearningPaths() {
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
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {learningPaths.map((path) => (
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
                  <div className="mt-6 flex flex-1 items-end">
                    <button
                      type="button"
                      className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 