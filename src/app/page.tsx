'use client';

import Link from 'next/link';
import {
  ArrowRightIcon,
  ChartBarIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';
import Icon from '@/components/Icon';

const features = [
  {
    name: 'Personalized Learning Paths',
    description: 'Get customized learning recommendations based on your career goals and current skills.',
    icon: ChartBarIcon,
  },
  {
    name: 'Skill Assessment',
    description: 'Take assessments to identify your strengths and areas for improvement.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Career Guidance',
    description: 'Receive AI-powered career advice and industry insights.',
    icon: RocketLaunchIcon,
  },
];

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400 opacity-20 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute -bottom-40 right-0 w-[32rem] h-[32rem] bg-cyan-400 opacity-20 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="relative isolate px-6 pt-20 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 flex flex-col items-center">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-full p-6 shadow-lg mb-2 animate-fade-in">
              <RocketLaunchIcon className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl text-center drop-shadow-lg">
              Discover Your Path
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 text-center max-w-xl">
              Get personalized career guidance, explore courses, and find your best-fit stream after 12th
            </p>
            <Link
              href="/login"
              className="mt-8 rounded-md bg-teal-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-all"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12 sm:py-20 z-10">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <MicrophoneIcon className="h-10 w-10 text-teal-500 mb-2" />
            <span className="font-semibold text-gray-900 dark:text-white">Conversational Onboarding</span>
            <span className="text-gray-500 dark:text-gray-300 mt-2">Answer a few questions by voice or text to personalize your journey.</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <ChartBarIcon className="h-10 w-10 text-blue-500 mb-2" />
            <span className="font-semibold text-gray-900 dark:text-white">AI-Powered Guidance</span>
            <span className="text-gray-500 dark:text-gray-300 mt-2">Get instant, tailored course and career recommendations.</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <UserGroupIcon className="h-10 w-10 text-yellow-500 mb-2" />
            <span className="font-semibold text-gray-900 dark:text-white">Grow & Connect</span>
            <span className="text-gray-500 dark:text-gray-300 mt-2">Track your progress, complete challenges, and join a supportive community.</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 lg:px-8 py-12 sm:py-16 z-10">
        <div className="bg-white/90 dark:bg-gray-800 rounded-2xl shadow-xl border border-teal-100 dark:border-teal-800 p-8 flex flex-col items-center">
          <span className="text-2xl text-teal-500 mb-2">"</span>
          <p className="text-lg text-gray-700 dark:text-gray-200 text-center mb-4">This platform made my career planning so much easier. The voice onboarding was fun, and the AI suggestions were spot on!</p>
          <span className="font-bold text-teal-700 dark:text-teal-300">— Aditi, Student</span>
        </div>
      </div>
    </div>
  );
}
