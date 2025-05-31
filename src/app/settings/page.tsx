import { BellIcon, KeyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const settings = [
  {
    name: 'Account',
    description: 'Manage your account settings and preferences',
    icon: ShieldCheckIcon,
    items: [
      {
        name: 'Email Notifications',
        description: 'Receive email notifications about your learning progress',
        enabled: true,
      },
      {
        name: 'Push Notifications',
        description: 'Receive push notifications for new content and updates',
        enabled: false,
      },
      {
        name: 'Learning Reminders',
        description: 'Get daily reminders to continue your learning journey',
        enabled: true,
      },
    ],
  },
  {
    name: 'Security',
    description: 'Manage your security settings and password',
    icon: KeyIcon,
    items: [
      {
        name: 'Two-Factor Authentication',
        description: 'Add an extra layer of security to your account',
        enabled: false,
      },
      {
        name: 'Password Change',
        description: 'Change your account password',
        enabled: true,
      },
    ],
  },
  {
    name: 'Notifications',
    description: 'Configure how you receive notifications',
    icon: BellIcon,
    items: [
      {
        name: 'Course Updates',
        description: 'Get notified about new content in your enrolled courses',
        enabled: true,
      },
      {
        name: 'Achievement Alerts',
        description: 'Receive notifications when you earn achievements',
        enabled: true,
      },
      {
        name: 'Community Updates',
        description: 'Stay informed about community activities and discussions',
        enabled: false,
      },
    ],
  },
];

export default function Settings() {
  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Settings</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mt-8 space-y-6">
            {settings.map((section) => (
              <div key={section.name} className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <section.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">{section.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <div className="ml-4">
                            <button
                              type="button"
                              className={`${
                                item.enabled
                                  ? 'bg-indigo-600'
                                  : 'bg-gray-200'
                              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                              role="switch"
                              aria-checked={item.enabled}
                            >
                              <span
                                aria-hidden="true"
                                className={`${
                                  item.enabled ? 'translate-x-5' : 'translate-x-0'
                                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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