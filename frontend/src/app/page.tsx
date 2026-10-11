import { Navbar } from "@/components/Navbar";
import { CheckInCard } from "@/components/CheckInCard";
import { Footer } from "@/components/Footer";
import { ShieldCheck, CalendarCheck2, Zap, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#070b14]">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Live on Botchain Testnet
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
            Day<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Mark</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-md mx-auto">
            One day. One check-in. On-chain.
          </p>
        </div>

        {/* Central Check-In Card */}
        <CheckInCard />

        {/* How It Works Section */}
        <div className="mt-20 max-w-4xl mx-auto w-full">
          <h3 className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-8">
            How DayMark Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">1. Connect Wallet</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect your Web3 wallet (MetaMask, Rabby, etc.) configured to Botchain Testnet (Chain ID: 968).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <CalendarCheck2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">2. Record Once Per Day</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check in once per UTC day. The contract uses <code className="text-cyan-300 font-mono">block.timestamp / 1 days</code> to strictly enforce one mark per day.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">3. Verifiable On-Chain</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your check-in count and timestamp are permanently inscribed on Botchain Testnet with a transparent smart contract.
              </p>
            </div>
          </div>
        </div>

        {/* Network Details Card */}
        <div className="mt-12 max-w-2xl mx-auto w-full p-5 rounded-2xl bg-slate-900/30 border border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <div>
              <span className="font-semibold text-slate-200">Network: </span>
              <span>Botchain Testnet (Chain ID: 968)</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://scan.bohr.life"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>scan.bohr.life</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span className="text-slate-400">Currency: BOT</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
