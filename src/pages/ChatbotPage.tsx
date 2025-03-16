
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatInterface from '@/components/chatbot/ChatInterface';
import SOSButton from '@/components/sos/SOSButton';

const ChatbotPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 pb-8">
        <div className="container mx-auto h-full px-4 md:px-6 py-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Mental Health Support
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Chat with our AI assistant about stress, anxiety, or any mental health concerns.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden h-[calc(100vh-14rem)]">
            <ChatInterface />
          </div>
        </div>
      </main>
      
      <Footer />
      <SOSButton />
    </div>
  );
};

export default ChatbotPage;
