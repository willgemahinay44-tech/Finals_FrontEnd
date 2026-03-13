export default function ProgramDetails({ program }) {
  if (!program) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-400">
        Select a program to view its details.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{program.code}</p>
          <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-[#7f1d1d]/10 text-[#7f1d1d] px-3 py-1 text-xs font-medium">
          {program.type}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        Duration: <span className="font-medium text-gray-700">{program.duration}</span> · Total Units:{" "}
        <span className="font-medium text-gray-700">{program.totalUnits}</span>
      </p>

      <p className="text-sm text-gray-600 mb-4">{program.description}</p>

      <div className="mt-2 space-y-3 overflow-auto">
        {program.years?.map((year) => (
          <div key={year.level} className="border border-gray-100 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">{year.level}</p>
            <ul className="list-disc pl-4 text-xs text-gray-600 space-y-0.5">
              {year.subjects.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

