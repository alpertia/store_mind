'use client';

export function ComparisonSection() {
  const features = [
    {
      category: 'Data Location',
      cloud: 'Cloud servers (vendor controlled)',
      storemind: 'Your device (you controlled)',
      storemindIcon: '✓'
    },
    {
      category: 'Processing Path',
      cloud: 'API → Vendor → Analytics → Vendor',
      storemind: 'Local GPU (no network)',
      storemindIcon: '✓'
    },
    {
      category: 'Who Knows About You',
      cloud: 'Vendor, provider, analytics, maybe hackers',
      storemind: 'Only your store',
      storemindIcon: '✓'
    },
    {
      category: 'Compliance Approach',
      cloud: 'Badges, SOC 2, GDPR theater',
      storemind: 'Architecture guarantees (physics)',
      storemindIcon: '✓'
    },
    {
      category: 'Offline Capability',
      cloud: 'Fails without internet',
      storemind: 'Works completely offline',
      storemindIcon: '✓'
    },
    {
      category: 'Vendor Lock-in',
      cloud: 'Proprietary APIs, vendor dependent',
      storemind: 'Open source, fully portable',
      storemindIcon: '✓'
    },
    {
      category: 'Latency',
      cloud: '300-1000ms (network round-trip)',
      storemind: '10-50ms (local)',
      storemindIcon: '✓'
    },
    {
      category: 'Attack Surface',
      cloud: 'Cloud + network + vendor infra',
      storemind: 'Only your device',
      storemindIcon: '✓'
    },
    {
      category: 'Your Control',
      cloud: 'Vendor decides everything',
      storemind: 'You own everything',
      storemindIcon: '✓'
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cloud Theater vs. Architecture
          </h2>
          <p className="text-xl text-gray-400">
            Not just a feature difference — a fundamental architectural choice
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-4 font-semibold text-white bg-gray-800/50">Aspect</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-300 bg-gray-800/50">
                  ☁️ Cloud Platforms
                </th>
                <th className="text-left py-4 px-4 font-semibold text-green-400 bg-gray-800/50">
                  🏪 StoreMind
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">{feature.category}</td>
                  <td className="py-4 px-4 text-gray-400">{feature.cloud}</td>
                  <td className="py-4 px-4 text-green-400">{feature.storemind}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Insight */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Why This Matters</h3>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-green-400">Cloud platforms</strong> need GDPR badges, SOC 2 certifications, 
              and compliance theater because <strong>data isn't actually secure</strong>. It's distributed, 
              at risk, and the vendor admits this by needing badges.
            </p>
            <p>
              <strong className="text-green-400">StoreMind</strong> doesn't need badges because 
              <strong> data never leaves your store</strong>. The architecture itself guarantees compliance — 
              not through documents, but through physics.
            </p>
            <p className="pt-4 border-t border-green-500/30">
              <strong>Bottom line:</strong> Everyone else is playing defense (badges). 
              StoreMind plays a different game (no cloud = no risk).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
