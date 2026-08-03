import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center sm:px-6">
      <span className="font-display text-6xl italic text-rose-300">404</span>
      <h1 className="font-display mt-4 text-2xl text-plum-700">Page not found</h1>
      <p className="mt-2 text-plum-500">
        The page you're looking for has wandered off the vanity.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-plum-600 px-8 py-3 text-sm font-medium tracking-wide text-cream-50 hover:bg-rose-500"
      >
        Back to Home
      </Link>
    </div>
  );
}
