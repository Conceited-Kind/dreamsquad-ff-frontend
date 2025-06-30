export default function PrimaryButton({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-dream-green hover:bg-dream-green-dark text-white',
    secondary: 'bg-dream-blue hover:bg-blue-800 text-white',
    outline: 'border border-dream-green text-dream-green hover:bg-green-50',
    light: 'bg-white text-blue-600 shadow-lg hover:bg-gray-100',
    'light-outline': 'bg-white/20 border-2 border-white text-white hover:bg-white/30'
  }

  return (
    <button
      className={`px-6 py-3 rounded-lg font-bold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
