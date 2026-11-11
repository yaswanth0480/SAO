
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await login({
        email: form.email.trim(),
        password: form.password,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Left branding section */}
        <section className="hidden md:flex flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white p-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl font-bold">
                S
              </div>
              <span className="text-xl font-bold">
                Academic Organiser
              </span>
            </div>

            <div className="mt-24">
              <p className="text-blue-300 font-semibold uppercase tracking-widest text-sm">
                Your academic journey
              </p>

              <h1 className="text-5xl font-bold leading-tight mt-5">
                Learn better.
                <br />
                Plan smarter.
                <br />
                Achieve more.
              </h1>

              <p className="text-blue-100/75 mt-6 leading-7 max-w-md">
                Organise your timetable, manage assignments,
                access learning materials and track your
                academic progress in one place.
              </p>
            </div>
          </div>

          <p className="text-blue-200/60 text-sm">
            Your learning journey, organised.
          </p>
        </section>

        {/* Login form */}
        <section className="p-7 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">

            <div className="md:hidden mb-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
                S
              </div>
            </div>

            <p className="text-indigo-600 font-semibold text-sm">
              WELCOME BACK
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-3">
              Sign in to your account
            </h2>

            <p className="text-slate-500 mt-2">
              Continue your academic journey with us.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-20 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-bold hover:text-indigo-800"
              >
                Create account
              </Link>
            </p>

            <Link
              to="/"
              className="block text-center text-sm text-slate-400 hover:text-indigo-600 mt-6"
            >
              ← Back to home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
