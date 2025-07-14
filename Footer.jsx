import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/20 border-t border-white/10 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">CVortex</h3>
            <p className="text-muted-foreground leading-relaxed">
              Use our advanced AI tool to optimize your resume and increase your chances of landing your dream job.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Blog</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-foreground">Resources</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Resume Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">ATS Tips</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Career Advice</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-foreground">Support</h4>
            <div className="space-y-3 text-muted-foreground">
              <p>Email: support@cvortex.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Available 24/7</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; {currentYear} CVortex. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;