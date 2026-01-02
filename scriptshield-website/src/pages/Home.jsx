// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Cpu, Zap, Eye, Brain, 
  Fingerprint, FileCode, ShieldCheck, Server,
  Users, Clock, Award, ChevronRight
} from 'lucide-react';

const Home = () => {
  const stats = [
    { value: '99.99%', label: 'Uptime', icon: Clock },
    { value: '2.5M+', label: 'Scripts Protected', icon: Shield },
    { value: '50K+', label: 'Active Users', icon: Users },
    { value: '256-bit', label: 'Encryption', icon: Lock },
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Anti-Debug Protection',
      description: 'Advanced timing checks and execution monitoring prevent debugger attachment',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Memory Protection',
      description: 'Isolated memory space with checksum verification prevents tampering',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FileCode,
      title: 'String Encryption',
      description: 'Dynamic XOR encryption keeps sensitive data hidden from reverse engineering',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Runtime Protection',
      description: 'Real-time monitoring and threat detection during script execution',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Eye,
      title: 'Call Protection',
      description: 'Monitors and secures all function calls within the protected environment',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Fingerprint,
      title: 'Integrity Verification',
      description: 'SHA-256 hashing ensures script integrity before execution',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Award className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">Enterprise Grade Security</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Military-Grade
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Script Protection
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Secure your applications with 10 layers of advanced protection, preventing reverse engineering, tampering, and unauthorized access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/loader">
                <button className="btn-primary flex items-center space-x-2">
                  <span>Get Started</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/docs">
                <button className="btn-secondary flex items-center space-x-2">
                  <span>View Documentation</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              10 Layers of Advanced Protection
            </h2>
            <p className="text-xl text-text-secondary">
              Comprehensive security measures to protect your intellectual property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="neon-border p-8 md:p-12 text-center">
            <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Secure Your Code?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of developers who trust ScriptShield for their application security
            </p>
            <Link to="/loader">
              <button className="btn-primary text-lg px-8 py-4">
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;