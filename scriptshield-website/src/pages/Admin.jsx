import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Users, Shield, Key, BarChart3,
  AlertTriangle, Lock, Database, Globe, Bell,
  Search, Filter, Download, Eye, Edit, Trash2,
  Plus, Check, X
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, email: 'admin@example.com', tier: 'enterprise', status: 'active', joined: '2024-01-15', requests: 12457 },
    { id: 2, email: 'user@company.com', tier: 'premium', status: 'active', joined: '2024-02-01', requests: 8456 },
    { id: 3, email: 'dev@startup.io', tier: 'basic', status: 'suspended', joined: '2024-01-20', requests: 124 },
    { id: 4, email: 'security@corp.com', tier: 'enterprise', status: 'active', joined: '2024-01-10', requests: 25684 },
    { id: 5, email: 'test@domain.com', tier: 'free', status: 'active', joined: '2024-02-15', requests: 42 },
  ];

  const apiKeys = [
    { id: 1, key: 'sk_live_************1234', name: 'Production', created: '2024-01-15', lastUsed: '2024-02-20', rateLimit: '10k/day' },
    { id: 2, key: 'sk_test_************5678', name: 'Staging', created: '2024-02-01', lastUsed: '2024-02-19', rateLimit: '1k/day' },
    { id: 3, key: 'sk_dev_************9012', name: 'Development', created: '2024-02-10', lastUsed: '2024-02-20', rateLimit: '100/day' },
  ];

  const securityEvents = [
    { id: 1, type: 'threat', severity: 'high', description: 'Brute force attack detected', ip: '192.168.1.100', time: '2024-02-20 14:30' },
    { id: 2, type: 'warning', severity: 'medium', description: 'Multiple failed auth attempts', ip: '10.0.0.50', time: '2024-02-20 12:15' },
    { id: 3, type: 'info', severity: 'low', description: 'API key rotation', ip: '172.16.0.10', time: '2024-02-20 10:00' },
    { id: 4, type: 'threat', severity: 'critical', description: 'DDoS attempt blocked', ip: '203.0.113.5', time: '2024-02-19 22:45' },
  ];

  const tabs = [
    { id: 'users', name: 'Users', icon: Users },
    { id: 'keys', name: 'API Keys', icon: Key },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-status-danger text-white';
      case 'high': return 'bg-status-danger/20 text-status-danger';
      case 'medium': return 'bg-status-warning/20 text-status-warning';
      case 'low': return 'bg-primary/20 text-primary';
      default: return 'bg-background-tertiary text-text-secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-text-secondary">Manage users, monitor security, and configure system settings</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm text-text-secondary">Total Users</span>
          </div>
          <div className="text-2xl font-bold">5,248</div>
          <div className="text-xs text-status-success mt-1">↑ 12% this month</div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-sm text-text-secondary">Active Sessions</span>
          </div>
          <div className="text-2xl font-bold">1,427</div>
          <div className="text-xs text-status-success mt-1">↑ 5% today</div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-status-warning" />
            <span className="text-sm text-text-secondary">Threats (24h)</span>
          </div>
          <div className="text-2xl font-bold">124</div>
          <div className="text-xs text-status-danger mt-1">↓ 8% from yesterday</div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <Database className="w-5 h-5 text-primary" />
            <span className="text-sm text-text-secondary">Storage Used</span>
          </div>
          <div className="text-2xl font-bold">84%</div>
          <div className="text-xs text-status-warning mt-1">↑ 2% this week</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-card overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Search Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New</span>
              </button>
            </div>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">User</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Tier</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Joined</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Requests</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="font-medium">{user.email}</div>
                        <div className="text-sm text-text-secondary">ID: {user.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.tier === 'enterprise' ? 'bg-primary/20 text-primary' :
                          user.tier === 'premium' ? 'bg-secondary/20 text-secondary' :
                          user.tier === 'basic' ? 'bg-status-success/20 text-status-success' :
                          'bg-text-secondary/20 text-text-secondary'
                        }`}>
                          {user.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            user.status === 'active' ? 'bg-status-success' : 'bg-status-danger'
                          }`} />
                          <span>{user.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{user.joined}</td>
                      <td className="py-3 px-4">{user.requests.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-white/10 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-white/10 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-white/10 rounded text-status-danger">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'keys' && (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="p-4 bg-background-secondary/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium">{key.name}</div>
                      <div className="text-sm text-text-secondary font-mono">{key.key}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-status-success" />
                      <span className="text-sm text-status-success">Active</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-text-secondary">Created</div>
                      <div>{key.created}</div>
                    </div>
                    <div>
                      <div className="text-text-secondary">Last Used</div>
                      <div>{key.lastUsed}</div>
                    </div>
                    <div>
                      <div className="text-text-secondary">Rate Limit</div>
                      <div>{key.rateLimit}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div key={event.id} className="p-4 bg-background-secondary/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{event.description}</div>
                      <div className="text-sm text-text-secondary">IP: {event.ip}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(event.severity)}`}>
                      {event.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary">{event.time}</div>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-text-secondary">Detailed analytics and reporting coming soon</p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">System Configuration</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-background-secondary/50 rounded-lg">
                    <div>
                      <div className="font-medium">Maintenance Mode</div>
                      <div className="text-sm text-text-secondary">Disable public access</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-background-tertiary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background-secondary/50 rounded-lg">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-text-secondary">Send alerts for security events</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-background-tertiary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background-secondary/50 rounded-lg">
                    <div>
                      <div className="font-medium">Auto-backup</div>
                      <div className="text-sm text-text-secondary">Daily database backups</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-background-tertiary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;