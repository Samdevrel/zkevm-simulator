'use client';

import { useState } from 'react';

interface Transaction {
  type: 'transfer' | 'swap' | 'mint' | 'approve';
  from: string;
  to: string;
  amount: number;
  fee: number;
  txHash: string;
}

interface RollupStats {
  blockNumber: number;
  gasUsed: number;
  gasLimit: number;
  throughput: string;
  avgFee: string;
}

const transactions: Transaction[] = [
  {
    type: 'transfer',
    from: '0x7a...9f2e',
    to: '0x3c...1d4a',
    amount: 1.5,
    fee: 0.0005,
    txHash: '0x1b...3c5d',
  },
  {
    type: 'swap',
    from: '0x3c...1d4a',
    to: '0x5f...7a8b',
    amount: 500,
    fee: 0.002,
    txHash: '0x2a...9c1d',
  },
  {
    type: 'mint',
    from: '0x5f...7a8b',
    to: '0x2a...9c1d',
    amount: 10000,
    fee: 0.01,
    txHash: '0x6d...3e8f',
  },
  {
    type: 'approve',
    from: '0x2a...9c1d',
    to: '0x7a...9f2e',
    amount: 1000,
    fee: 0.0001,
    txHash: '0x8e...2d9f',
  },
];

const rollupStats: RollupStats = {
  blockNumber: 12450,
  gasUsed: 28400000,
  gasLimit: 30000000,
  throughput: '2,840 tx/s',
  avgFee: '$1.23',
};

export default function Home() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isProving, setIsProving] = useState(false);

  const simulateProof = async () => {
    setIsProving(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsProving(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-orange-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">zkEVM Simulator</h1>
          <p className="text-gray-400 mt-2">Ethereum-compatible ZK rollups at 10% validator adoption by 2026</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-orange-400 p-4 text-center">
            <div className="text-3xl font-black text-orange-400">2,840</div>
            <div className="text-sm text-gray-400">TX/s Throughput</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">{rollupStats.blockNumber.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Block Number</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">10%</div>
            <div className="text-sm text-gray-400">ZK Validators</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-green-400">{rollupStats.avgFee}</div>
            <div className="text-sm text-gray-400">Avg Transaction Fee</div>
          </div>
        </section>

        {/* Rollup Stats */}
        <section className="bg-gray-900 border-4 border-orange-400 p-6">
          <h2 className="text-xl font-black text-orange-400 mb-4">zkEVM Network Stats</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <div className="text-sm text-gray-400">Gas Used</div>
              <div className="text-2xl font-bold">{(rollupStats.gasUsed / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-gray-400">{((rollupStats.gasUsed / rollupStats.gasLimit) * 100).toFixed(1)}%</div>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <div className="text-sm text-gray-400">Gas Limit</div>
              <div className="text-2xl font-bold">{(rollupStats.gasLimit / 1000000).toFixed(1)}M</div>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <div className="text-sm text-gray-400">Throughput</div>
              <div className="text-2xl font-bold text-orange-400">{rollupStats.throughput}</div>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <div className="text-sm text-gray-400">Avg Fee</div>
              <div className="text-2xl font-bold">{rollupStats.avgFee}</div>
            </div>
          </div>
        </section>

        {/* Transactions */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">Type</th>
                  <th className="text-left py-3">From</th>
                  <th className="text-left py-3">To</th>
                  <th className="text-right py-3">Amount</th>
                  <th className="text-right py-3">Fee</th>
                  <th className="text-left py-3">TX Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.txHash}
                    onClick={() => setSelectedTx(tx)}
                    className={`border-b border-gray-800 cursor-pointer hover:bg-gray-800 ${
                      selectedTx?.txHash === tx.txHash ? 'bg-orange-900/20' : ''
                    }`}
                  >
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs font-bold ${
                        tx.type === 'transfer' ? 'bg-blue-900 text-blue-400' :
                        tx.type === 'swap' ? 'bg-purple-900 text-purple-400' :
                        tx.type === 'mint' ? 'bg-green-900 text-green-400' :
                        'bg-yellow-900 text-yellow-400'
                      }`}>
                        {tx.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-xs">{tx.from}</td>
                    <td className="py-3 font-mono text-xs">{tx.to}</td>
                    <td className="py-3 text-right">{tx.amount.toLocaleString()}</td>
                    <td className="py-3 text-right text-gray-400">{tx.fee}</td>
                    <td className="py-3 font-mono text-xs">{tx.txHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Selected Transaction */}
        {selectedTx && (
          <section className="bg-gray-900 border-4 border-orange-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-orange-400">{selectedTx.type.toUpperCase()}</h2>
                <p className="text-sm text-gray-400">{selectedTx.txHash}</p>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">From</div>
                <div className="font-mono">{selectedTx.from}</div>
              </div>
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">To</div>
                <div className="font-mono">{selectedTx.to}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Amount</div>
                  <div className="font-bold text-xl">{selectedTx.amount.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400">Fee</div>
                  <div className="font-bold text-xl text-gray-400">{selectedTx.fee}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Prove Button */}
        <button
          onClick={simulateProof}
          disabled={isProving}
          className="w-full py-4 bg-orange-500 text-white font-bold border-4 border-orange-400 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          {isProving ? 'Generating ZK Proof...' : 'Generate ZK Proof'}
        </button>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How zkEVM Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-orange-400 mb-2">Batch Transactions</h3>
              <p className="text-xs text-gray-400">Bundle thousands of ETH transactions</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Execute Off-Chain</h3>
              <p className="text-xs text-gray-400">Run on dedicated compute</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Generate ZK Proof</h3>
              <p className="text-xs text-gray-400">Prove correctness without revealing data</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Submit to L1</h3>
              <p className="text-xs text-gray-400">Finalize block with single proof</p>
            </div>
          </div>
        </section>

        {/* zkEVM Comparison */}
        <section className="bg-gray-900 border-4 border-purple-400 p-6">
          <h2 className="text-xl font-black text-purple-400 mb-4">zkEVM vs Ethereum</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <h3 className="font-bold text-orange-400 mb-2">zkEVM Rollup</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ 2,840 tx/s throughput</li>
                <li>✓ $1.23 avg transaction fee</li>
                <li>✓ 12-second finality</li>
                <li>✓ Ethereum-compatible</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <h3 className="font-bold text-blue-400 mb-2">Ethereum Mainnet</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ 15 tx/s throughput</li>
                <li>✓ $4-50 avg transaction fee</li>
                <li>✓ 12-second finality</li>
                <li>✓ Full decentralization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-orange-400 hover:underline">@samdevrel</a>
            {' • '}
            Data is simulated for demo purposes
          <button
            onClick={() => window.location.href = '/docs/overview'}
            className="w-full py-4 bg-purple-500 text-white font-bold border-4 border-purple-400 hover:bg-purple-400 mb-4"
          >
            {buttonText}
          </button>
                    </p>
        </footer>
      </div>
    </main>
  );
}
