import React from 'react';
import { FaShieldAlt, FaLock, FaUserSecret, FaRobot } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            PrivateGPT Snapshot
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your private AI companion. Ask anything while keeping your sensitive data secure and encrypted.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-blue-400 text-4xl mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
            <p className="text-gray-400">Your data is encrypted before it leaves your device</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
            <div className="text-purple-400 text-4xl mb-4">
              <FaLock />
            </div>
            <h3 className="text-xl font-semibold mb-2">Local Processing</h3>
            <p className="text-gray-400">Sensitive data stays on your machine</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
            <div className="text-green-400 text-4xl mb-4">
              <FaUserSecret />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-400">Your privacy is our top priority</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
            Start Secure Chat
          </button>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h4 className="font-semibold mb-2">Type Your Question</h4>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h4 className="font-semibold mb-2">Auto-Encryption</h4>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h4 className="font-semibold mb-2">Secure Processing</h4>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">4</span>
              </div>
              <h4 className="font-semibold mb-2">Get Your Answer</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 