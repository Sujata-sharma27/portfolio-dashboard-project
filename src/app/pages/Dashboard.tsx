import { useState } from "react";
import { TrendingUp, Target, Award, Clock, Plus, Calendar, ArrowUpRight } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useApp } from "../context/AppContext";

const skillProgressData = [
  { month: "Jan", hours: 45 },
  { month: "Feb", hours: 52 },
  { month: "Mar", hours: 61 },
  { month: "Apr", hours: 58 },
  { month: "May", hours: 70 },
];

const recentActivities = [
  { id: 1, action: "Completed React Advanced Patterns course", time: "2 hours ago", icon: Award, color: "bg-purple-100 text-purple-600" },
  { id: 2, action: "Added new project: E-commerce Dashboard", time: "5 hours ago", icon: Target, color: "bg-blue-100 text-blue-600" },
  { id: 3, action: "Practiced TypeScript for 1.5 hours", time: "1 day ago", icon: Clock, color: "bg-green-100 text-green-600" },
  { id: 4, action: "Updated portfolio with 3 new projects", time: "2 days ago", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
];

const upcomingGoals = [
  { id: 1, title: "Complete AWS Certification", deadline: "May 15, 2026", progress: 75 },
  { id: 2, title: "Build 5 React Projects", deadline: "June 1, 2026", progress: 60 },
  { id: 3, title: "Contribute to Open Source", deadline: "May 30, 2026", progress: 40 },
];

const stats = [
  {
    label: "Active Projects",
    value: "24",
    change: "+12%",
    icon: Target,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    label: "Skills Mastered",
    value: "18",
    change: "+8",
    icon: Award,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    label: "Learning Hours",
    value: "286h",
    change: "+15h",
    icon: Clock,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    label: "Goal Completion",
    value: "89%",
    change: "+23%",
    icon: TrendingUp,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  },
];

export function Dashboard() {
  const { user, showToast } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600">Here's your professional growth summary</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-full`} />
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>
              <div className="flex gap-2">
                {(['week', 'month', 'year'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={skillProgressData} id="dashboard-area-chart">
                <defs>
                  <linearGradient id="dashboardColorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#dashboardColorHours)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div className={`p-2 ${activity.color} rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Upcoming Goals</h2>
            </div>
            <Button size="sm" onClick={() => showToast('Add new goal feature coming soon!', 'info')}>
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {goal.deadline}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-blue-600">{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
