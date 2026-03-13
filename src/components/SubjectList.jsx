import { useMemo, useState } from "react";
import { subjects } from "../data/subjects";
import SubjectCard from "./SubjectCard";
import SubjectDetails from "./SubjectDetails";
import FilterBar from "./FilterBar";

export default function SubjectList() {
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("All");
  const [program, setProgram] = useState("All");
  const [withPrereq, setWithPrereq] = useState("All");
  const [selected, setSelected] = useState(subjects[0] ?? null);

  const filtered = useMemo(() => {
    return subjects.filter((s) => {
      const matchesSearch =
        !search ||
        s.code.toLowerCase().includes(search.toLowerCase()) ||
        s.title.toLowerCase().includes(search.toLowerCase());
      const matchesSemester = semester === "All" || s.term === semester;
      const matchesProgram = program === "All" || s.program === program || s.program === "All Programs";
      const matchesPrereq =
        withPrereq === "All" ||
        (withPrereq === "With" && s.hasPrerequisites) ||
        (withPrereq === "Without" && !s.hasPrerequisites);
      return matchesSearch && matchesSemester && matchesProgram && matchesPrereq;
    });
  }, [search, semester, program, withPrereq]);

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Subject Offerings</h2>
          <p className="text-xs text-gray-500">View subjects by term, program, and pre-requisites.</p>
        </div>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        semester={semester}
        onSemesterChange={setSemester}
        program={program}
        onProgramChange={setProgram}
        withPrereq={withPrereq}
        onWithPrereqChange={setWithPrereq}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 pr-1">
          {filtered.map((subject) => (
            <SubjectCard
              key={subject.code}
              subject={subject}
              selected={selected?.code === subject.code}
              onSelect={setSelected}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-6">No subjects match your filters.</p>
          )}
        </div>
        <div className="lg:col-span-2">
          <SubjectDetails subject={selected} />
        </div>
      </div>
    </div>
  );
}

