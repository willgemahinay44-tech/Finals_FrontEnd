export default function ProgramCard({ program, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(program)}
      className={`w-full text-left rounded-xl border px-4 py-3 mb-2 transition ${
        selected ? "border-[#7f1d1d] bg-[#fef2f2]" : "border-gray-200 bg-white hover:border-[#7f1d1d]/60"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{program.code}</p>
          <p className="text-sm font-semibold text-gray-800">{program.name}</p>
          <p className="text-xs text-gray-500">
            {program.type} · {program.duration}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            program.status === "Active"
              ? "bg-green-100 text-green-700"
              : program.status === "Phased Out"
              ? "bg-gray-200 text-gray-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {program.status}
        </span>
      </div>
      <p className="mt-2 text-xs text-gray-500 line-clamp-2">{program.description}</p>
    </button>
  );
}

