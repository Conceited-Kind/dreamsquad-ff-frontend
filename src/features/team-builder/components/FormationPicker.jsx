// src/features/team-builder/components/FormationPicker.jsx
import { useState } from "react";

export default function FormationPicker({ onSelect }) {
  const [selectedFormation, setSelectedFormation] = useState("4-4-2");

  const formations = ["4-4-2", "4-3-3", "3-4-3", "5-3-2"];

  const handleSelect = (formation) => {
    setSelectedFormation(formation);
    if (onSelect) onSelect(formation);
  };

  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <h3 className="font-bold text-lg mb-2">Select Formation</h3>
      <div className="flex gap-2 flex-wrap">
        {formations.map((formation) => (
          <button
            key={formation}
            onClick={() => handleSelect(formation)}
            className={`px-4 py-2 rounded-pill text-sm ${
              selectedFormation === formation
                ? "bg-dream-green text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {formation}
          </button>
        ))}
      </div>
    </div>
  );
}