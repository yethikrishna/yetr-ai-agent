import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { 
  PaperAirplaneIcon, 
  PlusIcon, 
  StopIcon,
  UserIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import Layout from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingScreen';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../store/chat';
import { useChatStreamingHandler } from '../../store/chat';
import { cn, formatDate } from '../../utils';

export default function Chat() {
  const { user } = useAuth();
  const {
    currentConversation,
    messages,
    isSending,
    isStreaming,
    streamingMessage,
    createConversation,
    sendMessage,
    setCurrentConversation,
  } = useChat();

  const [inputMessage, setInputMessage] = useState('');
  const [isNewChat, setIsNewChat] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Set up streaming handler
  const { startStreaming } = useChatStreamingHandler(currentConversation?.id);

  useEffect(() => {
    // Start streaming when conversation is available
    if (currentConversation?.id) {
      const cleanup = startStreaming();
      return cleanup;
    }
  }, [currentConversation?.id]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    const messageContent = inputMessage.trim();
    setInputMessage('');

    try {
      if (isNewChat || !currentConversation) {
        // Create new conversation
        const newConversation = await createConversation();
        setCurrentConversation(newConversation);
        setIsNewChat(false);
        
        // Send message to new conversation
        await sendMessage({
          message: messageContent,
          conversationId: newConversation.id,
        });
      } else {
        // Send message to existing conversation
        await sendMessage({
          message: messageContent,
          conversationId: currentConversation.id,
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setCurrentConversation(null);
    setIsNewChat(true);
    setInputMessage('');
  };

  const suggestedPrompts = [
    "Help me analyze a dataset",
    "Create a Python script for data processing",
    "Explain how MCP servers work",
    "What tools are available to me?",
  ];

  return (
    <>
      <Head>
        <title>Chat - YETR AI Agent</title>
        <meta name="description" content="Chat with YETR AI Agent" />
      </Head>

      <Layout>
        <div className="flex h-full bg-white dark:bg-gray-900">
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentConversation?.title || 'New Chat'}
                  </h1>
                  {currentConversation && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created {formatDate(currentConversation.createdAt, 'relative')}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleNewChat}
                  variant="secondary"
                  size="sm"
                  icon={<PlusIcon className="w-4 h-4" />}
                >
                  New Chat
                </Button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto">
              {messages.length === 0 && isNewChat ? (
                /* Welcome screen */
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <div className="text-center max-w-2xl">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-500 to-purple-600 rounded-3xl mb-6 mx-auto">
                      <BoltIcon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Welcome to YETR AI Agent
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      I can help you with tasks across multiple MCP servers, analyze data, 
                      write code, and much more. What would you like to work on today?
                    </p>
                    
                    {/* Suggested prompts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {suggestedPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => setInputMessage(prompt)}
                          className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          <p className="text-sm text-gray-900 dark:text-white">{prompt}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Chat messages */
                <div className="p-4 space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex space-x-3',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-brand-500 to-purple-600 rounded-full">
                            <BoltIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                      
                      <div className={cn(
                        'max-w-3xl rounded-2xl px-4 py-3',
                        message.role === 'user'
                          ? 'bg-brand-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      )}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className={cn(
                          'text-xs mt-2 opacity-70',
                          message.role === 'user' ? 'text-brand-100' : 'text-gray-500 dark:text-gray-400'
                        )}>
                          {formatDate(message.timestamp, 'time')}
                        </div>
                      </div>
                      
                      {message.role === 'user' && (
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full">
                            {user?.avatar ? (
                              <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full" />
                            ) : (
                              <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Streaming message */}
                  {isStreaming && streamingMessage && (
                    <div className="flex space-x-3 justify-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-brand-500 to-purple-600 rounded-full">
                          <BoltIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="max-w-3xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl px-4 py-3">
                        <div className="whitespace-pre-wrap">{streamingMessage}</div>
                        <div className="flex items-center space-x-1 mt-2">
                          <LoadingSpinner size="sm" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    rows={3}
                    disabled={isSending}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isSending}
                    loading={isSending}
                    icon={isSending ? <StopIcon className="w-4 h-4" /> : <PaperAirplaneIcon className="w-4 h-4" />}
                    className="h-12"
                  >
                    {isSending ? 'Stop' : 'Send'}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{inputMessage.length}/2000</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
