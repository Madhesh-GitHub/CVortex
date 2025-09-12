import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


// Images
import nandhini from '../assets/Nandhini.jpg';
import dhanush from '../assets/Dhanush.jpg';
import payel from '../assets/Payel.jpg';
import sanjay from '../assets/Sanjay.jpg';
import madhesh from '../assets/Madhesh.jpg';
import deepika from '../assets/Deepika.jpg';
import uvajanani from '../assets/Uvajanani.jpg';
import monisa from '../assets/Monisa.jpg';
import karthik from '../assets/Karthik.jpg';
import nikitha from '../assets/Nikhita.jpg';
import shilpa from '../assets/Shilpa.jpg';
import vaishali from '../assets/Vaishali.jpg';
import shiva from '../assets/Shiva.jpg';

const contributors = [
  {
    name: "Madhesh K",
    github: "https://github.com/Madhesh-GitHub",
    linkedin: "https://www.linkedin.com/in/its-madhesh/",
    photo: madhesh
  },
  {
    name: "Alagu Nandhini M",
    github: "https://github.com/alagunandhini",
    linkedin: "https://www.linkedin.com/in/alagunandhini/",
    photo: nandhini
  },
  {
    name: "Uvajanani RP",
    github: "https://github.com/Uvajanani",
    linkedin: "https://www.linkedin.com/in/uvajanani/",
    photo: uvajanani
  },
  {
    name: "Shilpa",
    github: "https://github.com/shilpa053020",
    linkedin: "https://www.linkedin.com/in/shilpa05",
    photo: shilpa
  },
  {
    name: "Deepika A",
    github: "https://github.com/DeepikaA777",
    linkedin: "https://www.linkedin.com/in/deepika-a-21754b302/",
    photo: deepika
  },
  
  
  {
    name: "Payel",
    github: "https://github.com/Payel647",
    linkedin: "https://www.linkedin.com/in/payel-mallick-9292a92a3/",
    photo: payel
  },
  {
    name: "Sanjay Ramesh",
    github: "https://github.com/sanjay-ramesh94",
    linkedin: "https://www.linkedin.com/in/sanjay-ramesh-i-9aa720291/",
    photo: sanjay
  },
  {
    name: "Monisa",
    github: "https://github.com/Monisa46",
    linkedin: "https://www.linkedin.com/in/monisa-r-17a41228b/",
    photo: monisa
  },
  {
    name: "Nikitha S Nair",
    github: "https://github.com/NikithaSNair",
    linkedin: "https://www.linkedin.com/in/nikitha-s-nair-b111882b6/",
    photo: nikitha
  },
  {
    name: "Karthikeya",
    github: "https://github.com/karthikeyavb",
    linkedin: "https://www.linkedin.com/in/bala-karthikeya-08716b2b2/",
    photo: karthik
  },
  {
    name: "Dhanush Suresh",
    github: "https://github.com/Dhanush33-alt",
    linkedin: "https://www.linkedin.com/in/dhanush-suresh-957b0426a/",
    photo: dhanush
  },
  {
    name: "Shiva Gurumurthy",
    github: "https://github.com/ShivaGurumurthy",
    linkedin: "https://www.linkedin.com/in/shiva-gurumurthy-221278298/",
    photo: shiva
  },
  {
    name: "Vaishali Kadam",
    github: "https://github.com/Vaishali-Kadam",
    linkedin: "https://www.linkedin.com/in/vaishali-kadam-529295305/",
    photo: vaishali
  },
];

export default function Contributors() {
      const navigate = useNavigate();

  return (


    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee]">
    <button
  onClick={() => navigate('/')}
  className="absolute top-6 left-6 p-3 rounded-full bg-white/80 backdrop-blur-md 
             shadow-md hover:shadow-xl transition-all duration-300 
             hover:bg-gray-100 text-gray-700 hover:text-black text-2xl"
  aria-label="Back to Home"
>
  <FaHome />
</button>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 tracking-tight mb-3">Contributors</h1>
        <p className="text-gray-600 max-w-xl mx-auto">We appreciate every contributor who helped shape this project.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 place-items-center">
        {contributors.map((person, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-5 w-60 text-center transition-all"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={person.photo}
                alt={person.name}
                className="h-48 w-48 object-cover rounded-lg mx-auto transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-semibold text-gray-800 text-base">{person.name}</h3>

            <div className="mt-2 flex items-center justify-center gap-4">
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black text-xl"
              >
                <FaGithub />
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-xl"
              >
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
