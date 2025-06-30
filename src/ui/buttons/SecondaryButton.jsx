// src/ui/buttons/SecondaryButton.jsx
export default function SecondaryButton({ children, ...props }) {
  return (
    <button
      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-pill hover:bg-gray-300"
      {...props}
    >
      {children}
    </button>
  );
}