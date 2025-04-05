import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        bodyGoal: true,
        timeframe: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { email, name, height, weight, age, gender, bodyGoal, timeframe } = body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        height,
        weight,
        age,
        gender,
        bodyGoal,
        timeframe,
      },
    });

    // Add logic to determine appropriate workout plan based on user input
    let workoutPlanName: string;
    let workoutPlanDescription: string;
    let workoutDifficulty: string;
    let dietPlanName: string;

    if (bodyGoal === 'lose_weight') {
      workoutPlanName = 'Fat Loss Program';
      workoutPlanDescription = 'A balanced program focused on calorie burning and muscle maintenance.';
      workoutDifficulty = 'intermediate';
      dietPlanName = 'Calorie Deficit Diet Plan';
    } else if (bodyGoal === 'build_muscle') {
      workoutPlanName = 'Muscle Building Program';
      workoutPlanDescription = 'Progressive overload training split to maximize muscle growth.';
      workoutDifficulty = 'advanced';
      dietPlanName = 'High Protein Diet Plan';
    } else if (bodyGoal === 'improve_fitness') {
      workoutPlanName = 'Overall Fitness Program';
      workoutPlanDescription = 'Balanced approach to improve strength, endurance, and mobility.';
      workoutDifficulty = 'beginner';
      dietPlanName = 'Balanced Nutrition Plan';
    } else { // maintain
      workoutPlanName = 'Maintenance Program';
      workoutPlanDescription = 'Balanced routine to maintain current physique and fitness levels.';
      workoutDifficulty = 'beginner';
      dietPlanName = 'Maintenance Diet Plan';
    }

    // For now, return the user data so the client can display personalized recommendations
    return NextResponse.json({
      ...user,
      workoutPlanName,
      workoutPlanDescription,
      workoutDifficulty,
      dietPlanName
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
} 