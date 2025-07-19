
import { motion } from "framer-motion";

const BlogHero = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-sky-600 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Level Up Your <span className="text-sky-200">Resume Game</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-4xl mx-auto">
            Stay updated with the latest ATS resume tips, industry trends, and recruiter insights to 
            accelerate your career growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
