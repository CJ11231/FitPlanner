'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Exercise = {
  id: string;
  name: string;
  description: string | null;
  sets: number;
  reps: number;
  restTime: number;
  bodyPart: string;
};

type WorkoutPlan = {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  difficulty: string;
  bodyFocus: string;
  exercises: Exercise[];
  createdAt: string;
};

export default function WorkoutPlansPage() {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await fetch('/api/workout-plans');
        
        if (!response.ok) {
          throw new Error('Failed to fetch workout plans');
        }
        
        const data = await response.json();
        setWorkoutPlans(data);
      } catch (err) {
        console.error('Error fetching workout plans:', err);
        setError('Failed to load workout plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkoutPlans();
  }, []);

  const handlePlanSelect = (plan: WorkoutPlan) => {
    setSelectedPlan(plan);
  };

  const renderDifficultyBadge = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading workout plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Sample workout plans for demonstration purposes
  const sampleWorkoutPlans: WorkoutPlan[] = [
    {
      id: '1',
      name: 'Beginner Strength Training',
      description: 'Perfect for those new to fitness with a focus on building fundamental strength.',
      duration: 4,
      difficulty: 'beginner',
      bodyFocus: 'full body',
      exercises: [
        { id: '101', name: 'Push-ups', description: 'Basic chest exercise', sets: 3, reps: 10, restTime: 60, bodyPart: 'chest' },
        { id: '102', name: 'Squats', description: 'Lower body compound exercise', sets: 3, reps: 12, restTime: 60, bodyPart: 'legs' },
        { id: '103', name: 'Plank', description: 'Core stability exercise', sets: 3, reps: 1, restTime: 60, bodyPart: 'core' },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Intermediate Hypertrophy Program',
      description: 'Designed for muscle growth with progressive overload principles.',
      duration: 8,
      difficulty: 'intermediate',
      bodyFocus: 'upper body',
      exercises: [
        { id: '201', name: 'Bench Press', description: 'Compound chest exercise', sets: 4, reps: 8, restTime: 90, bodyPart: 'chest' },
        { id: '202', name: 'Pull-ups', description: 'Back and biceps exercise', sets: 4, reps: 8, restTime: 90, bodyPart: 'back' },
        { id: '203', name: 'Overhead Press', description: 'Shoulder strength exercise', sets: 3, reps: 10, restTime: 90, bodyPart: 'shoulders' },
      ],
      createdAt: new Date().toISOString(),
    },
  ];

  // Use sample data if no workout plans from API
  const plansToDisplay = workoutPlans.length > 0 ? workoutPlans : sampleWorkoutPlans;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Workout Plans</h1>
      
      <div className="grid md:grid-cols-12 gap-8">
        {/* Workout Plan List */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
            
            <ul className="space-y-3">
              {plansToDisplay.map((plan) => (
                <li 
                  key={plan.id}
                  className={`p-4 rounded-md cursor-pointer transition ${
                    selectedPlan?.id === plan.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{plan.name}</h3>
                    {renderDifficultyBadge(plan.difficulty)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {plan.description?.substring(0, 80)}
                    {plan.description && plan.description.length > 80 ? '...' : ''}
                  </p>
                  <div className="flex mt-2 text-xs text-gray-500">
                    <span className="mr-3">{plan.duration} weeks</span>
                    <span>Focus: {plan.bodyFocus}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Workout Plan Details */}
        <div className="md:col-span-7 lg:col-span-8">
          {selectedPlan ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
                {renderDifficultyBadge(selectedPlan.difficulty)}
              </div>
              
              <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="px-4 py-2 bg-gray-100 rounded-md">
                  <span className="text-sm text-gray-500">Duration</span>
                  <p className="font-semibold">{selectedPlan.duration} weeks</p>
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-md">
                  <span className="text-sm text-gray-500">Focus</span>
                  <p className="font-semibold">{selectedPlan.bodyFocus}</p>
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-md">
                  <span className="text-sm text-gray-500">Exercises</span>
                  <p className="font-semibold">{selectedPlan.exercises.length}</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Exercises</h3>
              <div className="space-y-4">
                {selectedPlan.exercises.map((exercise) => (
                  <div key={exercise.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {exercise.bodyPart}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                    <div className="flex mt-3 text-sm">
                      <div className="mr-4">
                        <span className="text-gray-500">Sets:</span> {exercise.sets}
                      </div>
                      <div className="mr-4">
                        <span className="text-gray-500">Reps:</span> {exercise.reps}
                      </div>
                      <div>
                        <span className="text-gray-500">Rest:</span> {exercise.restTime}s
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                  Add to My Plans
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Select a Workout Plan</h3>
              <p className="text-gray-500 max-w-md">
                Choose a workout plan from the list to view its details and exercises
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 