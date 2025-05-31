import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>YETR AI Agent</title>
        <meta name="description" content="Your Enhanced Task Runner - AI Agent with Multi-MCP Integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            🤖 YETR AI Agent
          </h1>
          <p className={styles.description}>
            Your Enhanced Task Runner - A powerful AI agent system that connects to multiple MCP servers
            simultaneously for intelligent task automation.
          </p>
          
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>🧠 Advanced AI Agent</h2>
              <p>Multi-MCP server integration with intelligent task planning</p>
            </div>
            
            <div className={styles.card}>
              <h2>💬 Real-time Chat</h2>
              <p>Interactive interface with streaming responses</p>
            </div>
            
            <div className={styles.card}>
              <h2>🔗 MCP Management</h2>
              <p>Connect and manage multiple MCP servers</p>
            </div>
            
            <div className={styles.card}>
              <h2>🛠️ Tool Discovery</h2>
              <p>Browse and execute tools from connected servers</p>
            </div>
          </div>
          
          <div className={styles.statusBox}>
            <p>
              <strong>Status:</strong> YETR AI Agent Successfully Deployed! 🚀
            </p>
          </div>
        </div>
      </main>
    </>
  )
}