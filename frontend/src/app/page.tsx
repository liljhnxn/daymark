import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { CheckInCard } from "@/components/CheckInCard";
import { Footer } from "@/components/Footer";
import { ShieldCheck, CalendarCheck2, Zap, ExternalLink, Globe, Layers, ArrowUpRight } from "lucide-react";

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <div className="w-4 h-4 rounded-sm bg-black overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span>Live on Botchain Mainnet</span>
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
                Connect your Web3 wallet (MetaMask, Rabby, etc.) configured to Botchain Mainnet (Chain ID: 677).
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
                Your check-in count and timestamp are permanently inscribed on Botchain Mainnet with a transparent smart contract.
              </p>
            </div>
          </div>
        </div>

        {/* BOT Chain Ecosystem Section */}
        <section className="mt-20 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-black border border-emerald-500/40 p-1 flex items-center justify-center overflow-hidden mb-3 shadow-lg shadow-emerald-500/20">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={52}
                height={52}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Ecosystem Architecture</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">BOT Chain</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-2">
              Next-generation high-throughput EVM blockchain built for autonomous AI agents, sub-cent execution, and seamless user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BOT Chain Official Website Card */}
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-emerald-500/30 p-1.5 flex items-center justify-center overflow-hidden shadow-inner">
                    <Image
                      src="/botchain-logo.png"
                      alt="BOT Chain Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="p-2 rounded-xl bg-slate-800/60 text-slate-400 group-hover:text-emerald-300 group-hover:bg-emerald-950/60 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-black overflow-hidden flex items-center justify-center shrink-0">
                    <Image
                      src="/botchain-logo.png"
                      alt="BOT Chain"
                      width={16}
                      height={16}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>BOT Chain Website</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Explore the official BOT Chain portal, AI agent platform, network whitepaper, roadmap, and core community.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  https://botchain.ai
                </span>
                <span className="text-slate-500 group-hover:text-emerald-300 transition-colors font-sans font-medium">Visit Website &rarr;</span>
              </div>
            </a>

            {/* BOT Chain Explorer Card */}
            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black border border-emerald-500/30 p-1.5 flex items-center justify-center overflow-hidden shadow-inner">
                    <Image
                      src="/botchain-logo.png"
                      alt="BOT Chain Explorer Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="p-2 rounded-xl bg-slate-800/60 text-slate-400 group-hover:text-emerald-300 group-hover:bg-emerald-950/60 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-black overflow-hidden flex items-center justify-center shrink-0">
                    <Image
                      src="/botchain-logo.png"
                      alt="BOT Chain Explorer"
                      width={16}
                      height={16}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>BOT Chain Explorer</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  BotScan real-time block explorer. Track live blocks, inspect daily check-in transactions, gas metrics, and verified contracts.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  https://scan.botchain.ai
                </span>
                <span className="text-slate-500 group-hover:text-cyan-300 transition-colors font-sans font-medium">Open Explorer &rarr;</span>
              </div>
            </a>
          </div>

          {/* Network Parameter Badge Bar */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/40 border border-slate-800/70 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-black overflow-hidden flex items-center justify-center shrink-0">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain"
                  width={16}
                  height={16}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-slate-500">Chain ID: </span>
                <span className="font-semibold text-slate-200 font-mono">677</span>
              </div>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div>
              <span className="text-slate-500">Native Token: </span>
              <span className="font-semibold text-emerald-400 font-mono">BOT</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div>
              <span className="text-slate-500">Total Supply: </span>
              <span className="font-semibold text-slate-200 font-mono">150 Million</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div>
              <span className="text-slate-500">DayMark Contract: </span>
              <a
                href="https://scan.botchain.ai/address/0x48ef5c6348e349A9694579Fb1f2f8828f3a3f929"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-emerald-400 hover:underline"
              >
                0x48ef...f929
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
