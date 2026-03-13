export default function SubjectCard({ subject, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(subject)}
      className={`w-full text-left rounded-xl border px-3 py-2 mb-1.5 transition text-xs ${
        selected ? "border-[#7f1d1d] bg-[#fef2f2]" : "border-gray-200 bg-white hover:border-[#7f1d1d]/60"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-800">{subject.code}</p>
          <p className="text-[11px] text-gray-600 line-clamp-1">{subject.title}</p>
          <p className="text-[11px] text-gray-400">
            {subject.program} · {subject.units} unit{subject.units !== 1 ? "s" : ""}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
            subject.offeringType === "Per Semester"
              ? "bg-blue-100 text-blue-700"
              : subject.offeringType === "Per Term"
              ? "bg-amber-100 text-amber-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {subject.offeringType}
        </span>
      </div>
    </button>
  );
}

