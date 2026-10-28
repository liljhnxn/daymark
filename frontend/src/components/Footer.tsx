"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, ShieldCheck, ArrowUpRight } from "lucide-react";
import { DAYMARK_CONTRACT_ADDRESS } from "@/config/contract";

export function Footer() {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 mt-auto py-10 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        {/* Top Tier: BOT Chain Branding & Direct Ecosystem Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/60">
          {/* BOT Chain Name & Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-black border border-emerald-500/30 flex items-center justify-center p-1 shadow-md shadow-emerald-500/10 overflow-hidden">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide text-white">BOT Chain</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                  Mainnet 677
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Next-Generation Decentralized Agent & AI Blockchain</p>
            </div>
          </div>

          {/* Official Required Ecosystem Links with Logo at the front */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* BOT Chain Website Link with Logo in front */}
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 transition-all font-medium group shadow-sm"
            >
              <div className="w-5 h-5 rounded-md bg-black border border-emerald-500/30 overflow-hidden shrink-0 flex items-center justify-center">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>BOT Chain Website</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 transition-colors" />
            </a>

            {/* BOT Chain Explorer Link with Logo in front */}
            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 transition-all font-medium group shadow-sm"
            >
              <div className="w-5 h-5 rounded-md bg-black border border-emerald-500/30 overflow-hidden shrink-0 flex items-center justify-center">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Explorer Logo"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>BOT Chain Explorer</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Tier: DayMark details, Contract & UTC clock */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left">
            <span className="font-semibold text-slate-300">DayMark</span>
            <span>•</span>
            <span>One day. One check-in. On-chain.</span>
            <span>•</span>
            <span className="font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {utcTime || "Loading UTC..."}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://scan.botchain.ai/address/${DAYMARK_CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-300 transition-colors font-mono"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DayMark Contract: {DAYMARK_CONTRACT_ADDRESS.slice(0, 6)}...{DAYMARK_CONTRACT_ADDRESS.slice(-4)}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
