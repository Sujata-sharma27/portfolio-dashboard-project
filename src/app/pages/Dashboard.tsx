import { useState } from "react";
import { TrendingUp, Target, Award, Clock, Plus, Calendar, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useApp } from "../context/useApp";

/* ================= YOUR DATA ================= */

const skillProgressData = [
  { month: "Jan", hours: 30 },
  { month: "Feb", hours: 45 },
  { month: "Mar", hours: 60 },
  { month: "Apr", hours: 75 },
  { month: "May", hours: 95 },
];

const recentActivities = [
  { id: 1, action: "Built Full Stack Project (MERN)", time: "2 hours ago", icon: Award, color: "bg-purple-100 text-purple-600" },
  { id: 2, action: "Practiced DSA (LeetCode)", time: "5 hours ago", icon: Target, color: "bg-blue-100 text-blue-600" },
  { id: 3, action: "Worked on Machine Learning model", time: "1 day ago", icon: Clock, color: "bg-green-100 text-green-600" },
  { id: 4, action: "Updated Portfolio Website", time: "2 days ago", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
];

const upcomingGoals = [
  { id: 1, title: "Get Software Developer Job", deadline: "July 2026", progress: 65 },
  { id: 2, title: "Master MERN Stack", deadline: "June 2026", progress: 75 },
  { id: 3, title: "Solve 300+ DSA Questions", deadline: "August 2026", progress: 50 },
];

const stats = [
  {
    label: "Projects Built",
    value: "12",
    change: "+3",
    icon: Target,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    label: "Skills Learned",
    value: "15",
    change: "+5",
    icon: Award,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    label: "Learning Hours",
    value: "180h",
    change: "+20h",
    icon: Clock,
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    label: "Growth Level",
    value: "85%",
    change: "+10%",
    icon: TrendingUp,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  },
];

/* ================= COMPONENT ================= */

export function Dashboard() {
  const { user, showToast } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || "Sujata"} 👋
          </h1>
          <p className="text-gray-600">
            Track your journey to becoming a Full Stack Developer 🚀
          </p>
        </motion.div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card>
                <div className="flex justify-between mb-3">
                  <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className="text-green-600 text-sm flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* CHART + ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* CHART */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between mb-4">
            <h2 className="font-bold">Learning Progress</h2>
            <div className="flex gap-2">
              {["week", "month", "year"].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`px-3 py-1 rounded ${
                    selectedPeriod === p ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={skillProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="hours" stroke="#3b82f6" fill="#93c5fd" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* ACTIVITY */}
        <Card>
          <h2 className="font-bold mb-4">Recent Activity</h2>
          {recentActivities.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.id} className="flex gap-3 mb-3">
                <div className={`p-2 ${a.color} rounded`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-gray-500">{a.time}</p>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* GOALS */}
      <Card>
        <div className="flex justify-between mb-4">
          <h2 className="font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Your Goals
          </h2>
          <Button onClick={() => showToast("Feature coming soon 🚀")}>
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {upcomingGoals.map((goal) => (
            <div key={goal.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{goal.title}</h3>
              <p className="text-sm text-gray-500">{goal.deadline}</p>

              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded mt-1">
                  <div
                    className="h-2 bg-blue-600 rounded"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}