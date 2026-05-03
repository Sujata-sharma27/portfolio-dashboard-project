import { useState } from "react";
import { Plus, ExternalLink, Github, Star, Search, Filter, Calendar, Code } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";

const projects = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    description: "Smart task management app with ML-based priority suggestions and productivity insights",
    tags: ["React", "TypeScript", "TensorFlow.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
    stars: 234,
    category: "Full Stack",
    demo: "#",
    github: "#",
    date: "2026-04-15"
  },
  {
    id: 2,
    title: "Real-time Collaboration Whiteboard",
    description: "Multiplayer canvas app with WebRTC for team brainstorming and design sessions",
    tags: ["Next.js", "WebRTC", "Socket.io", "Canvas API"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    stars: 189,
    category: "Frontend",
    demo: "#",
    github: "#",
    date: "2026-03-20"
  },
  {
    id: 3,
    title: "DevOps Pipeline Dashboard",
    description: "Monitor CI/CD pipelines, deployments, and infrastructure metrics in real-time",
    tags: ["React", "Go", "Docker", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    stars: 312,
    category: "Full Stack",
    demo: "#",
    github: "#",
    date: "2026-02-10"
  },
  {
    id: 4,
    title: "Blockchain Wallet Tracker",
    description: "Track cryptocurrency portfolios with real-time prices and transaction history",
    tags: ["Vue.js", "Web3.js", "Ethereum", "Charts"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    stars: 156,
    category: "Frontend",
    demo: "#",
    github: "#",
    date: "2026-01-05"
  },
  {
    id: 5,
    title: "Cloud Storage Manager",
    description: "Unified interface to manage files across multiple cloud storage providers",
    tags: ["React", "AWS S3", "Google Drive API", "Python"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
    stars: 267,
    category: "Full Stack",
    demo: "#",
    github: "#",
    date: "2025-12-18"
  },
  {
    id: 6,
    title: "Code Snippet Manager",
    description: "Beautiful code snippet organizer with syntax highlighting and search",
    tags: ["React", "Monaco Editor", "IndexedDB", "PWA"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    stars: 198,
    category: "Frontend",
    demo: "#",
    github: "#",
    date: "2025-11-22"
  }
];

const categories = ["All", "Full Stack", "Frontend", "Backend", "Mobile"];

export function Portfolio() {
  const { showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'stars'>('date');

  const filteredProjects = projects
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const handleAddProject = () => {
    setIsModalOpen(false);
    showToast('Project added successfully!', 'success');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Portfolio</h1>
          <p className="text-gray-600">Showcase of my best work · {filteredProjects.length} projects</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Add Project
        </Button>
      </motion.div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search projects, technologies..."
              icon={<Search className="w-5 h-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'stars')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="date">Latest First</option>
              <option value="stars">Most Popular</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card hover className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden bg-gray-100 rounded-lg mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a
                      href={project.demo}
                      className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-110"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-700" />
                    </a>
                    <a
                      href={project.github}
                      className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all hover:scale-110"
                    >
                      <Github className="w-4 h-4 text-gray-700" />
                    </a>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700">
                      {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{project.stars}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </motion.div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Project" size="lg">
        <div className="space-y-4">
          <Input label="Project Title" placeholder="Enter project name" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              rows={4}
              placeholder="Describe your project..."
            />
          </div>
          <Input label="GitHub URL" placeholder="https://github.com/..." />
          <Input label="Demo URL" placeholder="https://demo.example.com" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Full Stack</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Mobile</option>
            </select>
          </div>
          <Input label="Technologies (comma separated)" placeholder="React, TypeScript, Node.js" />
          <div className="flex gap-3 pt-4">
            <Button onClick={handleAddProject} className="flex-1">Add Project</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
