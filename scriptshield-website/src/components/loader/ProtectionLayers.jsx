import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Cpu, Lock, Brain, Zap, Eye,
  FileCode, Fingerprint, ShieldCheck, Server,
  Info, Settings
} from 'lucide-react';

const ProtectionLayers = () => {
  const [expandedLayer, setExpandedLayer] = useState(null);

  const protectionLayers = [
    {
      id: 1,
      name: 'Environment Protection',
      icon: Shield,
      status: true,
      description: 'Prevents script execution in unauthorized environments by checking system signatures and runtime conditions.',
      details: 'Validates environment variables, process names, and runtime flags to ensure execution only in trusted contexts.'
    },
    {
      id: 2,
      name: 'Anti-Debug',
      icon: Cpu,
      status: true,
      description: 'Detects and prevents debugger attachment using timing checks and execution monitoring.',
      details: 'Uses hardware breakpoint detection, timing discrepancies, and debug register monitoring to identify debugging attempts.'
    },
    {
      id: 3,
      name: 'Anti-Tamper',
      icon: Lock,
      status: true,
      description: 'Prevents code modification during runtime with integrity checks and memory protection.',
      details: 'Implements CRC32 checksums, memory page protection, and real-time code signature verification.'
    },
    {
      id: 4,
      name: 'Memory Protection',
      icon: Brain,
      status: true,
      description: 'Isolated memory space with checksum verification prevents unauthorized access and tampering.',
      details: 'Uses virtual memory isolation, heap encryption, and pointer obfuscation to secure sensitive data.'
    },
    {
      id: 5,
      name: 'Anti-Hook',
      icon: Zap,
      status: true,
      description: 'Detects and prevents function hooking attempts by monitoring API calls and function pointers.',
      details: 'Monitors IAT/EAT tables, checks function prologs, and validates import addresses for hook detection.'
    },
    {
      id: 6,
      name: 'Call Protection',
      icon: Eye,
      status: true,
      description: 'Monitors and secures all function calls within the protected environment.',
      details: 'Implements call stack validation, return address checks, and control flow integrity verification.'
    },
    {
      id: 7,
      name: 'String Encryption',
      icon: FileCode,
      status: true,
      description: 'Dynamic XOR encryption keeps sensitive data hidden from reverse engineering attempts.',
      details: 'Uses runtime decryption, string pooling, and constant folding to protect string literals.'
    },
    {
      id: 8,
      name: 'Integrity Hash',
      icon: Fingerprint,
      status: true,
      description: 'SHA-256 hashing ensures script integrity before and during execution.',
      details: 'Performs continuous hash verification, memory checksums, and runtime integrity validation.'
    },
    {
      id: 9,
      name: 'Runtime Protection',
      icon: ShieldCheck,
      status: true,
      description: 'Real-time monitoring and threat detection during script execution.',
      details: 'Implements behavior analysis, anomaly detection, and automated threat response systems.'
    },
    {
      id: 10,
      name: 'Encryption Layer',
      icon: Server,
      status: true,
      description: 'End-to-end encryption for all communications and stored data.',
      details: 'Uses AES-256 encryption for network traffic and ChaCha20 for local data protection.'
    },
  ];

  const toggleLayer = (id) => {
    setExpandedLayer(expandedLayer === id ? null : id);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Active Protection Layers</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-status-success rounded-full animate-pulse"></div>
          <span className="text-status-success">All Systems Active</span>
        </div>
      </div>

      <div className="space-y-3">
        {protectionLayers.map((layer) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: layer.id * 0.05 }}
            className="protection-layer cursor-pointer"
            onClick={() => toggleLayer(layer.id)}
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className={`p-2 rounded-lg ${layer.status ? 'bg-status-success/20' : 'bg-status-danger/20'}`}>
                <layer.icon className={`w-5 h-5 ${layer.status ? 'text-status-success' : 'text-status-danger'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{layer.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${layer.status ? 'bg-status-success/20 text-status-success' : 'bg-status-danger/20 text-status-danger'}`}>
                      {layer.status ? 'Active' : 'Inactive'}
                    </span>
                    <Info className="w-4 h-4 text-text-secondary" />
                  </div>
                </div>
                <p className="text-sm text-text-secondary mt-1">{layer.description}</p>
              </div>
            </div>

            {expandedLayer === layer.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="col-span-full mt-4 p-4 bg-background-secondary/50 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <Settings className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-2">Technical Details</h4>
                    <p className="text-sm text-text-secondary">{layer.details}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                        Layer {layer.id}
                      </span>
                      <span className="text-xs px-2 py-1 bg-background-tertiary text-text-secondary rounded-full">
                        Priority: {layer.id <= 3 ? 'High' : layer.id <= 7 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Last security audit: {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">All protections active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectionLayers;