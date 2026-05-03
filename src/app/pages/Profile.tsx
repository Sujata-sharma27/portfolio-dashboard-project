import { useState } from "react";
import { Mail, MapPin, Briefcase, Calendar, Github, Linkedin, Globe, Edit2, Save, Camera, Award as AwardIcon } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from "../context/AppContext";

export function Profile() {
  const { showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    email: "alex.rivera@email.com",
    bio: "Passionate developer with 3+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Always learning and exploring new technologies.",
    experience: "3 years",
    github: "github.com/alexrivera",
    linkedin: "linkedin.com/in/alexrivera",
    website: "alexrivera.dev"
  });

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"] },
    { category: "DevOps", items: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions"] },
    { category: "Tools", items: ["Git", "VS Code", "Figma", "Postman", "Linux"] }
  ];

  const certifications = [
    { name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2025", color: "from-orange-500 to-orange-600" },
    { name: "React Professional", issuer: "Meta", date: "2024", color: "from-blue-500 to-blue-600" },
    { name: "Kubernetes Administrator", issuer: "CNCF", date: "2024", color: "from-cyan-500 to-cyan-600" }
  ];

  const achievements = [
    { title: "100 Day Streak", count: 1, icon: "🔥" },
    { title: "Projects Completed", count: 24, icon: "🎯" },
    { title: "Skills Mastered", count: 18, icon: "⭐" },
    { title: "Courses Finished", count: 34, icon: "🎓" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden mb-6">
            <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-4 right-4 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Change Cover
              </motion.button>
            </div>

            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-xl">
                    {profile.name.charAt(0)}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                      <Input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                        >
                          {isEditing ? (
                            <Save className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Edit2 className="w-5 h-5 text-gray-600" />
                          )}
                        </motion.button>
                      </div>
                      <p className="text-lg text-gray-600 mb-4">{profile.title}</p>
                    </>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {profile.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {profile.experience} experience
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => window.open(`https://${profile.github}`, '_blank')}>
                    <Github className="w-5 h-5" />
                    GitHub
                  </Button>
                  <Button variant="outline" onClick={() => window.open(`https://${profile.linkedin}`, '_blank')}>
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="text-2xl font-bold text-gray-900">{achievement.count}</div>
                    <div className="text-sm text-gray-600">{achievement.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Skills</h2>
              <div className="space-y-6">
                {skills.map((skillGroup, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-100 cursor-pointer hover:shadow-md transition-all"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className={`p-3 bg-gradient-to-br ${cert.color} rounded-xl shadow-md group-hover:scale-110 transition-transform`}>
                      <AwardIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
