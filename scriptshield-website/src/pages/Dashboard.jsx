// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Shield, Key, Download, Clock,
  Users, AlertTriangle, BarChart3, Settings,
  Copy, Eye, EyeOff, RefreshCw, Calendar
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
  const [apiKey, setApiKey] = useState('sk_live_**************************');
  const [showApiKey, setShowApiKey] = useState(false);
  const [usageData, setUsageData] = useState([]);
  const [threatData, setThreatData] = useState([]);

  // Mock data for charts
  useEffect(() => {
    // Usage data
    const usage = [];
    for (let i = 1; i <= 30; i++) {
      usage.push({
        day: `Day ${i}`,
        requests: Math.floor(Math.random() * 1000) + 500,
        scripts: Math.floor(Math.random() * 500) + 200,
      });
    }
    setUsageData(usage);

    // Threat data
    const threats = [
      { name: 'Debug Attempts', value: 45, color: '#ff3366' },
      { name: 'Tampering', value: 28, color: '#ffaa00' },
      { name: 'Memory Scans', value: 18, color: '#00d9ff' },
      { name: 'Hook Attempts', value: 9, color: '#b026ff' },
    ];
    setThreatData(threats);
  }, []);

  const recentActivities = [
    { id: 1, type: 'script_load', description: 'Protected script loaded', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'api_key', description: 'API key regenerated', time: '1 hour ago', status: 'info' },
    { id: 3, type: 'threat_blocked', description: 'Debugger detected and blocked', time: '3 hours ago', status: 'warning' },
    { id: 4, type: 'script_load', description: 'Batch script execution', time: '5 hours ago', status: 'success' },
    { id: 5, type: 'whitelist', description: 'New IP whitelisted', time: '1 day ago', status: 'info' },
  ];

  const quickStats = [
    { label: 'Total Scripts Loaded', value: '12,847', change: '+12%', icon: Download },
    { label: 'Active Sessions', value: '142', change: '+5%', icon: Users },
    { label: 'Threats Blocked', value: '456', change: '-8%', icon: Shield },
    { label: 'Uptime', value: '99.99%', change: '0%', icon: Activity },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-text-secondary">Monitor your script usage and security metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - API Key & Quick Stats */}
        <div className="space-y-8">
          {/* API Key Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Key className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">API Key</h2>
              </div>
              <button className="text-sm text-primary hover:text-primary-dark">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Live Key</span>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="text-xs text-primary hover:text-primary-dark"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  readOnly
                  className="input-field pr-12 font-mono"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(apiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">Requests Today</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Rate Limit</span>
                <span className="font-medium">10,000/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Expires</span>
                <span className="font-medium">Never</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Quick Stats</h2>
            <div className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={stat.label} className="flex items-center justify-between p-3 bg-background-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-background-tertiary rounded-lg">
                      <stat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{stat.label}</div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </div>
                  </div>
                  <div className={`text-sm ${stat.change.startsWith('+') ? 'text-status-success' : stat.change.startsWith('-') ? 'text-status-danger' : 'text-text-secondary'}`}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Threat Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Threat Distribution</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {threatData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {threatData.map((threat) => (
                <div key={threat.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: threat.color }} />
                  <span className="text-sm text-text-secondary">{threat.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Charts & Activities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Usage Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">Usage Analytics (30 Days)</h2>
              </div>
              <button className="text-sm text-primary hover:text-primary-dark flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Last 30 days</span>
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="day" stroke="#a0aec0" />
                  <YAxis stroke="#a0aec0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e2344',
                      borderColor: '#00d9ff',
                      color: '#ffffff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stackId="1"
                    stroke="#00d9ff"
                    fill="url(#colorRequests)"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="scripts"
                    stackId="2"
                    stroke="#b026ff"
                    fill="url(#colorScripts)"
                    fillOpacity={0.3}
                  />
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorScripts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b026ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#b026ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-text-secondary">HTTP Requests</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm text-text-secondary">Scripts Loaded</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">Recent Activities</h2>
              </div>
              <button className="text-sm text-primary hover:text-primary-dark">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-background-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activity.status === 'success' ? 'bg-status-success/20' :
                      activity.status === 'warning' ? 'bg-status-warning/20' :
                      'bg-primary/20'
                    }`}>
                      {activity.type === 'script_load' && <Download className="w-4 h-4" />}
                      {activity.type === 'api_key' && <Key className="w-4 h-4" />}
                      {activity.type === 'threat_blocked' && <Shield className="w-4 h-4" />}
                      {activity.type === 'whitelist' && <Settings className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-medium">{activity.description}</div>
                      <div className="text-sm text-text-secondary">{activity.time}</div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'success' ? 'bg-status-success/20 text-status-success' :
                    activity.status === 'warning' ? 'bg-status-warning/20 text-status-warning' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Security Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background-secondary/50 rounded-lg">
                <div>
                  <div className="font-medium">IP Whitelisting</div>
                  <div className="text-sm text-text-secondary">Restrict access to specific IP addresses</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-background-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-background-secondary/50 rounded-lg">
                <div>
                  <div className="font-medium">Rate Limiting</div>
                  <div className="text-sm text-text-secondary">Prevent abuse by limiting requests</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-background-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-background-secondary/50 rounded-lg">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-text-secondary">Receive alerts for suspicious activities</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-background-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;