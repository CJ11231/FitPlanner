'use client';

import { useState } from 'react';
import Link from 'next/link';

type RecommendationsProps = {
  userData: any;
};

export default function PersonalizedRecommendations({ userData }: RecommendationsProps) {
  const [activeTab, setActiveTab] = useState<'workout' | 'diet'>('workout');
  
  // Determine workout recommendation based on user goals
  const getWorkoutRecommendation = () => {
    const { bodyGoal, gender } = userData;
    
    if (bodyGoal === 'lose_weight') {
      return {
        name: 'Fat Loss Program',
        description: 'A balanced program focused on calorie burning and muscle maintenance.',
        workouts: [
          {
            name: 'Cardio + HIIT',
            description: 'High-intensity interval training combined with moderate cardio',
            exercises: [
              { name: 'Jumping Jacks', sets: 3, reps: '30 seconds', rest: '15 seconds' },
              { name: 'Mountain Climbers', sets: 3, reps: '30 seconds', rest: '15 seconds' },
              { name: 'Burpees', sets: 3, reps: '30 seconds', rest: '15 seconds' },
              { name: 'Jogging/Running', sets: 1, reps: '20 minutes', rest: 'N/A' },
            ]
          },
          {
            name: 'Full Body Strength',
            description: 'Compound movements to maintain muscle while burning calories',
            exercises: [
              { name: 'Squats', sets: 3, reps: '15', rest: '60 seconds' },
              { name: 'Push-ups', sets: 3, reps: '10-15', rest: '60 seconds' },
              { name: 'Dumbbell Rows', sets: 3, reps: '12 per arm', rest: '60 seconds' },
              { name: 'Lunges', sets: 3, reps: '10 per leg', rest: '60 seconds' },
            ]
          }
        ],
        frequency: '4-5 days per week',
        notes: 'Focus on maintaining a calorie deficit through diet while preserving muscle mass with strength training.'
      };
    } 
    else if (bodyGoal === 'build_muscle') {
      return {
        name: 'Muscle Building Program',
        description: 'Progressive overload training split to maximize muscle growth.',
        workouts: [
          {
            name: 'Upper Body',
            description: 'Focus on chest, back, shoulders and arms',
            exercises: [
              { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90 seconds' },
              { name: 'Rows', sets: 4, reps: '8-10', rest: '90 seconds' },
              { name: 'Overhead Press', sets: 3, reps: '8-10', rest: '90 seconds' },
              { name: 'Bicep Curls', sets: 3, reps: '10-12', rest: '60 seconds' },
              { name: 'Tricep Extensions', sets: 3, reps: '10-12', rest: '60 seconds' },
            ]
          },
          {
            name: 'Lower Body',
            description: 'Focus on quadriceps, hamstrings, glutes and calves',
            exercises: [
              { name: 'Squats', sets: 4, reps: '8-10', rest: '120 seconds' },
              { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', rest: '120 seconds' },
              { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90 seconds' },
              { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '60 seconds' },
            ]
          }
        ],
        frequency: '4 days per week (2 upper, 2 lower)',
        notes: 'Maintain a moderate calorie surplus and ensure adequate protein intake (1.6-2g per kg of bodyweight).'
      };
    }
    else if (bodyGoal === 'improve_fitness') {
      return {
        name: 'Overall Fitness Program',
        description: 'Balanced approach to improve strength, endurance, and mobility.',
        workouts: [
          {
            name: 'Strength Circuit',
            description: 'Full-body circuit to build functional strength',
            exercises: [
              { name: 'Goblet Squats', sets: 3, reps: '12', rest: '30 seconds' },
              { name: 'Push-ups', sets: 3, reps: '10-15', rest: '30 seconds' },
              { name: 'Dumbbell Rows', sets: 3, reps: '12 per side', rest: '30 seconds' },
              { name: 'Plank', sets: 3, reps: '30-45 seconds', rest: '30 seconds' },
              { name: 'Rest', sets: 1, reps: '2 minutes', rest: 'N/A' },
              { name: 'Repeat circuit 2-3 times', sets: '', reps: '', rest: '' },
            ]
          },
          {
            name: 'Cardio & Mobility',
            description: 'Improve cardiovascular fitness and joint mobility',
            exercises: [
              { name: 'Light Jogging/Cycling', sets: 1, reps: '15-20 minutes', rest: 'N/A' },
              { name: 'Dynamic Stretching', sets: 1, reps: '5-10 minutes', rest: 'N/A' },
              { name: 'Yoga Flow', sets: 1, reps: '15-20 minutes', rest: 'N/A' },
            ]
          }
        ],
        frequency: '3-4 days per week',
        notes: 'Balance between strength, cardio, and recovery. Focus on proper form and gradual progression.'
      };
    }
    else { // maintain
      return {
        name: 'Maintenance Program',
        description: 'Balanced routine to maintain current physique and fitness levels.',
        workouts: [
          {
            name: 'Full Body Workout',
            description: 'Comprehensive workout targeting all major muscle groups',
            exercises: [
              { name: 'Squats', sets: 3, reps: '10-12', rest: '60 seconds' },
              { name: 'Push-ups/Bench Press', sets: 3, reps: '10-12', rest: '60 seconds' },
              { name: 'Rows', sets: 3, reps: '10-12', rest: '60 seconds' },
              { name: 'Lunges', sets: 2, reps: '10 per leg', rest: '60 seconds' },
              { name: 'Planks', sets: 2, reps: '45 seconds', rest: '45 seconds' },
            ]
          },
          {
            name: 'Cardio Session',
            description: 'Moderate intensity cardio to maintain heart health',
            exercises: [
              { name: 'Brisk Walking/Jogging', sets: 1, reps: '30 minutes', rest: 'N/A' },
              { name: 'Or Cycling/Swimming', sets: 1, reps: '20-25 minutes', rest: 'N/A' },
            ]
          }
        ],
        frequency: '3 days per week',
        notes: 'Focus on consistency rather than intensity. Maintain current calorie intake and activity levels.'
      };
    }
  };
  
  // Determine diet recommendation based on user goals
  const getDietRecommendation = () => {
    const { bodyGoal, gender, weight } = userData;
    let baseCals = 0;
    
    // Very rough BMR calculation (simplified)
    if (gender === 'male') {
      baseCals = weight * 24;
    } else {
      baseCals = weight * 22;
    }
    
    if (bodyGoal === 'lose_weight') {
      const calories = Math.round(baseCals * 0.8); // 20% deficit
      const protein = Math.round(weight * 2); // 2g per kg
      const fat = Math.round((calories * 0.25) / 9); // 25% of calories from fat
      const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4); // Remainder from carbs
      
      return {
        name: 'Fat Loss Diet Plan',
        description: 'Calorie-controlled diet with high protein to preserve muscle while losing fat.',
        calories,
        macros: { protein, fat, carbs },
        meals: [
          {
            name: 'Protein-Packed Breakfast',
            description: 'Greek yogurt with berries and a sprinkle of nuts',
            calories: Math.round(calories * 0.25),
            prepTime: '5 minutes',
            ingredients: ['1 cup Greek yogurt', '1/2 cup mixed berries', '1 tablespoon honey', '1 tablespoon mixed nuts']
          },
          {
            name: 'Lean Lunch',
            description: 'Grilled chicken salad with mixed greens',
            calories: Math.round(calories * 0.35),
            prepTime: '15 minutes',
            ingredients: ['120g grilled chicken breast', '2 cups mixed salad greens', '1/2 cucumber, sliced', '1 tablespoon olive oil', 'Lemon juice to taste']
          },
          {
            name: 'Balanced Dinner',
            description: 'Baked fish with steamed vegetables',
            calories: Math.round(calories * 0.3),
            prepTime: '20 minutes',
            ingredients: ['150g white fish fillet', '1 cup broccoli', '1 cup cauliflower', '1 tablespoon olive oil', 'Herbs and spices to taste']
          },
          {
            name: 'Smart Snack',
            description: 'Protein shake with a piece of fruit',
            calories: Math.round(calories * 0.1),
            prepTime: '2 minutes',
            ingredients: ['1 scoop protein powder', 'Water or almond milk', '1 medium apple or banana']
          }
        ],
        tips: [
          'Stay hydrated by drinking at least 2-3 liters of water daily',
          'Avoid sugary drinks and processed foods',
          'Eat slowly and mindfully to help with portion control',
          'Prepare meals in advance when possible to avoid unhealthy choices'
        ]
      };
    } 
    else if (bodyGoal === 'build_muscle') {
      const calories = Math.round(baseCals * 1.1); // 10% surplus
      const protein = Math.round(weight * 2.2); // 2.2g per kg
      const fat = Math.round((calories * 0.25) / 9); // 25% of calories from fat
      const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4); // Remainder from carbs
      
      return {
        name: 'Muscle Building Diet Plan',
        description: 'Higher calorie diet with adequate protein to support muscle growth.',
        calories,
        macros: { protein, fat, carbs },
        meals: [
          {
            name: 'Protein-Rich Breakfast',
            description: 'Scrambled eggs with toast and avocado',
            calories: Math.round(calories * 0.25),
            prepTime: '10 minutes',
            ingredients: ['3-4 whole eggs', '2 slices whole grain bread', '1/2 avocado', 'Salt and pepper to taste']
          },
          {
            name: 'Protein & Carb Lunch',
            description: 'Chicken and rice bowl with vegetables',
            calories: Math.round(calories * 0.3),
            prepTime: '15 minutes (faster if meal prepped)',
            ingredients: ['150g chicken breast', '1 cup cooked brown rice', '1 cup mixed vegetables', '1 tablespoon olive oil', 'Seasonings of choice']
          },
          {
            name: 'Post-Workout Shake',
            description: 'Protein shake with banana and peanut butter',
            calories: Math.round(calories * 0.15),
            prepTime: '3 minutes',
            ingredients: ['1-2 scoops protein powder', '1 banana', '1 tablespoon peanut butter', 'Milk or water', 'Ice cubes (optional)']
          },
          {
            name: 'Hearty Dinner',
            description: 'Lean steak with sweet potato and greens',
            calories: Math.round(calories * 0.3),
            prepTime: '20 minutes',
            ingredients: ['150-200g lean steak', '1 medium sweet potato', '2 cups leafy greens', '1 tablespoon olive oil', 'Herbs and spices to taste']
          }
        ],
        tips: [
          'Distribute protein intake evenly throughout the day',
          'Consume a meal or shake within 1-2 hours after workout',
          'Focus on quality whole foods rather than supplements',
          'Ensure adequate sleep (7-9 hours) to optimize recovery and growth'
        ]
      };
    }
    else { // maintain or improve fitness
      const calories = Math.round(baseCals * 1.0); // Maintenance calories
      const protein = Math.round(weight * 1.6); // 1.6g per kg
      const fat = Math.round((calories * 0.3) / 9); // 30% of calories from fat
      const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4); // Remainder from carbs
      
      return {
        name: bodyGoal === 'maintain' ? 'Maintenance Diet Plan' : 'Balanced Fitness Diet Plan',
        description: 'Well-balanced nutrition to support overall health and activity levels.',
        calories,
        macros: { protein, fat, carbs },
        meals: [
          {
            name: 'Balanced Breakfast',
            description: 'Oatmeal with fruit, nuts, and a boiled egg',
            calories: Math.round(calories * 0.25),
            prepTime: '10 minutes',
            ingredients: ['1/2 cup oats', '1 cup milk of choice', '1 tablespoon honey', '1/4 cup mixed berries', '1 tablespoon mixed nuts', '1 boiled egg']
          },
          {
            name: 'Wholesome Lunch',
            description: 'Quinoa bowl with vegetables and lean protein',
            calories: Math.round(calories * 0.35),
            prepTime: '15 minutes',
            ingredients: ['1/2 cup cooked quinoa', '100g chicken/tofu/fish', '1 cup roasted vegetables', '1/4 avocado', '1 tablespoon olive oil', 'Lemon juice and herbs to taste']
          },
          {
            name: 'Balanced Dinner',
            description: 'Stir-fry with lean protein and vegetables',
            calories: Math.round(calories * 0.3),
            prepTime: '15 minutes',
            ingredients: ['100g lean meat or tofu', '2 cups mixed vegetables', '1/2 cup brown rice or whole grain noodles', '1 tablespoon olive oil', 'Stir-fry sauce (low sodium)']
          },
          {
            name: 'Healthy Snack',
            description: 'Greek yogurt with honey or a handful of nuts',
            calories: Math.round(calories * 0.1),
            prepTime: '2 minutes',
            ingredients: ['1/2 cup Greek yogurt', '1 teaspoon honey', 'OR 1/4 cup mixed nuts']
          }
        ],
        tips: [
          'Focus on whole, minimally processed foods',
          'Maintain consistent meal timing when possible',
          'Stay hydrated throughout the day',
          "Listen to your body's hunger and fullness cues"
        ]
      };
    }
  };
  
  const workoutPlan = getWorkoutRecommendation();
  const dietPlan = getDietRecommendation();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Personalized Plan</h2>
        <p className="text-gray-600">
          Based on your profile, we've created custom workout and diet recommendations to help you 
          {userData.bodyGoal === 'lose_weight' ? ' lose weight' : 
           userData.bodyGoal === 'build_muscle' ? ' build muscle' : 
           userData.bodyGoal === 'maintain' ? ' maintain your current physique' : 
           ' improve your overall fitness'}.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex -mb-px">
          <button
            className={`py-2 px-4 font-medium text-sm leading-5 ${
              activeTab === 'workout'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('workout')}
          >
            Workout Plan
          </button>
          <button
            className={`ml-8 py-2 px-4 font-medium text-sm leading-5 ${
              activeTab === 'diet'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('diet')}
          >
            Diet Plan
          </button>
        </div>
      </div>
      
      {/* Workout Plan */}
      {activeTab === 'workout' && (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">{workoutPlan.name}</h3>
            <p className="text-gray-600 mt-1">{workoutPlan.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-medium">Recommended frequency:</span> {workoutPlan.frequency}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Workouts</h4>
            <div className="space-y-4">
              {workoutPlan.workouts.map((workout, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <h5 className="font-semibold text-gray-800">{workout.name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
                  
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500">
                        <th className="py-2">Exercise</th>
                        <th className="py-2">Sets</th>
                        <th className="py-2">Reps</th>
                        <th className="py-2">Rest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workout.exercises.map((exercise, idx) => (
                        <tr key={idx} className="border-t border-gray-100">
                          <td className="py-2 font-medium">{exercise.name}</td>
                          <td className="py-2">{exercise.sets}</td>
                          <td className="py-2">{exercise.reps}</td>
                          <td className="py-2">{exercise.rest}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-md p-4 mb-6">
            <h4 className="text-blue-800 font-medium mb-2">Notes</h4>
            <p className="text-blue-700 text-sm">{workoutPlan.notes}</p>
          </div>
        </div>
      )}
      
      {/* Diet Plan */}
      {activeTab === 'diet' && (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">{dietPlan.name}</h3>
            <p className="text-gray-600 mt-1">{dietPlan.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{dietPlan.calories}</div>
              <div className="text-sm text-gray-500">Daily Calories</div>
            </div>
            <div className="bg-gray-50 rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{dietPlan.macros.protein}g</div>
              <div className="text-sm text-gray-500">Protein</div>
            </div>
            <div className="bg-gray-50 rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{dietPlan.macros.fat}g</div>
              <div className="text-sm text-gray-500">Fat</div>
            </div>
            <div className="bg-gray-50 rounded-md p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{dietPlan.macros.carbs}g</div>
              <div className="text-sm text-gray-500">Carbs</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Sample Meal Plan</h4>
            <div className="space-y-4">
              {dietPlan.meals.map((meal, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-gray-800">{meal.name}</h5>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {meal.calories} cal
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                  
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Ingredients:</div>
                    <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                      {meal.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Prep time: {meal.prepTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-md p-4">
            <h4 className="text-green-800 font-medium mb-2">Nutrition Tips</h4>
            <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
              {dietPlan.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="mt-8 flex justify-center">
        <Link 
          href="/routes/workout-plans"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mr-4"
        >
          Browse All Workout Plans
        </Link>
        <Link 
          href="/routes/diet-plans"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Browse All Diet Plans
        </Link>
      </div>
    </div>
  );
} 