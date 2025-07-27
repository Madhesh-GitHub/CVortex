import React, { useRef } from 'react';
import {
  FiSearch,
  FiLayout,
  FiBarChart2,
  FiTarget,
  FiCpu,
  FiShield,
} from 'react-icons/fi';
import { motion, useInView } from 'framer-motion';
import './WhyChoose.css';

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 18,
    },
  },
};

const features = [
  {
    icon: <FiSearch size={24} />,
    title: 'Keyword Optimization',
    description:
      'Our AI identifies industry-specific keywords missing from your resume and suggests optimal placement.',
  },
  {
    icon: <FiLayout size={24} />,
    title: 'Format Analysis',
    description:
      "We check your resume's formatting to ensure it's readable by all ATS platforms without information loss.",
  },
  {
    icon: <FiBarChart2 size={24} />,
    title: 'Performance Metrics',
    description:
      "Track your resume's improvement over time with detailed analytics and scoring metrics.",
  },
  {
    icon: <FiTarget size={24} />,
    title: 'Job-Specific Tailoring',
    description:
      'Customize your resume for specific job descriptions to maximize your match percentage.',
  },
  {
    icon: <FiCpu size={24} />,
    title: 'AI-Powered Suggestions',
    description:
      'Get intelligent content recommendations to strengthen your professional narrative.',
  },
  {
    icon: <FiShield size={24} />,
    title: 'Privacy Protection',
    description:
      'Your resume data is encrypted and never shared with third parties or potential employers.',
  },
];

const WhyChoose = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, amount: 0.2 });

  return (
    <motion.section
      className="why-choose-section"
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.h2 className="why-heading" variants={cardVariants}>
        Why Choose Our ATS Resume Checker
      </motion.h2>
      <motion.p className="why-subtext" variants={cardVariants}>
        Join thousands of job seekers who have improved their application success rate.
      </motion.p>

      <div className="feature-grid">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="feature-card"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-wrapper text-indigo-600">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyChoose;
