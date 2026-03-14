import Navbar from "./common/Navbar";
import ProgramList from "./ProgramList";

export default function ProgramPage({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#E8DAF2] flex">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1 px-6 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Program Offerings</h1>
          
        </div>
        <ProgramList />
      </main>
    </div>
  );
}

