import { FiSearch, FiLayout, FiBarChart2, FiTarget, FiCpu, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FiSearch size={24} />,
    title: 'Keyword Optimization',
    description: 'Our AI identifies industry-specific keywords missing from your resume and suggests optimal placement.',
  },
  {
    icon: <FiLayout size={24} />,
    title: 'Format Analysis',
    description: 'We check your resume\'s formatting to ensure it\'s readable by all ATS platforms without information loss.',
  },
  {
    icon: <FiBarChart2 size={24} />,
    title: 'Performance Metrics',
    description: 'Track your resume\'s improvement over time with detailed analytics and scoring metrics.',
  },
  {
    icon: <FiTarget size={24} />,
    title: 'Job-Specific Tailoring',
    description: 'Customize your resume for specific job descriptions to maximize your match percentage.',
  },
  {
    icon: <FiCpu size={24} />,
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent content recommendations to strengthen your professional narrative.',
  },
  {
    icon: <FiShield size={24} />,
    title: 'Privacy Protection',
    description: 'Your resume data is encrypted and never shared with third parties or potential employers.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Whychoose = () => {
  return (
    <section className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] py-20">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Why Choose our ATS Resume Checker
        </h2>
        <p className="text-md sm:text-lg text-gray-600">
          Join thousands of job seekers who have improved their application success rate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 sm:px-16 mt-14 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow transition-transform transform hover:-translate-y-1 hover:shadow-xl hover:border-indigo-500"
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 text-indigo-600 mb-4">
              {feature.icon}
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Whychoose;
