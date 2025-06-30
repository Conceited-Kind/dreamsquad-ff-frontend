export default function AuthInput({ label, className = '', ...props }) {
  return (
    <div className={`auth-input-group ${className}`}>
      {label && <label className="block text-gray-700 mb-1">{label}</label>}
      <input
        className="auth-input w-full p-3 border-b-2 border-gray-300 focus:border-dream-green bg-transparent placeholder-gray-400 transition-colors"
        {...props}
      />
    </div>
  )
}