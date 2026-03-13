export default function FilterBar({
  search,
  onSearchChange,
  semester,
  onSemesterChange,
  program,
  onProgramChange,
  withPrereq,
  onWithPrereqChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 text-xs">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search subject code or title..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]/70"
      />
      <select
        value={semester}
        onChange={(e) => onSemesterChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]/70"
      >
        <option value="All">All Terms</option>
        <option value="1st Semester">1st Semester</option>
        <option value="2nd Semester">2nd Semester</option>
        <option value="Trimester">Trimester</option>
      </select>
      <select
        value={program}
        onChange={(e) => onProgramChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]/70"
      >
        <option value="All">All Programs</option>
        <option value="BSIT">BSIT</option>
        <option value="BSCS">BSCS</option>
        <option value="DICT">DICT</option>
      </select>
      <select
        value={withPrereq}
        onChange={(e) => onWithPrereqChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]/70"
      >
        <option value="All">All Subjects</option>
        <option value="With">With Pre-requisites</option>
        <option value="Without">Without Pre-requisites</option>
      </select>
    </div>
  );
}

