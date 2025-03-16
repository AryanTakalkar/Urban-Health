
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Urban Health</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
              AI-powered platform for urban health resilience, emergency response, and mental health support in Mumbai.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/map" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    Health Map
                  </Link>
                </li>
                <li>
                  <Link to="/sos" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    Emergency SOS
                  </Link>
                </li>
                <li>
                  <Link to="/chatbot" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    Mental Health Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Emergency Contact</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For immediate emergency assistance, please call:
            </p>
            <p className="font-semibold text-danger">112 (Emergency Response)</p>
            <p className="font-semibold text-primary">1800-121-3721 (Mental Health Helpline)</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {currentYear} Urban Health Resilience Platform. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
              Made with <Heart size={12} className="mx-1 text-danger" /> for Mumbai
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
