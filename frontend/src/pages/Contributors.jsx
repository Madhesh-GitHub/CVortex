import React from 'react';
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
  { name: "Madhesh K", github: "https://github.com/Madhesh-GitHub", photo: madhesh },
  { name: "Vaishali Kadam", github: "https://github.com/Vaishali-Kadam", photo: vaishali },
  { name: "Shilpa", github: "https://github.com/shilpa053020", photo: shilpa },
  { name: "Deepika A", github: "https://github.com/DeepikaA777", photo: deepika },
  { name: "Uvajanani", github: "https://github.com/Uvajanani", photo: uvajanani },
  { name: "Alagu Nandhini", github: "https://github.com/alagunandhini", photo: nandhini },
  { name: "Payel", github: "https://github.com/Payel647", photo: payel },
  { name: "Sanjay Ramesh", github: "https://github.com/sanjay-ramesh94", photo: sanjay },
  { name: "Monisa", github: "https://github.com/Monisa46", photo: monisa },
  { name: "Nikitha S Nair", github: "https://github.com/NikithaSNair", photo: nikitha },
  { name: "Karthikeya", github: "https://github.com/karthikeyavb", photo: karthik },
  { name: "Dhanush Suresh", github: "https://github.com/Dhanush33-alts", photo: dhanush },
  { name: "Shiva Gurumurthy", github: "https://github.com/ShivaGurumurthy", photo: shiva },
];

export default function Contributors() {
  return (
    <div className="bg-background min-h-screen px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Contributors</h1>
        <p className="mt-2 text-textMuted max-w-xl mx-auto">
          Thanks to everyone who contributed to this project!
        </p>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {contributors.map((person, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300 w-52"
            >
              <img
                src={person.photo}
                alt={person.name}
                className="h-48 w-48 rounded-lg object-cover max-w-full"
              />
              <h3 className="mt-4 font-semibold text-textPrimary">{person.name}</h3>
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-secondary hover:underline"
              >
                GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </div>
  );
}
