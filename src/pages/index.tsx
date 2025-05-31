import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>YETR AI Agent</title>
        <meta name="description" content="Your Enhanced Task Runner - AI Agent with Multi-MCP Integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              🤖 YETR AI Agent
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
              Your Enhanced Task Runner - A powerful AI agent system that connects to multiple MCP servers 
              simultaneously for intelligent task automation.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🧠</div>
                <h2 className="text-xl font-semibold mb-3">Advanced AI Agent</h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Multi-MCP server integration with intelligent task planning and execution
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">💬</div>
                <h2 className="text-xl font-semibold mb-3">Real-time Chat</h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Interactive interface with streaming responses and context awareness
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🔗</div>
                <h2 className="text-xl font-semibold mb-3">MCP Management</h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Connect and manage multiple Model Context Protocol servers
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🛠️</div>
                <h2 className="text-xl font-semibold mb-3">Tool Discovery</h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Browse and execute tools from connected servers dynamically
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-400/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto border border-green-400/30">
              <div className="flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
                <span className="text-green-100 font-semibold">System Status</span>
              </div>
              <p className="text-lg text-green-100">
                <strong>✅ YETR AI Agent Successfully Deployed!</strong>
              </p>
              <p className="text-green-200 text-sm mt-2">
                Frontend is live and ready. Backend integration coming soon with full MCP capabilities.
              </p>
            </div>
            
            <div className="mt-12">
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border border-white/20">
                  🚀 Get Started
                </button>
                <button className="bg-transparent hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 border-2 border-white/30 hover:border-white/50">
                  📚 Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}