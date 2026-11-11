
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-slate-900">
              Academic Organiser
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-slate-100 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-indigo-600 font-semibold text-sm">
          STUDENT WORKSPACE
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
          Welcome, {user?.name || "Student"}!
        </h1>

        <p className="text-slate-500 mt-2">
          Your academic journey starts here.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-slate-500 text-sm">Student name</p>
            <h2 className="font-bold text-xl mt-2">
              {user?.name || "Not available"}
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-slate-500 text-sm">Email address</p>
            <h2 className="font-bold text-lg mt-2 break-all">
              {user?.email || "Not available"}
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-slate-500 text-sm">Department</p>
            <h2 className="font-bold text-xl mt-2">
              {user?.department || "Not specified"}
            </h2>
          </div>
        </div>

        <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-7">
          <h2 className="text-xl font-bold text-indigo-950">
            Your workspace is ready
          </h2>
          <p className="text-indigo-800/75 mt-2">
            Timetable, tasks, notes, study materials and academic
            progress will be organised here.
          </p>
        </div>
      </section>
    </main>
  );
}
