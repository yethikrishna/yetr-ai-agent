import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ChatBubbleLeftRightIcon, 
  ServerIcon, 
  WrenchScrewdriverIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { LoadingGrid } from '../components/ui/LoadingScreen';
import { useAuth } from '../hooks/useAuth';
import { useMcpServers } from '../store/mcpServers';
import { useChat } from '../store/chat';
import { cn, formatDate } from '../utils';

export default function Dashboard() {
  const { user } = useAuth();
  const { servers, fetchServers, isLoading: serversLoading } = useMcpServers();
  const { conversations, fetchConversations, isLoading: conversationsLoading } = useChat();
  const [systemStats, setSystemStats] = useState({
    totalChats: 0,
    totalTools: 0,
    activeServers: 0,
    uptime: '99.9%'
  });

  useEffect(() => {
    // Fetch initial data
    fetchServers();
    fetchConversations();
  }, [fetchServers, fetchConversations]);

  useEffect(() => {
    // Calculate system stats
    const activeServers = servers.filter(s => s.status === 'online').length;
    const totalTools = servers.reduce((sum, server) => sum + server.tools.length, 0);
    
    setSystemStats({
      totalChats: conversations.length,
      totalTools,
      activeServers,
      uptime: '99.9%'
    });
  }, [servers, conversations]);

  const recentConversations = conversations.slice(0, 5);
  const onlineServers = servers.filter(s => s.status === 'online');
  const offlineServers = servers.filter(s => s.status === 'offline');

  const quickActions = [
    {
      name: 'Start New Chat',
      description: 'Begin a conversation with YETR AI',
      href: '/chat',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-brand-500 hover:bg-brand-600',
    },
    {
      name: 'Add MCP Server',
      description: 'Connect a new MCP server',
      href: '/servers?action=add',
      icon: ServerIcon,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Explore Tools',
      description: 'Discover available tools',
      href: '/tools',
      icon: WrenchScrewdriverIcon,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      name: 'View Analytics',
      description: 'Check system performance',
      href: '/analytics',
      icon: ChartBarIcon,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  const stats = [
    {
      name: 'Active Conversations',
      value: systemStats.totalChats,
      change: '+12%',
      changeType: 'positive',
      icon: ChatBubbleLeftRightIcon,
    },
    {
      name: 'Connected Servers',
      value: systemStats.activeServers,
      change: `${offlineServers.length} offline`,
      changeType: offlineServers.length > 0 ? 'negative' : 'neutral',
      icon: ServerIcon,
    },
    {
      name: 'Available Tools',
      value: systemStats.totalTools,
      change: '+5 new',
      changeType: 'positive',
      icon: WrenchScrewdriverIcon,
    },
    {
      name: 'System Uptime',
      value: systemStats.uptime,
      change: 'Last 30 days',
      changeType: 'neutral',
      icon: CheckCircleIcon,
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard - YETR AI Agent</title>
        <meta name="description" content="YETR AI Agent Dashboard - Manage your AI conversations and MCP servers" />
      </Head>

      <Layout>
        <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <div className="p-6 space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome back, {user?.fullName || user?.username || 'User'}!
                  </h1>
                  <p className="text-brand-100">
                    Ready to explore the power of AI-driven task automation?
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur">
                    <BoltIcon className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.name} className="card p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          {stat.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div className={cn(
                            'ml-2 flex items-baseline text-sm font-semibold',
                            stat.changeType === 'positive' ? 'text-green-600' :
                            stat.changeType === 'negative' ? 'text-red-600' :
                            'text-gray-500'
                          )}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="group card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors duration-200',
                        action.color
                      )}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {action.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Conversations */}
              <div className="card">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Recent Conversations
                    </h3>
                    <Link
                      href="/chat"
                      className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                    >
                      View all
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  {conversationsLoading ? (
                    <LoadingGrid rows={3} cols={1} className="space-y-4" />
                  ) : recentConversations.length > 0 ? (
                    <div className="space-y-4">
                      {recentConversations.map((conversation) => (
                        <Link
                          key={conversation.id}
                          href={`/chat/${conversation.id}`}
                          className="block group"
                        >
                          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/20 rounded-full flex items-center justify-center">
                                <ChatBubbleLeftRightIcon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate">
                                {conversation.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(conversation.updatedAt, 'relative')} • {conversation.messages.length} messages
                              </p>
                            </div>
                            <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No conversations yet
                      </p>
                      <Button href="/chat" size="sm">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Start First Chat
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Server Status */}
              <div className="card">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      MCP Server Status
                    </h3>
                    <Link
                      href="/servers"
                      className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
                    >
                      Manage servers
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  {serversLoading ? (
                    <LoadingGrid rows={3} cols={1} className="space-y-4" />
                  ) : servers.length > 0 ? (
                    <div className="space-y-4">
                      {servers.slice(0, 5).map((server) => (
                        <div key={server.id} className="flex items-center space-x-3">
                          <div className={cn(
                            'flex-shrink-0 w-2 h-2 rounded-full',
                            server.status === 'online' ? 'bg-green-500' :
                            server.status === 'offline' ? 'bg-gray-400' :
                            'bg-yellow-500'
                          )} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {server.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {server.tools.length} tools • {server.status}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            {server.status === 'online' ? (
                              <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            ) : server.status === 'offline' ? (
                              <ExclamationTriangleIcon className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ClockIcon className="w-5 h-5 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ServerIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No MCP servers connected
                      </p>
                      <Button href="/servers?action=add" size="sm">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add First Server
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* System Health Banner */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    All systems operational
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300">
                    YETR AI Agent is running smoothly with {systemStats.uptime} uptime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
