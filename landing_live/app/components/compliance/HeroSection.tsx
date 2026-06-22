'use client';

import { useState } from 'react';

export function HeroSection() {
  const [activeTab, setActiveTab] = useState('local');

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-700 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Main Message */}
        <div className="text-center mb-12">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-4">
            Retail Intelligence
          </p>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Store Knows You Were Here.<br/>
            <span className="text-blue-400">Nobody Else.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            StoreMind processes everything locally, encrypted, on your hardware.
            What happens in your store stays in your store.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            See Live Demo
          </button>
          <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors">
            Read Our Architecture
          </button>
        </div>

        {/* Cloud Theater Explanation */}
        <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cloud */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-400 text-lg">☁️</span>
                </div>
                <h3 className="text-xl font-bold text-red-400">Cloud Theater</h3>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <div>📤 Data → Cloud API</div>
                <div>📊 Vendor stores it</div>
                <div>🔍 Analytics company analyzes</div>
                <div>⚠️ Multiple points of failure</div>
                <div className="pt-3 border-t border-gray-700 text-gray-400">
                  <strong>Solution:</strong> Badges, compliance docs (theater)
                </div>
              </div>
            </div>

            {/* Local */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-lg">🏪</span>
                </div>
                <h3 className="text-xl font-bold text-green-400">StoreMind Local</h3>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <div>🔒 Data → Your Device</div>
                <div>💾 Your database stores it</div>
                <div>⚙️ You control everything</div>
                <div>✓ Single point of security</div>
                <div className="pt-3 border-t border-gray-700 text-gray-400">
                  <strong>Solution:</strong> Physics (data never leaves)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Employee Analogy */}
        <div className="bg-blue-500/5 border border-blue-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Think of It This Way</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-bold">👤</span>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold">Your Store's Security Guard</p>
                <p className="text-gray-300 mt-1">Works 10 years, remembers every customer, tells nobody. Perfect memory. Completely trustworthy.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                  <span className="text-white font-bold">🤖</span>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold">StoreMind = That Guard's Encrypted Memory</p>
                <p className="text-gray-300 mt-1">Perfect recall. Can be wiped on demand. Never leaks. Encrypted so even if stolen, it's useless. That's the entire architecture.</p>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-6 pt-6 border-t border-gray-700">
            <strong>The difference?</strong> Cloud platforms need badges because data isn't safe. Local processing doesn't need badges because data never leaves your store.
          </p>
        </div>
      </div>
    </section>
  );
}
