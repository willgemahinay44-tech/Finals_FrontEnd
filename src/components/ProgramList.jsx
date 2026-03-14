import { useMemo, useState } from "react";
import { programs } from "../data/programs";
import ProgramCard from "./ProgramCard";
import ProgramDetails from "./ProgramDetails";

export default function ProgramList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState(programs[0] ?? null);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchesSearch =
        !search ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesType = typeFilter === "All" || p.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Program Offerings</h2>
          
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 text-xs">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code or name..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]/70"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]/70"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Phased Out">Phased Out</option>
          <option value="Under Review">Under Review</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]/70"
        >
          <option value="All">All Types</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Diploma">Diploma</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 pr-1">
          {filtered.map((program) => (
            <ProgramCard
              key={program.code}
              program={program}
              selected={selected?.code === program.code}
              onSelect={setSelected}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-6">No programs match your filters.</p>
          )}
        </div>
        <div className="lg:col-span-3">
          <ProgramDetails program={selected} />
        </div>
      </div>
    </div>
  );
}

