import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ScriptShield
                </h2>
                <p className="text-sm text-text-secondary">Enterprise Security</p>
              </div>
            </Link>
            <p className="text-text-secondary text-sm">
              Military-grade script protection with 10 layers of security.
              Trusted by thousands of developers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="p-2 bg-background-tertiary rounded-lg hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-text-secondary hover:text-primary" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-background-tertiary rounded-lg hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-text-secondary hover:text-primary" />
              </a>
              <a href="mailto:support@scriptshield.com"
                 className="p-2 bg-background-tertiary rounded-lg hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-text-secondary hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/loader" className="text-text-secondary hover:text-primary transition-colors flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Loader
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-text-secondary hover:text-primary transition-colors flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-text-secondary hover:text-primary transition-colors flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-text-secondary hover:text-primary transition-colors flex items-center">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/blog" className="text-text-secondary hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/tutorials" className="text-text-secondary hover:text-primary transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="/api-reference" className="text-text-secondary hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="/status" className="text-text-secondary hover:text-primary transition-colors">
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/security" className="text-text-secondary hover:text-primary transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="/compliance" className="text-text-secondary hover:text-primary transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            © {currentYear} ScriptShield. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-text-secondary">
              <span className="w-2 h-2 bg-status-success rounded-full inline-block mr-2 animate-pulse"></span>
              System Status: <span className="text-status-success">Operational</span>
            </span>
            <span className="text-sm text-text-secondary">
              v2.1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;