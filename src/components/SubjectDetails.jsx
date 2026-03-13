export default function SubjectDetails({ subject }) {
  if (!subject) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-400">
        Select a subject to view its details.
      </div>
    );
  }

  const formatList = (items) => (items && items.length ? items.join(", ") : "None");

  return (
    <div className="bg-white rounded-xl shadow p-5 h-full flex flex-col text-sm">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{subject.code}</p>
          <h3 className="text-base font-semibold text-gray-900">{subject.title}</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-[11px] font-medium">
          {subject.units} unit{subject.units !== 1 ? "s" : ""} · {subject.term}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-3">
        Program: <span className="font-medium text-gray-700">{subject.program}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
        <div className="border border-gray-100 rounded-lg p-3">
          <p className="font-semibold text-gray-700 mb-1">Pre-requisites</p>
          <p className="text-gray-600">{formatList(subject.prerequisites)}</p>
        </div>
        <div className="border border-gray-100 rounded-lg p-3">
          <p className="font-semibold text-gray-700 mb-1">Co-requisites</p>
          <p className="text-gray-600">{formatList(subject.corequisites)}</p>
        </div>
      </div>

      <div className="mt-1 text-xs text-gray-600">
        <p className="font-semibold mb-1">Description</p>
        <p>{subject.description}</p>
      </div>
    </div>
  );
}

