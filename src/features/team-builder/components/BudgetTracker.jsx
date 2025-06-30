// src/features/team-builder/components/BudgetTracker.jsx
export default function BudgetTracker({ current, max }) {
  const percentage = (current / max) * 100;

  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <h3 className="font-bold text-lg mb-2">Budget Tracker</h3>
      <div className="text-sm text-gray-600 mb-2">
        ${current.toFixed(1)}M / ${max}M
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-dream-green h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}