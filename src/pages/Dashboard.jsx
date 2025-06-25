import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Mock data - replace with your API data
  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Points',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  const topPerformers = [
    { name: 'Mohamed Salah', points: 24, position: 'Forward' },
    { name: 'Kevin De Bruyne', points: 18, position: 'Midfielder' },
    { name: 'Virgil van Dijk', points: 12, position: 'Defender' },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Welcome back, Coach!</h1>
        <p className="text-gray-600">Your team "Lightning FC" is performing well this week</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Weekly Performance</h3>
          <div className="h-64">
            <Bar 
              data={performanceData} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                }
              }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
          <div className="space-y-3">
            {topPerformers.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{player.name}</p>
                  <p className="text-sm text-gray-500">{player.position}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {player.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Matches</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Liverpool vs. Man City</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">2-1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Arsenal vs. Chelsea</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">3-0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Current Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Render your team players here */}
        </div>
      </div>
    </div>
  );
}