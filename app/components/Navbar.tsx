import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/" className="text-xl font-bold">
          FitPlanner
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/routes/workout-plans" className="hover:text-gray-300">
            Workout Plans
          </Link>
          <Link href="/routes/diet-plans" className="hover:text-gray-300">
            Diet Plans
          </Link>
          <Link href="/routes/profile" className="hover:text-gray-300">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 