import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/workout-plans
export async function GET() {
  try {
    const workoutPlans = await prisma.workoutPlan.findMany({
      include: {
        exercises: true,
      },
    });
    
    return NextResponse.json(workoutPlans);
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch workout plans" },
      { status: 500 }
    );
  }
}

// POST /api/workout-plans
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { name, description, duration, difficulty, bodyFocus, userId, exercises } = body;
    
    // Create the workout plan
    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        name,
        description,
        duration,
        difficulty,
        bodyFocus,
        userId,
        exercises: {
          create: exercises || [],
        },
      },
      include: {
        exercises: true,
      },
    });
    
    return NextResponse.json(workoutPlan);
  } catch (error) {
    console.error("Error creating workout plan:", error);
    return NextResponse.json(
      { error: "Failed to create workout plan" },
      { status: 500 }
    );
  }
} 