import React, { useRef } from 'react';
import { FiUploadCloud, FiBarChart2, FiSettings } from 'react-icons/fi';
import { motion, useInView } from 'framer-motion';
import './HowItWorks.css';

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, amount: 0.3 });

  const steps = [
    {
      icon: <FiUploadCloud size={32} color="white" />,
      title: '1. Upload',
      desc: 'Upload your resume in PDF, DOCX, or TXT. We analyze structure and content.',
    },
    {
      icon: <FiBarChart2 size={32} color="white" />,
      title: '2. Score',
      desc: 'Get your ATS compatibility score with keyword and format suggestions.',
    },
    {
      icon: <FiSettings size={32} color="white" />,
      title: '3. Improve',
      desc: 'Apply AI-powered suggestions and boost interview chances.',
    },
  ];

  return (
    <motion.div
      className="how-it-works"
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.h2
        className="how-heading"
        variants={stepVariants}
      >
        How It Works
      </motion.h2>

      <motion.p
        className="how-subtext"
        variants={stepVariants}
      >
        Our 3-step process boosts your resume’s success with applicant tracking systems.
      </motion.p>

      <div className="steps">
        {steps.map((step, index) => (
          <motion.div
            className="step"
            key={index}
            variants={stepVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default HowItWorks;
