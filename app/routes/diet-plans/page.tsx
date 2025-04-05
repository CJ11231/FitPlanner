'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Meal = {
  id: string;
  name: string;
  description: string | null;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  recipe: string | null;
};

type Diet = {
  id: string;
  name: string;
  description: string | null;
  calorieGoal: number | null;
  proteinGoal: number | null;
  carbGoal: number | null;
  fatGoal: number | null;
  meals: Meal[];
  createdAt: string;
};

export default function DietPlansPage() {
  const [dietPlans, setDietPlans] = useState<Diet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Diet | null>(null);

  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        const response = await fetch('/api/diet-plans');
        
        if (!response.ok) {
          throw new Error('Failed to fetch diet plans');
        }
        
        const data = await response.json();
        setDietPlans(data);
      } catch (err) {
        console.error('Error fetching diet plans:', err);
        setError('Failed to load diet plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDietPlans();
  }, []);

  const handlePlanSelect = (plan: Diet) => {
    setSelectedPlan(plan);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading diet plans...</p>
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

  // Sample diet plans for demonstration purposes
  const sampleDietPlans: Diet[] = [
    {
      id: '1',
      name: 'High Protein Diet',
      description: 'Optimized for muscle building with quick and easy high-protein meals.',
      calorieGoal: 2500,
      proteinGoal: 180,
      carbGoal: 250,
      fatGoal: 70,
      meals: [
        {
          id: '101',
          name: 'Protein-Packed Breakfast',
          description: 'Quick morning meal with high protein content',
          calories: 450,
          protein: 30,
          carbs: 30,
          fat: 20,
          prepTime: 10,
          recipe: 'Mix 2 scoops of protein powder with oats, almond milk, and a banana. Top with nuts and berries.',
        },
        {
          id: '102',
          name: 'Chicken and Rice Bowl',
          description: 'Simple lunch that can be meal prepped',
          calories: 600,
          protein: 40,
          carbs: 60,
          fat: 15,
          prepTime: 15,
          recipe: 'Cook chicken breast with simple seasonings. Serve with rice and steamed vegetables.',
        },
        {
          id: '103',
          name: 'Greek Yogurt Parfait',
          description: 'Quick protein-rich snack',
          calories: 300,
          protein: 20,
          carbs: 25,
          fat: 10,
          prepTime: 5,
          recipe: 'Layer Greek yogurt with honey, granola, and fresh berries.',
        }
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Low-Carb Diet Plan',
      description: 'Focused on fat loss while maintaining lean muscle mass.',
      calorieGoal: 1800,
      proteinGoal: 150,
      carbGoal: 100,
      fatGoal: 100,
      meals: [
        {
          id: '201',
          name: 'Avocado and Egg Breakfast',
          description: 'Low-carb breakfast rich in healthy fats',
          calories: 400,
          protein: 20,
          carbs: 10,
          fat: 30,
          prepTime: 10,
          recipe: 'Scrambled eggs with avocado, spinach, and a small amount of cheese.',
        },
        {
          id: '202',
          name: 'Tuna Salad Lettuce Wraps',
          description: 'Carb-free lunch option',
          calories: 350,
          protein: 35,
          carbs: 5,
          fat: 20,
          prepTime: 10,
          recipe: 'Mix tuna with Greek yogurt, diced celery, and seasonings. Serve in large lettuce leaves.',
        },
        {
          id: '203',
          name: 'Grilled Salmon with Vegetables',
          description: 'Protein and healthy fat-rich dinner',
          calories: 500,
          protein: 40,
          carbs: 15,
          fat: 30,
          prepTime: 20,
          recipe: 'Grill salmon fillet and serve with roasted asparagus and bell peppers.',
        }
      ],
      createdAt: new Date().toISOString(),
    },
  ];

  // Use sample data if no diet plans from API
  const plansToDisplay = dietPlans.length > 0 ? dietPlans : sampleDietPlans;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Diet Plans</h1>
      
      <div className="grid md:grid-cols-12 gap-8">
        {/* Diet Plan List */}
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
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {plan.meals.length} meals
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {plan.description?.substring(0, 80)}
                    {plan.description && plan.description.length > 80 ? '...' : ''}
                  </p>
                  <div className="flex mt-2 text-xs text-gray-500">
                    <span className="mr-3">{plan.calorieGoal} calories</span>
                    <span>{plan.proteinGoal}g protein</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Diet Plan Details */}
        <div className="md:col-span-7 lg:col-span-8">
          {selectedPlan ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedPlan.name}</h2>
              <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="px-4 py-3 bg-gray-100 rounded-md text-center">
                  <span className="text-sm text-gray-500 block">Calories</span>
                  <p className="font-semibold">{selectedPlan.calorieGoal}</p>
                </div>
                <div className="px-4 py-3 bg-gray-100 rounded-md text-center">
                  <span className="text-sm text-gray-500 block">Protein</span>
                  <p className="font-semibold">{selectedPlan.proteinGoal}g</p>
                </div>
                <div className="px-4 py-3 bg-gray-100 rounded-md text-center">
                  <span className="text-sm text-gray-500 block">Carbs</span>
                  <p className="font-semibold">{selectedPlan.carbGoal}g</p>
                </div>
                <div className="px-4 py-3 bg-gray-100 rounded-md text-center">
                  <span className="text-sm text-gray-500 block">Fat</span>
                  <p className="font-semibold">{selectedPlan.fatGoal}g</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Meals</h3>
              <div className="space-y-4">
                {selectedPlan.meals.map((meal) => (
                  <div key={meal.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{meal.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {meal.prepTime} min prep
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
                    
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="text-xs">
                        <span className="text-gray-500 block">Calories</span>
                        <span className="font-medium">{meal.calories}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500 block">Protein</span>
                        <span className="font-medium">{meal.protein}g</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500 block">Carbs</span>
                        <span className="font-medium">{meal.carbs}g</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500 block">Fat</span>
                        <span className="font-medium">{meal.fat}g</span>
                      </div>
                    </div>
                    
                    {meal.recipe && (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium mb-1">Quick Recipe:</h5>
                        <p className="text-xs text-gray-600">{meal.recipe}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                  Add to My Diet Plans
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Select a Diet Plan</h3>
              <p className="text-gray-500 max-w-md">
                Choose a diet plan from the list to view its details and recipes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 