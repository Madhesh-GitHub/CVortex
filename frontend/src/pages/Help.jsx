import React, { useState } from "react";

const faqs = [
    {
    question: "Is it free to use the ATS?",
    answer: "Yes, our ATS is completely free to use with unlimited resume checks.",
  },
  {
    question: "How does the resume score work?",
    answer: "The resume score is based on keyword relevance, formatting, length, and ATS compatibility.",
  },
   {
    question: "How do I contact support?",
    answer: "Scroll to the bottom and use the 'Contact Us' button to reach out via email.",
  },
  {
    question: "Is my data stored securely?",
    answer: "Yes. We use encrypted storage for any saved data and never share your information.",
  },
];

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with Axios call
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto pt-6 mt-10">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">Help & Support</h1>
      <p className="text-center mb-10 text-gray-600">Find answers to your questions or contact us directly.</p>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b py-3">
            <button
              className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-800"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>

      {/* Live Chat Placeholder */}
      <div className="bg-blue-50 p-6 rounded-xl shadow-sm mb-12 text-center">
        <h2 className="text-xl font-semibold text-blue-700">Need more help?</h2>
        <p className="text-gray-700 mt-2 mb-4">Click below to talk with our team.</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Start Live Chat (Coming Soon)
        </button>
      </div>

      {/* Contact Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="p-3 border border-gray-300 rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="p-3 border border-gray-300 rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <textarea
            placeholder="Your Message"
            required
            className="p-3 border border-gray-300 rounded-lg h-32"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpPage;
