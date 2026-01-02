// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Target, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">About ScriptShield</h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Leading the industry in application security and intellectual property protection
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-text-secondary">
              To provide enterprise-grade security solutions that protect intellectual property from reverse engineering, tampering, and unauthorized access. We believe in making advanced security accessible to all developers.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Security First</h2>
            </div>
            <p className="text-text-secondary">
              Our platform is built with security at its core. From encrypted communications to runtime protection, every layer is designed to withstand even the most sophisticated attacks.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Global Reach</h2>
            </div>
            <p className="text-text-secondary">
              Trusted by over 50,000 developers worldwide, protecting millions of scripts daily. Our infrastructure spans multiple continents for maximum availability and performance.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">24/7 Protection</h2>
            </div>
            <p className="text-text-secondary">
              Our security operations center monitors threats around the clock, with automated response systems that react to suspicious activities in real-time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;