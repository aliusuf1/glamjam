import { useState } from "react";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
      <span className="text-xs uppercase tracking-[0.2em] text-rose-400">
        Stay in the know
      </span>
      <h2 className="font-display mt-2 text-3xl italic text-plum-700 sm:text-4xl">
        Join the Aurelle circle
      </h2>
      <p className="mx-auto mt-3 max-w-md text-plum-500">
        New arrivals, seasonal edits and members-only offers — straight to
        your inbox.
      </p>

      {submitted ? (
        <p className="mt-6 font-display text-lg text-rose-500">
          Thank you for joining — welcome to the circle.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            className="flex-1 rounded-full border border-rose-200 bg-white px-5 py-3 text-sm text-plum-700 outline-none focus:border-rose-400"
          />
          <button
            type="submit"
            className="rounded-full bg-plum-600 px-7 py-3 text-sm font-medium tracking-wide text-cream-50 hover:bg-rose-500"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
