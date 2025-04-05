# FitPlanner - Personalized Workout and Diet Planning System

A full-stack Next.js application designed to help students achieve their fitness goals with efficient workout and diet plans.

## Features

- **Personalized Profile Creation**: Set your fitness goals, body metrics, and preferences
- **Customized Workout Plans**: Get workout recommendations based on your fitness level and goals
- **Time-Efficient Diet Plans**: Quick and easy meal suggestions with nutrition information
- **User-Friendly Interface**: Clean, responsive design for a seamless experience

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/workout-planner.git
   cd workout-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Setup the database:
   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
workout-planner/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── components/       # Reusable components
│   ├── routes/           # App routes/pages
│   └── ...
├── prisma/               # Database schema and migrations
├── src/                  # Source files
│   └── lib/              # Utility functions
└── ...
```

## Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy with default settings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
# FitPlanner
