import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/diet-plans
export async function GET() {
  try {
    const diets = await prisma.diet.findMany({
      include: {
        meals: true,
      },
    });
    
    return NextResponse.json(diets);
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch diet plans" },
      { status: 500 }
    );
  }
}

// POST /api/diet-plans
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { name, description, calorieGoal, proteinGoal, carbGoal, fatGoal, userId, meals } = body;
    
    // Create the diet plan
    const diet = await prisma.diet.create({
      data: {
        name,
        description,
        calorieGoal,
        proteinGoal,
        carbGoal,
        fatGoal,
        userId,
        meals: {
          create: meals || [],
        },
      },
      include: {
        meals: true,
      },
    });
    
    return NextResponse.json(diet);
  } catch (error) {
    console.error("Error creating diet plan:", error);
    return NextResponse.json(
      { error: "Failed to create diet plan" },
      { status: 500 }
    );
  }
} 