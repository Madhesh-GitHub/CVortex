import { motion } from "framer-motion";
import { BadgeCheck, Brain, FileText, Sparkles, ShieldCheck, Wand2 } from "lucide-react";

const features = [
  {
    title: "AI Resume Scoring",
    icon: <Brain size={28} className="text-white" />,
    description: "Intelligent scoring system tailored to job market standards.",
    color: "bg-gradient-to-tr from-indigo-500 to-purple-500",
  },
  {
    title: "Smart Resume Tips",
    icon: <Sparkles size={28} className="text-white" />,
    description: "Instant improvement tips powered by machine learning.",
    color: "bg-gradient-to-tr from-pink-500 to-rose-500",
  },
  {
    title: "Secure Upload & Parse",
    icon: <ShieldCheck size={28} className="text-white" />,
    description: "Your resume data is safe and parsed with precision.",
    color: "bg-gradient-to-tr from-teal-500 to-green-500",
  },
  {
    title: "One-click Preview",
    icon: <FileText size={28} className="text-white" />,
    description: "Preview changes in real-time without reloading.",
    color: "bg-gradient-to-tr from-yellow-500 to-orange-500",
  },
  {
    title: "Magic Resume Builder",
    icon: <Wand2 size={28} className="text-white" />,
    description: "Build your resume in minutes with our guided builder.",
    color: "bg-gradient-to-tr from-cyan-500 to-sky-500",
  },
  {
    title: "ATS Friendly Checker",
    icon: <BadgeCheck size={28} className="text-white" />,
    description: "Check if your resume passes Applicant Tracking Systems.",
    color: "bg-gradient-to-tr from-fuchsia-500 to-violet-500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function Features() {
  return (
     <div className="mx-auto pt-6 mt-10">
    {/* <section className="bg-white py-20 px-6 md:px-20 relative overflow-hidden"> */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Our Resume Tool?
        </motion.h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Unlock powerful features designed to maximize your hiring potential.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${feature.color}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-500">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    {/* </section> */}
    </div>
  );
}
