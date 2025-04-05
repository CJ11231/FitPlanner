'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProfileModal from "./components/ProfileModal";
import PersonalizedRecommendations from "./components/PersonalizedRecommendations";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileComplete = (userData: any) => {
    setUserData(userData);
    closeModal();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Personal Fitness Journey Starts Here
          </h1>
          <p className="text-xl mb-8">
            Personalized workout plans and diet recommendations based on your body goals
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={openModal}
              className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Get Started
            </button>
            <Link
              href="#features"
              className="bg-transparent hover:bg-blue-500 border border-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      {userData && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <PersonalizedRecommendations userData={userData} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Optimize Your Fitness Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Personalized Workout Plans
              </h3>
              <p className="text-gray-600">
                Get custom workout routines based on your body goals, fitness level, and available time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Tailored Diet Planning
              </h3>
              <p className="text-gray-600">
                Nutrition plans optimized for your goals with quick and easy recipes for busy students.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Time-Efficient Solutions
              </h3>
              <p className="text-gray-600">
                Designed for busy students with quick workout routines and recipes that save time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!userData && (
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Body?
            </h2>
            <p className="text-xl mb-8">
              Create your personalized fitness plan today
            </p>
            <button
              onClick={openModal}
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold shadow-lg text-lg transition"
            >
              Get Started Now
            </button>
          </div>
        </section>
      )}

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onComplete={handleProfileComplete}
      />
    </div>
  );
}
