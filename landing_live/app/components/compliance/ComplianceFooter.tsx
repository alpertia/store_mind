'use client';

export function ComplianceFooter() {
  return (
    <section className="py-16 px-6 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">No Badges. Just Architecture.</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We don't need GDPR or SOC 2 badges because we don't need them. 
            Data never leaves your store.
          </p>
        </div>

        {/* Three Key Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* 1. Local Processing */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-white mb-3">100% Local Processing</h3>
            <p className="text-gray-400">
              All ML, all detection, all computation happens on your hardware. 
              Zero external API calls. Zero network exposure.
            </p>
          </div>

          {/* 2. Encrypted Storage */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-white mb-3">Encrypted Locally</h3>
            <p className="text-gray-400">
              AES-256 encryption at rest. Full-disk encryption available. 
              Your keys, your control. Not vendor-managed.
            </p>
          </div>

          {/* 3. Data Ownership */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="text-3xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-white mb-3">You Own It All</h3>
            <p className="text-gray-400">
              StoreMind is software. Your data is your data. 
              No vendor telemetry, no vendor lock-in, no vendor access.
            </p>
          </div>
        </div>

        {/* Compliance Statement */}
        <div className="bg-gradient-to-r from-blue-500/5 to-green-500/5 border border-blue-500/30 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Why We Don't Have Badges</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-gray-300 mb-3">❌ Cloud Platforms Need Badges</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Data stored remotely (GDPR risk)</li>
                <li>• Multiple cloud layers (audit required)</li>
                <li>• Vendor responsibility (certification needed)</li>
                <li>• Network exposure (compliance theater)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-green-300 mb-3">✓ StoreMind Doesn't Need Badges</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Data never leaves your store (no GDPR risk)</li>
                <li>• Only local processing (no audit needed)</li>
                <li>• Your responsibility (architecture guarantees it)</li>
                <li>• Zero network exposure (physics, not theater)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* GDPR/KVKK Notice */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-12">
          <h4 className="font-semibold text-white mb-3">GDPR / KVKK Compliance</h4>
          <p className="text-gray-400 text-sm mb-4">
            StoreMind is GDPR and KVKK compliant by architecture, not by badges. 
            All processing happens locally. All data stays on your infrastructure. 
            You maintain full control and responsibility.
          </p>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>
              <strong>Your Responsibility:</strong> Obtain explicit biometric consent 
              (face recognition requires written consent), post privacy notices, 
              manage data retention, handle subject access requests.
            </p>
            <p>
              <strong>StoreMind Responsibility:</strong> Provide local processing 
              framework, encryption tools, deletion mechanisms, audit logging.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/privacy-policy" className="text-center p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500 transition-colors group">
            <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">Privacy Policy</p>
            <p className="text-sm text-gray-400 mt-2">How your data is processed</p>
          </a>

          <a href="/security" className="text-center p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500 transition-colors group">
            <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">Security Architecture</p>
            <p className="text-sm text-gray-400 mt-2">Technical details & guarantees</p>
          </a>

          <a href="/dpa" className="text-center p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500 transition-colors group">
            <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">Data Processing Agreement</p>
            <p className="text-sm text-gray-400 mt-2">Full legal framework</p>
          </a>
        </div>

        {/* Bottom Message */}
        <div className="text-center pt-12 border-t border-gray-800 mt-12">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            <strong>StoreMind Principle:</strong> Your store is a private space. 
            Data about what happens there belongs to you, stays with you, and 
            is protected by architecture — not certificates or theater.
          </p>
        </div>
      </div>
    </section>
  );
}
