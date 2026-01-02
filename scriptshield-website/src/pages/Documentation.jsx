// src/pages/Documentation.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, FileText, Terminal, Zap, Shield } from 'lucide-react';

const Documentation = () => {
  const sections = [
    {
      title: 'Getting Started',
      icon: Zap,
      items: ['Quick Start Guide', 'Installation', 'Basic Configuration']
    },
    {
      title: 'API Reference',
      icon: Code,
      items: ['Authentication', 'Endpoints', 'Error Codes', 'Rate Limits']
    },
    {
      title: 'Security Features',
      icon: Shield,
      items: ['Protection Layers', 'Configuration', 'Best Practices', 'Troubleshooting']
    },
    {
      title: 'Integration',
      icon: Terminal,
      items: ['Web Integration', 'Desktop Apps', 'Mobile Apps', 'CLI Tools']
    },
    {
      title: 'Advanced',
      icon: Book,
      items: ['Custom Obfuscation', 'Performance Tuning', 'Security Auditing', 'Monitoring']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Comprehensive guides and references for integrating ScriptShield into your applications
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <section.icon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-center space-x-2 text-text-secondary hover:text-text-primary cursor-pointer">
                  <FileText className="w-4 h-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Documentation;