import Navbar from "./common/Navbar";
import ProgramList from "./ProgramList";

export default function ProgramPage({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#E8DAF2] flex">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1 px-6 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Program Offerings</h1>
          <p className="text-gray-500 text-sm">
            Browse all programs, their status, duration, and year-level subject groupings.
          </p>
        </div>
        <ProgramList />
      </main>
    </div>
  );
}

