import { useState } from "react";
import { BookOpen, Clock, CheckCircle2, TrendingUp, Play, Plus, Award, Target } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";

const skills = [
  { name: "React & TypeScript", progress: 85, hours: 120, level: "Advanced", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
  { name: "Node.js & Express", progress: 72, hours: 95, level: "Intermediate", color: "from-green-500 to-green-600", bgColor: "bg-green-50" },
  { name: "System Design", progress: 60, hours: 78, level: "Intermediate", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50" },
  { name: "Docker & Kubernetes", progress: 55, hours: 65, level: "Intermediate", color: "from-cyan-500 to-cyan-600", bgColor: "bg-cyan-50" },
  { name: "GraphQL", progress: 48, hours: 52, level: "Beginner", color: "from-pink-500 to-pink-600", bgColor: "bg-pink-50" },
  { name: "AWS Services", progress: 42, hours: 45, level: "Beginner", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50" },
];

const courses = [
  {
    id: 1,
    title: "Advanced React Patterns & Performance",
    platform: "Frontend Masters",
    instructor: "Kent C. Dodds",
    progress: 65,
    totalLessons: 42,
    completedLessons: 27,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Microservices Architecture",
    platform: "Udemy",
    instructor: "Stephen Grider",
    progress: 38,
    totalLessons: 156,
    completedLessons: 59,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "System Design Interview Prep",
    platform: "Coursera",
    instructor: "Google Engineers",
    progress: 82,
    totalLessons: 32,
    completedLessons: 26,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop"
  }
];

export function Learning() {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<"skills" | "courses">("skills");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: "Active Courses", value: "12", icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { label: "Completed", value: "34", icon: CheckCircle2, color: "from-green-500 to-green-600" },
    { label: "Total Hours", value: "455h", icon: Clock, color: "from-purple-500 to-purple-600" },
  ];

  const handleAddCourse = () => {
    setIsModalOpen(false);
    showToast('Course added successfully!', 'success');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Journey</h1>
          <p className="text-gray-600">Track your skill development and courses</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Add Course
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-center gap-4">
                  <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-2">
              <button
                onClick={() => setActiveTab("skills")}
                className={`py-4 px-2 border-b-2 font-semibold transition-all ${
                  activeTab === "skills"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Skills Progress
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`py-4 px-2 border-b-2 font-semibold transition-all ${
                  activeTab === "courses"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Current Courses
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "skills" && (
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-5 ${skill.bgColor} rounded-xl border border-gray-200 hover:shadow-md transition-all`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-900 text-lg">{skill.name}</h3>
                        <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs font-semibold border border-gray-300">
                          {skill.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold">{skill.hours}h</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">{skill.progress}%</span>
                      </div>
                    </div>
                    <div className="relative h-3 bg-white rounded-full overflow-hidden border border-gray-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${skill.color} relative`}
                      >
                        <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
                      </motion.div>
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-gray-600">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "courses" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover className="overflow-hidden group">
                      <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl"
                          >
                            <Play className="w-6 h-6 text-blue-600 ml-1" />
                          </motion.button>
                        </div>
                        <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg">
                          {course.platform}
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {course.instructor}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          <span className="font-bold text-blue-600">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                          />
                        </div>
                      </div>

                      <Button className="w-full mt-4" size="sm">
                        Continue Learning
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Course">
        <div className="space-y-4">
          <Input label="Course Title" placeholder="Enter course name" />
          <Input label="Platform" placeholder="Udemy, Coursera, etc." />
          <Input label="Instructor Name" placeholder="Instructor name" />
          <Input label="Total Lessons" type="number" placeholder="42" />
          <Input label="Course URL" placeholder="https://..." />
          <div className="flex gap-3 pt-4">
            <Button onClick={handleAddCourse} className="flex-1">Add Course</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
