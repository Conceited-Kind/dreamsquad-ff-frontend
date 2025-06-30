export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card bg-white/10 backdrop-blur-sm p-6 rounded-card border border-white/20 hover:bg-white/20 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  )
}