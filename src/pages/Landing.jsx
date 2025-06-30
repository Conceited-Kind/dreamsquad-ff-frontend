import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/app/providers/AuthProvider';
import AuthCard from '@/features/auth/components/AuthCard';

const FEATURES = [
	{
		icon: (
			<span role="img" aria-label="Trophy" className="text-5xl mb-4">
				🏆
			</span>
		),
		title: 'Compete & Win',
		description: 'Join leagues and climb the leaderboards',
	},
	{
		icon: (
			<span role="img" aria-label="Stats" className="text-5xl mb-4">
				📊
			</span>
		),
		title: 'Real-Time Stats',
		description: 'Live updates from actual matches',
	},
	{
		icon: (
			<span role="img" aria-label="Friends" className="text-5xl mb-4">
				👥
			</span>
		),
		title: 'Play with Friends',
		description: 'Create private leagues with your crew',
	},
	{
		icon: (
			<span role="img" aria-label="Tools" className="text-5xl mb-4">
				🛠️
			</span>
		),
		title: 'Easy Team Building',
		description: 'Drag & drop interface',
	},
];

export default function Landing() {
	const { user, loading } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && user) {
			navigate('/dashboard', { replace: true });
		}
	}, [user, loading, navigate]);

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-r from-green-400 to-green-500">
			<div className="flex flex-1 flex-col md:flex-row">
				{/* Left: Features */}
				<div className="flex-1 flex flex-col justify-center px-12 py-10">
					<h1 className="text-5xl font-bold mb-4 text-white">
						Build Your <span className="text-yellow-400">Dream Squad</span>
					</h1>
					<p className="text-lg text-white/90 mb-10">
						The simplest fantasy football platform. No complex rules, no premium
						fees – just pure football fun with friends.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{FEATURES.map((feature) => (
							<div
								key={feature.title}
								className="bg-white/20 rounded-2xl p-10 flex flex-col items-center shadow-xl"
							>
								{feature.icon}
								<div className="font-bold text-xl text-white mb-2">
									{feature.title}
								</div>
								<div className="text-white/90 text-center">
									{feature.description}
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Right: Auth Card */}
				<div className="flex-1 flex items-center justify-center px-4 py-10">
					<AuthCard />
				</div>
			</div>
		</div>
	);
}