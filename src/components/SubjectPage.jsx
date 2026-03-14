import Navbar from "./common/Navbar";
import SubjectList from "./SubjectList";

export default function SubjectPage({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#E8DAF2] flex">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-1 px-6 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Subject Offerings</h1>
          
        </div>
        <SubjectList />
      </main>
    </div>
  );
}

