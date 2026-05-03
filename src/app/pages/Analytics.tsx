import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Award,
  Target,
  Zap,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useApp } from "../context/useApp";

const weeklyData = [
  { day: "Mon", hours: 4, projects: 1 },
  { day: "Tue", hours: 5, projects: 2 },
  { day: "Wed", hours: 3, projects: 1 },
  { day: "Thu", hours: 6, projects: 2 },
  { day: "Fri", hours: 4, projects: 2 },
  { day: "Sat", hours: 2, projects: 1 },
  { day: "Sun", hours: 2, projects: 1 },
];

const skillDistribution = [
  { name: "Frontend", value: 30, color: "#3b82f6" },
  { name: "Backend", value: 25, color: "#8b5cf6" },
  { name: "Database", value: 15, color: "#10b981" },
  { name: "DSA", value: 15, color: "#f59e0b" },
  { name: "Machine Learning", value: 15, color: "#ec4899" },
];
const monthlyProgress = [
  { month: "Dec", completed: 5, started: 8 },
  { month: "Jan", completed: 8, started: 10 },
  { month: "Feb", completed: 10, started: 12 },
  { month: "Mar", completed: 12, started: 15 },
  { month: "Apr", completed: 14, started: 16 },
  { month: "May", completed: 16, started: 18 },
];

export function Analytics() {
  const { showToast } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("week");
  const stats = [
    {
      label: "This Week",
      value: "26h",
      change: "+12%",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Achievements",
      value: "15",
      change: "+3",
      icon: Award,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Goal Progress",
      value: "70%",
      change: "7/10",
      icon: Target,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Day Streak",
      value: "8",
      change: "Improving",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const handleExport = () => {
    showToast("Analytics report exported!", "success");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analytics & Insights
          </h1>
          <p className="text-gray-600">
            Track your productivity and growth patterns
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`bg-gradient-to-br ${stat.color} text-white border-none hover:shadow-2xl`}
                hover
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
                <p className="text-white text-opacity-90">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Weekly Activity
              </h2>
              <div className="flex gap-2">
                {(["week", "month", "year"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedPeriod === period
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={weeklyData} id="analytics-bar-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="hours"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="projects"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Skill Distribution
            </h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart id="analytics-pie-chart">
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {skillDistribution.map((entry) => (
                    <Cell key={`pie-cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              {skillDistribution.map((skill) => (
                <motion.div
                  key={`legend-${skill.name}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-gray-700 font-medium">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {skill.value}%
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Project Completion Trends
              </h2>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Started</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyProgress} id="analytics-line-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 6, fill: "#10b981" }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="started"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 6, fill: "#3b82f6" }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
}
