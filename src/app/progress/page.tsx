import { ChartBarIcon, AcademicCapIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Learning Hours', value: '45', icon: ClockIcon },
  { name: 'Completed Modules', value: '12', icon: AcademicCapIcon },
  { name: 'Average Score', value: '85%', icon: ChartBarIcon },
  { name: 'Achievements', value: '5', icon: TrophyIcon },
];

const recentActivity = [
  {
    id: 1,
    type: 'Module Completed',
    title: 'React Hooks Deep Dive',
    date: '2 hours ago',
    score: 92,
  },
  {
    id: 2,
    type: 'Quiz Completed',
    title: 'JavaScript Fundamentals',
    date: '1 day ago',
    score: 88,
  },
  {
    id: 3,
    type: 'Project Submitted',
    title: 'E-commerce Dashboard',
    date: '2 days ago',
    score: 95,
  },
];

export default function Progress() {
  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Progress</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-indigo-500 p-3">
                      <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </dd>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h2>
            <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="truncate text-sm font-medium text-indigo-600">{activity.type}</p>
                          <p className="ml-2 flex-shrink-0 text-sm text-gray-500">{activity.date}</p>
                        </div>
                        <div className="ml-2 flex flex-shrink-0">
                          <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {activity.score}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">{activity.title}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Path Progress */}
          <div className="mt-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">Learning Path Progress</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Web Development Fundamentals</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Progress through the complete web development course</p>
                  </div>
                  <div className="mt-5">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                            Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-indigo-600">75%</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                        <div
                          style={{ width: '75%' }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 