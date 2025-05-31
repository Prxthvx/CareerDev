'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { AcademicCapIcon, BookOpenIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

interface Course {
  name: string;
  description: string;
  duration: string;
  eligibility: string;
  careerProspects: string[];
  universities: string[];
  udemyCourses: {
    title: string;
    link: string;
    rating: number;
  }[];
  youtubeChannels: {
    name: string;
    link: string;
    subscribers: string;
  }[];
}

// Mock data - In a real app, this would come from an API
const mockRecommendations: Course[] = [
  {
    name: 'Bachelor of Technology in Computer Science',
    description: 'A comprehensive program covering programming, algorithms, data structures, and software development.',
    duration: '4 years',
    eligibility: '12th Science with Mathematics',
    careerProspects: [
      'Software Developer',
      'Data Scientist',
      'AI/ML Engineer',
      'Web Developer',
    ],
    universities: [
      'IIT Delhi',
      'IIT Bombay',
      'IIT Madras',
      'BITS Pilani',
    ],
    udemyCourses: [
      {
        title: 'Complete Python Bootcamp',
        link: 'https://www.udemy.com/course/complete-python-bootcamp/',
        rating: 4.7,
      },
      {
        title: 'Data Structures and Algorithms',
        link: 'https://www.udemy.com/course/data-structures-and-algorithms/',
        rating: 4.8,
      },
    ],
    youtubeChannels: [
      {
        name: 'CodeWithHarry',
        link: 'https://www.youtube.com/c/CodeWithHarry',
        subscribers: '2.5M',
      },
      {
        name: 'freeCodeCamp',
        link: 'https://www.youtube.com/c/Freecodecamp',
        subscribers: '7.5M',
      },
    ],
  },
  {
    name: 'Bachelor of Business Administration',
    description: 'Learn business fundamentals, management principles, and develop leadership skills.',
    duration: '3 years',
    eligibility: '12th in any stream',
    careerProspects: [
      'Business Analyst',
      'Marketing Manager',
      'HR Manager',
      'Entrepreneur',
    ],
    universities: [
      'Delhi University',
      'Symbiosis International University',
      'Christ University',
      'NMIMS Mumbai',
    ],
    udemyCourses: [
      {
        title: 'Business Fundamentals',
        link: 'https://www.udemy.com/course/business-fundamentals/',
        rating: 4.6,
      },
      {
        title: 'Digital Marketing Masterclass',
        link: 'https://www.udemy.com/course/digital-marketing-masterclass/',
        rating: 4.5,
      },
    ],
    youtubeChannels: [
      {
        name: 'Business Insider',
        link: 'https://www.youtube.com/c/BusinessInsider',
        subscribers: '5M',
      },
      {
        name: 'Harvard Business Review',
        link: 'https://www.youtube.com/c/HarvardBusinessReview',
        subscribers: '3M',
      },
    ],
  },
];

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing your profile and generating recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Your Personalized Recommendations</h1>
          <p className="mt-4 text-lg text-gray-600">
            Based on your profile, we've curated the following courses and resources to help you achieve your career goals.
          </p>
        </div>

        <div className="space-y-8">
          {recommendations.map((course, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
                <p className="mt-2 text-gray-600">{course.description}</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Course Details</h3>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Duration</dt>
                        <dd className="text-sm text-gray-900">{course.duration}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Eligibility</dt>
                        <dd className="text-sm text-gray-900">{course.eligibility}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Career Prospects</h3>
                    <ul className="mt-2 space-y-1">
                      {course.careerProspects.map((prospect, i) => (
                        <li key={i} className="text-sm text-gray-900">• {prospect}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">Top Universities</h3>
                  <ul className="mt-2 space-y-1">
                    {course.universities.map((university, i) => (
                      <li key={i} className="text-sm text-gray-900">• {university}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center">
                      <Icon icon={BookOpenIcon} />
                      <h3 className="ml-2 text-lg font-semibold text-gray-900">Recommended Udemy Courses</h3>
                    </div>
                    <ul className="mt-4 space-y-4">
                      {course.udemyCourses.map((course, i) => (
                        <li key={i} className="text-sm">
                          <a
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:text-teal-500"
                          >
                            {course.title}
                          </a>
                          <span className="ml-2 text-gray-500">★ {course.rating}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <Icon icon={VideoCameraIcon} />
                      <h3 className="ml-2 text-lg font-semibold text-gray-900">YouTube Channels</h3>
                    </div>
                    <ul className="mt-4 space-y-4">
                      {course.youtubeChannels.map((channel, i) => (
                        <li key={i} className="text-sm">
                          <a
                            href={channel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:text-teal-500"
                          >
                            {channel.name}
                          </a>
                          <span className="ml-2 text-gray-500">{channel.subscribers} subscribers</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 