import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Server, Users, Clock, Activity, Shield,
  AlertTriangle, TrendingUp, Database, Globe
} from 'lucide-react';

const StatusBoard = () => {
  const [systemStatus, setSystemStatus] = useState({
    online: true,
    uptime: '99.99%',
    activeUsers: 1427,
    threatsBlocked: 12456,
    responseTime: '24ms',
    totalScripts: 28451,
    memoryUsage: '42%',
    cpuLoad: '18%'
  });

  const [recentEvents, setRecentEvents] = useState([
    { id: 1, type: 'success', message: 'System backup completed', time: '2 min ago' },
    { id: 2, type: 'info', message: 'API rate limit increased', time: '15 min ago' },
    { id: 3, type: 'warning', message: 'High load detected on server US-West', time: '1 hour ago' },
    { id: 4, type: 'success', message: 'Security patch v2.0.1 deployed', time: '3 hours ago' },
    { id: 5, type: 'info', message: 'New user registered', time: '5 hours ago' },
  ]);

  const [statsHistory, setStatsHistory] = useState([]);

  useEffect(() => {
    // Generate mock historical data
    const history = [];
    for (let i = 23; i >= 0; i--) {
      const hour = new Date();
      hour.setHours(hour.getHours() - i);
      history.push({
        time: hour.getHours().toString().padStart(2, '0') + ':00',
        requests: Math.floor(Math.random() * 1000) + 500,
        threats: Math.floor(Math.random() * 50),
        users: Math.floor(Math.random() * 200) + 1000
      });
    }
    setStatsHistory(history);
  }, []);

  const getStatusColor = (value, type = 'default') => {
    if (type === 'uptime') {
      return value === '99.99%' ? 'text-status-success' : 'text-status-warning';
    }
    if (type === 'response') {
      return parseInt(value) < 50 ? 'text-status-success' : 'text-status-warning';
    }
    return 'text-text-primary';
  };

  const getStatusIcon = (value, type = 'default') => {
    if (type === 'uptime') {
      return value === '99.99%' ? '🟢' : '🟡';
    }
    if (type === 'response') {
      return parseInt(value) < 50 ? '⚡' : '🐌';
    }
    return '✅';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Server className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">System Status</h2>
      </div>

      {/* Main Status Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-background-secondary/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${systemStatus.online ? 'bg-status-success animate-pulse' : 'bg-status-danger'}`} />
              <span className="text-sm text-text-secondary">Status</span>
            </div>
            <Activity className="w-4 h-4 text-text-secondary" />
          </div>
          <div className="text-2xl font-bold">
            {systemStatus.online ? 'Online' : 'Offline'}
          </div>
        </div>

        <div className="p-4 bg-background-secondary/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">Uptime</span>
            </div>
            <span className="text-xs text-text-secondary">30 days</span>
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(systemStatus.uptime, 'uptime')}`}>
            {systemStatus.uptime}
          </div>
        </div>

        <div className="p-4 bg-background-secondary/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">Active Users</span>
            </div>
            <TrendingUp className="w-4 h-4 text-status-success" />
          </div>
          <div className="text-2xl font-bold">
            {systemStatus.activeUsers.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-background-secondary/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">Response Time</span>
            </div>
            <span className="text-xs text-text-secondary">avg</span>
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(systemStatus.responseTime, 'response')}`}>
            {systemStatus.responseTime}
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center space-x-2">
            <Database className="w-4 h-4 text-primary" />
            <span>System Resources</span>
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Memory Usage</span>
                <span className="font-medium">{systemStatus.memoryUsage}</span>
              </div>
              <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: systemStatus.memoryUsage }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">CPU Load</span>
                <span className="font-medium">{systemStatus.cpuLoad}</span>
              </div>
              <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: systemStatus.cpuLoad }}
                  className="h-full bg-gradient-to-r from-secondary to-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold flex items-center space-x-2">
            <Globe className="w-4 h-4 text-primary" />
            <span>Global Statistics</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-background-secondary/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-4 h-4 text-status-warning" />
                <span className="text-sm">Threats Blocked</span>
              </div>
              <span className="text-xl font-bold text-status-success">
                {systemStatus.threatsBlocked.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-background-secondary/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm">Total Scripts</span>
              </div>
              <span className="text-xl font-bold">
                {systemStatus.totalScripts.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div>
        <h3 className="font-semibold mb-4">Recent Events</h3>
        <div className="space-y-2">
          {recentEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-3 bg-background-secondary/30 rounded-lg hover:bg-background-secondary/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  event.type === 'success' ? 'bg-status-success' :
                  event.type === 'warning' ? 'bg-status-warning' :
                  event.type === 'danger' ? 'bg-status-danger' :
                  'bg-primary'
                }`} />
                <span className="text-sm">{event.message}</span>
              </div>
              <span className="text-xs text-text-secondary">{event.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Footer */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-success rounded-full animate-pulse"></div>
            <span className="text-text-secondary">All systems operational</span>
          </div>
          <div className="text-text-secondary">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBoard;