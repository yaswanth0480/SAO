
import { Link } from "react-router-dom";
export default function Welcome() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-bold text-lg text-slate-900">
            Academic Organiser
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-slate-700 font-semibold hover:text-indigo-600"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center">
        <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold">
          Your personal academic workspace
        </span>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-950 mt-8 leading-tight">
          Organise your studies.
          <br />
          <span className="text-indigo-600">
            Own your progress.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-500 text-lg mt-7 leading-8">
          Manage your timetable, assignments, notes and study
          resources from one organised academic workspace.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200"
          >
            Create your account →
          </Link>

          <Link
            to="/login"
            className="px-8 py-4 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
          >
            Already a member? Sign in
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-24 text-left">
          {[
            ["01", "Plan your day", "Keep your academic timetable organised."],
            ["02", "Manage your work", "Track assignments, notes and materials."],
            ["03", "Monitor progress", "Build consistent and effective study habits."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="p-7 rounded-2xl border border-slate-200 bg-slate-50"
            >
              <p className="text-indigo-600 font-bold">{number}</p>
              <h2 className="font-bold text-xl text-slate-900 mt-4">
                {title}
              </h2>
              <p className="text-slate-500 mt-2 leading-6">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
