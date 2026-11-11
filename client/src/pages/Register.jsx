
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    college: "",
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

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        department: form.department.trim(),
        college: form.college.trim(),
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const validationErrors = err.response?.data?.errors;

      setError(
        validationErrors?.map((item) => item.message).join(". ") ||
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Branding */}
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
              <p className="text-blue-300 font-semibold text-sm uppercase tracking-widest">
                Start organising
              </p>

              <h1 className="text-5xl font-bold leading-tight mt-5">
                One platform.
                <br />
                Every academic
                <br />
                possibility.
              </h1>

              <p className="text-blue-100/75 mt-6 leading-7 max-w-md">
                Create your student account and bring your
                classes, assignments, notes and learning
                activities together.
              </p>
            </div>
          </div>

          <p className="text-blue-200/60 text-sm">
            Built for smarter learning.
          </p>
        </section>

        {/* Registration form */}
        <section className="p-7 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">

            <p className="text-indigo-600 font-semibold text-sm">
              CREATE YOUR ACCOUNT
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-3">
              Join your academic workspace
            </h2>

            <p className="text-slate-500 mt-2">
              Enter your details to get started.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={60}
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-slate-700 mb-2">
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    maxLength={80}
                    value={form.department}
                    onChange={handleChange}
                    placeholder="ECE"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label htmlFor="college" className="block text-sm font-semibold text-slate-700 mb-2">
                    College
                  </label>
                  <input
                    id="college"
                    name="college"
                    type="text"
                    maxLength={120}
                    value={form.college}
                    onChange={handleChange}
                    placeholder="College name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    maxLength={72}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-20 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-7">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:text-indigo-800"
              >
                Sign in
              </Link>
            </p>

            <Link
              to="/"
              className="block text-center text-sm text-slate-400 hover:text-indigo-600 mt-5"
            >
              ← Back to home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
